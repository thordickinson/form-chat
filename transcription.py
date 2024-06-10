import json
import whisper
import os
import requests
from openai import OpenAI

# Load the model once
model = whisper.load_model("small")

def transcribe_audio(audio_path, language="es", use_online=False):
    if use_online:
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
    url = "https://api.openai.com/v1/audio/transcriptions"
    headers = {
        "Authorization": f"Bearer {os.environ.get('OPENAI_API_KEY')}",
    }
    with open(audio_path, "rb") as audio_file:
        files = {
            "file": audio_file,
            "model": "whisper-1",
        }
        response = requests.post(url, headers=headers, files=files)
        response_data = response.json()
        transcription_text = response_data.get("text", "Transcription failed")
    transcription_path = os.path.join(os.path.dirname(audio_path), 'transcription.txt')
    with open(transcription_path, 'w') as f:
        f.write(transcription_text)
    return transcription_text, transcription_path

def get_openai_response(transcription_text, form_data, fields):
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    prompt = (
        "Here is the transcription of an audio file:\n\n"
        f"{transcription_text}\n\n"
        "And here is the current state of a form:\n\n"
        f"{form_data}\n\n"
        "And here is the field metadata:\n\n"
        f"{fields}\n\n"
        """Please complete the form based on the transcription and the field metadata. 
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
        model="gpt-4o",
        max_tokens=150
    )
    content = response.choices[0].message.content
    print(content)
    # parse the content as json
    content = json.loads(content)
    print(content)
    return content
