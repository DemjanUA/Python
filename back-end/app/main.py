import numpy
import json
import imageio
import matplotlib.pyplot
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask import Flask, json, request

from uchkin_diploma import neuralNetwork


# number of input, hidden and output nodes
input_nodes = 784
hidden_nodes = 200
output_nodes = 10

# learning rate
learning_rate = 0.1

# ---> create instance of neural network
n = neuralNetwork(input_nodes,hidden_nodes,output_nodes, learning_rate)
n.load()

# In[4]:

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode='gevent', cors_allowed_origins="*")
CORS(app)

@app.route('/', methods=['POST'])
def home_view():
  testData = numpy.array(request.get_json())

  testData  = 255.0 - testData
  # then scale data to range from 0.01 to 1.0
  testData = (testData / 255.0 * 0.99) + 0.01
  
  print("min = ", numpy.min(testData))
  print("max = ", numpy.max(testData))

  outputs = n.query(testData)
  # print(outputs)

  label = numpy.argmax(outputs)
  # print("network says ", label)

  return str(label)


@socketio.on('query')
def handle_json(jsonData):
  testData = numpy.array(json.loads(jsonData))

  testData  = 255.0 - testData
  testData = (testData / 255.0 * 0.99) + 0.01

  outputs = n.query(testData)

  label = numpy.argmax(outputs)
  print("network says ", label)
  emit('response', {'response': str(label)})

if __name__ == '__main__':
  socketio.run(app, debug=True)