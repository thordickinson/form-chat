import whisper
import os
from openai import OpenAI

# Load the model once
model = whisper.load_model("base")

def transcribe_audio(audio_path, language="es"):
    result = model.transcribe(audio_path, language=language)
    transcription_text = result['text']
    transcription_path = os.path.join(os.path.dirname(audio_path), 'transcription.txt')
    with open(transcription_path, 'w') as f:
        f.write(transcription_text)
    return transcription_text, transcription_path

def get_openai_response(transcription_text):
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": transcription_text}
        ],
        model="gpt-4",
        max_tokens=150
    )
    return response.choices[0].message['content'].strip()
