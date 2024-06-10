from flask import Flask, send_from_directory, request, jsonify                                                                                                                                                                                                
import os                                                                                                                                                                                                                                                     
import uuid                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                            
app = Flask(__name__, static_folder='client/dist', static_url_path='/')                                                                                                                                                                                       
                                                                                                                                                                                                                                                            
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
    if 'audio' not in request.files:                                                                                                                                                                                                                          
        return jsonify({'error': 'No audio file provided'}), 400                                                                                                                                                                                              
                                                                                                                                                                                                                                                            
    audio_file = request.files['audio']                                                                                                                                                                                                                       
    audio_uuid = str(uuid.uuid4())                                                                                                                                                                                                                            
    audio_path = os.path.join('uploads', f'{audio_uuid}.wav')                                                                                                                                                                                                 
                                                                                                                                                                                                                                                            
    os.makedirs('uploads', exist_ok=True)                                                                                                                                                                                                                     
    audio_file.save(audio_path)                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                            
    return jsonify({'uuid': audio_uuid})                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                            
if __name__ == "__main__":                                                                                                                                                                                                                                    
    app.run(debug=True)