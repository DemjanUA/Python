# In[1]:
# export FLASK_APP=server.py


import sys
import numpy
import imageio
import matplotlib.pyplot
from flask import Flask, json, request
from flask_cors import CORS

corePath = '../_core/'


sys.path.append(corePath)
from _classes import neuralNetwork


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


# In[3]:


# img_array = imageio.imread(corePath + 'images/2828_my_own_4.png', as_gray=True)
    
# # reshape from 28x28 to list of 784 values, invert values
# img_data  = 255.0 - img_array.reshape(784)
    
# # then scale data to range from 0.01 to 1.0
# img_data = (img_data / 255.0 * 0.99) + 0.01
# print("min = ", numpy.min(img_data))
# print("max = ", numpy.max(img_data))

# # plot image
# matplotlib.pyplot.imshow(img_data.reshape(28,28), cmap='Greys', interpolation='None')

# # query the network
# outputs = n.query(img_data)
# print (outputs)

# # the index of the highest value corresponds to the label
# label = numpy.argmax(outputs)
# print("network says ", label)


# In[4]:

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def hello_world():
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