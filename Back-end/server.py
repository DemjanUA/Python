from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
  return {
    "username": user.username,
    "theme": user.theme,
    "image": url_for("user_image", filename=user.image),
  }