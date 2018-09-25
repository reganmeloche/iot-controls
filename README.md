# iot-controls

## About

Welcome to my full-stack IoT project. This project consists of a NodeMCU chip mounted on a motorized chassis and connected to various other hardware (LED, temperature sensor, LCD display). This device is controlled from a dashboard running on Heroku, which comprises the majority of this repo. The code that actually gets run on the device is in the 'NodeMCU' folder, and contains its own Readme file. The dashboard project is a React web app generated from create-react-app, running node.js in the back-end. The front-end React/Redux code is in the 'client' folder, and the back-end server functionality makes up the rest of the repo. Another major component is the MQTT server, which I have provisioned through CloudMQTT (https://www.cloudmqtt.com/), just using the Cute Cat free tier. 

The dashboard includes a simple password login, and has the following capabilities:
- Check the status of the device, with a timestamp of the last time checked
- Control the device in 4 directions, by effecting the two motors
- Toggle an LED
- Read the temperature from a temperature sensor
- Send a 16-character message to be displayed on the LCD
- Store past messages in a Mongo database

## Technologies

### Hardware
- NodeMCU chips: https://www.amazon.ca/gp/product/B06VV39XD8/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1
- L298N Motor Driver: https://www.amazon.ca/gp/product/B06VV39XD8/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1
- Motorized Chassis: https://www.amazon.ca/gp/product/B01N7KJIW4/ref=oh_aui_detailpage_o07_s00?ie=UTF8&psc=1
- LCD Display (I2C): https://www.amazon.ca/gp/product/B0177XQE7K/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1
- Breadboards: https://www.amazon.ca/gp/product/B07589R1Q3/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1
- Other standard circuit components
  - Temperature sensor (TMP36)
  - LED
  - Jumper wires
  - 100 Ohm resistor
  - 9V battery connector
  
### Software
- Heroku: For running the dashboard in the cloud
- CloudMQTT: For hosting the MQTT server in the cloud
- Arduino IDE: for programming the NodeMCU
- create-react-app: For setting up the React front-end project
- React/Redux: For front-end project and state management
- Node.js (and Express): For the backend of the dashboard
- MongoDB: For the database
- Passport: For login and session management
- Other useful npm packages: react-bootstrap, sleep-promise, mqtt, moment

## Try it out
This was a personal project that I worked in an effort to get familiar with full-stack IoT. I worked on it during my spare time, and it took me 3 months to complete. Feel free to use any of the components here for your own projects and please let me know how they turn out. Good luck!
