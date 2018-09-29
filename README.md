# iot-controls

<img src="/pics/side_view.JPG" width="500">

<img src="/pics/front_view.JPG" width="500">

## About

Welcome to my full-stack IoT project. This project consists of a NodeMCU chip mounted on a motorized chassis and connected to various other hardware (LED, temperature sensor, LCD display). This device is controlled from a dashboard running on Heroku, which comprises the majority of this repo. The code that actually gets run on the device is in the 'nodeMCU' folder, and contains its own Readme file. The dashboard project is a React web app generated from create-react-app, running node.js in the back-end. The front-end React/Redux code is in the 'client' folder, and the back-end server functionality makes up the rest of the repo. Another major component is the MQTT server, which is running through CloudMQTT (https://www.cloudmqtt.com/).

The dashboard includes a simple password login, and has the following capabilities:
- Check the status of the device, with a timestamp of the last time checked
- Control the device in 4 directions, by effecting the two motors
- Toggle an LED
- Read the temperature from a temperature sensor
- Send a 16-character message to be displayed on the LCD
- Store past messages in a database

<img src="/pics/dashboard.png" width="500">

## Technologies

### Hardware
- <a href="https://www.amazon.ca/gp/product/B06VV39XD8/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1" target="_blank">NodeMCU Chip</a>
- <a href="https://www.amazon.ca/gp/product/B01C3YNI2M/ref=oh_aui_detailpage_o08_s00?ie=UTF8&psc=1" target="_blank">L298N Motor Driver</a>
- <a href="https://www.amazon.ca/gp/product/B01N7KJIW4/ref=oh_aui_detailpage_o07_s00?ie=UTF8&psc=1" target="_blank">Motorized Chassis</a>
- <a href="https://www.amazon.ca/gp/product/B0177XQE7K/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1" target="_blank">LCD Display (I2C)</a>
- <a href="https://www.amazon.ca/gp/product/B07589R1Q3/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1" target="_blank">Breadboard</a>
- Other standard circuit components
  - Temperature sensor (TMP36)
  - LED
  - Jumper wires
  - 100 Ohm resistor
  - 9V battery connector

The total cost of all the hardware is just over $100 CAD.
  
### Software
- Heroku: For running the dashboard in the cloud
- CloudMQTT: For hosting the MQTT server in the cloud
- Arduino IDE: for programming the NodeMCU
- create-react-app: For setting up the React front-end project
- React/Redux: For front-end project and state management
- Node.js (and Express): For the backend of the dashboard
- MongoDB: For the database that stores the display messages
- Passport: For login and session management
- Other useful npm packages: react-bootstrap, sleep-promise, mqtt, moment

All of the software used in this project is free, provided you stay on the free tiers for CloudMQTT and Heroku.

## Circuit Diagram

<img src="/pics/diagram.jpg" width="500">

<img src="/pics/top_view.JPG" width="500">

## Hardware Considerations

### NodeMCU
The goal of this project was to have something that could be wirelessly controlled from the internet. I was familiar with the Arduino, but on it is not WiFi-capable. The ESP8266 chip seems to be the most popular choice for Wifi chips. I ordered a couple of these, but there were two requirements that it did not satisfy: I needed a regulated 3.3 output voltage, and I needed more pins. The NodeMCU is a platform containing the ESP8266 that solves both of these issues.

### LCD Display
I started out by trying the LCD display that comes with the Arduino starter kit, but it required 12 connections. The I2C display only requires 4. It also has a screw at the back that allows you to adjust the brightness. It is very important that this screen receives 5V - nothing much more and nothing much less - otherwise you will not be able to see the text. This posed a bit of a problem for me, as the NodeMCU doesn't have a 5V output. However, the L298N motor DOES have a 5V output, which was extremely fortunate. So if you're doing a variation om this project and not using the l298N motor, you will need to find another stable 5V input for it.

## Communication
The device and the dashboard communicate using CloudMQTT, which is essentially a pub/sub queue that is hosted separately from the dashboard, and it works as follows: When I trigger a control from the dashboard, say turning on the LED, the back-end code of the dashboard publishes a message to this queue. Meanwhile, the NodeMCU on the device, which is connected to the internet over WiFi, is subscribed to this queue, so it receives any messages that are published. Once a message is received, it triggers a callback function, to which the queued message is passed. There is code on the NodeMCU that parses the message and triggers the proper controls. In the case of the LED, this is simply triggering the pin connected to the LED.

While most of the controls are in the direction of the dashboard to the device, there are a few situations that work in the opposite direction. For example, the temperature sensor - this is a two-step process. First of all, when the user requests the temperature, the dashboard must first issue the request to the device via the queue, using the same process described above. However, the temperature cannot be sent back immediately. All communication between the dash and the device must happen using the queue. So once the device receives the request for the temperature, the value is read from the sensor, and then this value is published from the device to the queue. The dashboard is subscribed to the queue, and when it picks up a message, a global value representing the temperature is updated accordingly. After the initial request for the temperature from the dash, a second request is querying that global value. A delay is programmed in between these requests to allow some time for the dash to receive the message containing the temperature that was sent by the device. The global value is grabbed and it updates the dashboard accordingly. The same two-step process is used for both checking i the device is online, and for checking the status of the LED.


## Try it out
This was a personal project that I worked in an effort to get familiar with full-stack IoT. I worked on it during my spare time, and it took me 3 months to complete. Feel free to use any of the components here for your own projects and please let me know how they turn out. Good luck!


## Future Development
- Log all user interactions: Could integrate into a cloud platform like AWS/Azure
- Smooth out the motor controls: Currently the controls are just triggered by distinct button pushes. Running the motor while a control is held down would be much smoother
- Add a camera and stream it to the dashboard
- Improve the battery power: Currently everything is powered off of a 9v battery, and it drains fairly quickly
- Add in path planning: Could make a simple program that constantly seeks out the warmest area
