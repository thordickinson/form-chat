import json
import whisper
import os
from openai import OpenAI
client = OpenAI()

USE_WHISPER_ONLINE = True # os.getenv("USE_WHISPER_ONLINE", "false").lower() == "true" 

# Load the model once
model = whisper.load_model("small") if USE_WHISPER_ONLINE else None

def transcribe_audio(audio_path, language="es"):
    if USE_WHISPER_ONLINE:
        return transcribe_audio_online(audio_path)
    else:
        return transcribe_audio_offline(audio_path, language)

def transcribe_audio_offline(audio_path, language="es"):
    result = model.transcribe(audio_path, language=language)
    transcription_text = result['text']
    transcription_path = os.path.join(os.path.dirname(audio_path), 'transcription.txt')
    with open(transcription_path, 'w') as f:
        f.write(transcription_text)
    return transcription_text, transcription_path

def transcribe_audio_online(audio_path):

    audio_file = open(audio_path, "rb")
    print(audio_path)
    transcription_text = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file,
        response_format="text"
    )

    transcription_path = os.path.join(os.path.dirname(audio_path), 'transcription.txt')
    with open(transcription_path, 'w') as f:
        f.write(transcription_text)
    return transcription_text, transcription_path

def get_openai_response(transcription_text, form_data, fields):
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    prompt = (
        f"""
        Here is the transcription of an audio file:
        
        "{transcription_text}"

        And here is the current state of a form:
        ```json
        {form_data}
        ```

        And here is the field metadata:
        ```json
        {fields}
        ```

        Please extract only the fields that are present in the transcription. 
        Do not explain the response, return your response as a JSON object,
        use the very same fields as the form data, do not add or remove fields. 
        Do not modify the form data if the transcription does not contains the field.
        """
    )

    print(prompt)

    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        response_format={ "type": "json_object" },
        model="gpt-4o"
    )
    content = response.choices[0].message.content
    print("Response from LLM", content)
    # parse the content as json
    content = json.loads(content)
    return content
