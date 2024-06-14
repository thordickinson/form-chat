import os
import whisper

model = whisper.load_model("small")

def transcribe_audio_offline(audio_path, language="es"):
    result = model.transcribe(audio_path, language=language)
    transcription_text = result['text']
    transcription_path = os.path.join(os.path.dirname(audio_path), 'transcription.txt')
    with open(transcription_path, 'w') as f:
        f.write(transcription_text)
    return transcription_text, transcription_path