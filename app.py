from flask import Flask, redirect, render_template, send_from_directory
app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/coach/')
def coach():
    return render_template('coach.html')

@app.route('/student/')
def student():
    return render_template('student.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host='127.0.0.1')