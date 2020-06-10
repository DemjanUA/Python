import sys
import numpy
import imageio
import matplotlib.pyplot
from flask import Flask, json, request
from flask_cors import CORS

corePath = '_core/'


sys.path.append(corePath)
from ._core._classes import neuralNetwork


# In[2]:


# number of input, hidden and output nodes
input_nodes = 784
hidden_nodes = 200
output_nodes = 10

# learning rate
learning_rate = 0.1

# create instance of neural network
n = neuralNetwork(input_nodes,hidden_nodes,output_nodes, learning_rate)
n.load()

# In[4]:

app = Flask(__name__)
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
  print(outputs)

  label = numpy.argmax(outputs)
  print("network says ", label)


  # return str(label)
  return str(label)