from flask import Flask
app = Flask(__name__)

@app.route('/api')
def say_hello():
    return "I'm the api!"

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')

