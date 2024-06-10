import whisper
import os

# Load the model once
model = whisper.load_model("base")

def transcribe_audio(audio_path, language="es"):
    result = model.transcribe(audio_path, language=language)
    transcription_path = os.path.join(os.path.dirname(audio_path), 'transcription.txt')
    with open(transcription_path, 'w') as f:
        f.write(result['text'])
    return transcription_path
