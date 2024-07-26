from flask import Flask, render_template, Response, request
import cv2
import numpy as np
import pyautogui
import time
import threading

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for session management

fps = 10  # Default frame rate
streaming = True  # Global flag to control streaming

def capture_screen():
    global fps
    global streaming
    screen_width, screen_height = pyautogui.size()
    prev_time = 0

    while True:
        if not streaming:
            time.sleep(1)
            continue

        time_elapsed = time.time() - prev_time
        if time_elapsed < 1.0 / fps:
            continue

        prev_time = time.time()
        img = pyautogui.screenshot(region=(0, 0, screen_width, screen_height))
        img_np = np.array(img)
        frame = cv2.cvtColor(img_np, cv2.COLOR_BGR2RGB)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(capture_screen(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/change_frame_rate/<int:new_fps>')
def change_frame_rate(new_fps):
    global fps
    fps = new_fps
    return ('', 204)

@app.route('/toggle_stream')
def toggle_stream():
    global streaming
    streaming = not streaming
    return ('', 204)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
