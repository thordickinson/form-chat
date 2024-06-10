                                                                                                                                                                                                                                                            
import json
from flask import Flask, send_from_directory, request, jsonify                                                                                                                                                                                                
import os                                                                                                                                                                                                                                                     
import uuid                                                                                                                                                                                                                                                   
import whisper                                                                                                                                                                                                                                                
import transcription                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                            
app = Flask(__name__, static_folder='client/dist', static_url_path='/')                                                                                                                                                                                       

# Configuration option to switch between offline and online transcription
USE_WHISPER_ONLINE = os.getenv("USE_WHISPER_ONLINE", "false").lower() == "true"
                                                                                                                                                                                                                                                            
@app.route('/api/')                                                                                                                                                                                                                                           
def home():                                                                                                                                                                                                                                                   
    return "Hello, Flask!"                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                            
@app.route('/api/<path:path>')                                                                                                                                                                                                                                
def static_proxy(path):                                                                                                                                                                                                                                       
    # send_static_file will guess the correct MIME type                                                                                                                                                                                                       
    return app.send_static_file(path)                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                            
@app.route('/api/')                                                                                                                                                                                                                                           
def index():                                                                                                                                                                                                                                                  
    return send_from_directory('client/dist', 'index.html')                                                                                                                                                                                                   
                                                                                                                                                                                                                                                            
@app.route('/api/upload', methods=['POST'])                                                                                                                                                                                                                   
def upload_audio():                                                                                                                                                                                                                                           
    if 'audio' not in request.files or 'formData' not in request.form:                                                                                                                                                                                                                          
        return jsonify({'error': 'Audio file or form data not provided'}), 400                                                                                                                                                                                              
                                                                                                                                                                                                                                                            
    audio_file = request.files['audio']                                                                                                                                                                                                                       
    form_payload = json.loads(request.form['formData'])
    form_data = form_payload.get('formData', {})
    fields = form_payload.get('fields', [])
    audio_uuid = str(uuid.uuid4())                                                                                                                                                                                                                            
    audio_folder = os.path.join('uploads', audio_uuid)                                                                                                                                                                                                        
    os.makedirs(audio_folder, exist_ok=True)                                                                                                                                                                                                                  
    audio_path = os.path.join(audio_folder, 'audio.wav')                                                                                                                                                                                                      
                                                                                                                                                                                                                                                            
    audio_file.save(audio_path)                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                            
    # Transcribe the audio using the transcription module                                                                                                                                                                                                     
    transcription_text, transcription_path = transcription.transcribe_audio(audio_path, language="es", use_online=USE_WHISPER_ONLINE)
    response_text = transcription.get_openai_response(transcription_text, form_data, fields)

    return jsonify({
        'uuid': audio_uuid,
        'transcription': transcription_text,
        'response': response_text,
        'formData': form_data
    })
                                                                                                                                                                                                                                                            
if __name__ == "__main__":                                                                                                                                                                                                                                    
    app.run(debug=True) 
