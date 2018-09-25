The iot_control.ino file contains the code that gets run on a NodeMCU device.

The pre-setup portion defines the pins being used on the device, the wifi network credentials, and the MQTT server credentials.

The setup function configures the pins and initiates the LCD display.

The loop function ensures a connection to both the wifi network and the MQTT server, and then performs the loop of the PubSub library. During the connection to the MQTT server, it ensures that a callback function is defined and that it is subscribed to the target topic on the queue. The PubSub loop will look for any messages on the MQTT server that have been published to the target topic. If one is found, then the message from the queue is received and passed to the callback function. This is where we can parse out the message and make the appropriate actions on the sensors and actuators connected to the NodeMCU device.

The messages that get published to the queue have 3 components. The first is the Read/Write component, denoted by a single character (R = read, W = write). An R means that we are reading from a sensor (temperature), and a W means we are effecting an actuator (motor) or other control (LED). The second component is a character that denotes the command or hardware that is being targeted (M = motor, L = LED, T = temperature sensor, ...). The final component is a string representing the value that is being sent to the target hardware. This may be a string of length 1 if only one character is needed. Some commands do not require this third component.

Here are some examples of commands:
- WL0: Set the LED to off (W = write, L = LED, 0 = turn off)
- RT0: Read the temperature (R = read, T = temperature, 0 = unneeded value)
- WMf: Move forward (W = write, M = motor, f = forward)
- WDhello world: Display the text 'hello world' on the LCD display (W = write, D = display, hello world = message to write)

The callback parses these components out and sends them to a 'control' function, which decides which lower level functions to call in order to read/write from the actual hardware connected to the NodeMCU. In the case of a 'Write' command, no further action is taken. For a read command, the value is published back to the MQTT server to be picked up by the web application. 
