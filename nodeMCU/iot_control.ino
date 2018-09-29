#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <LiquidCrystal_I2C.h>

bool DEBUG = true;

/*** COMMUNICATION SETUP ***/

// MQTT Info: Obtained from cloudMQTT
const char *MQTT_SERVER = "[FILL ME IN]";
const int MQTT_PORT = 11280;
const char *MQTT_USER = "[FILL ME IN]";
const char *MQTT_PASSWORD = "[FILL ME IN]";
const char *MQTT_CLIENT_NAME = "arduinoClient1";

// MQTT Topics
const char *PUB_TOPIC = "device_call";
const char *SUB_TOPIC = "web_call";

/// WiFi Network credentials
const char* WIFI_SSID = "[FILL ME IN]";
const char* WIFI_PASSWORD = "[FILL ME IN]";

WiFiClient espClient;
PubSubClient client(MQTT_SERVER, MQTT_PORT, espClient);

/*** CONTROLS SETUP ***/

int LED_PIN = 10; // SD3 on NodeMCU
#define TEMP_PIN A0

#define MOTOR_ENA D3
#define MOTOR_IN1 D4
#define MOTOR_IN2 D5
#define MOTOR_IN3 D6
#define MOTOR_IN4 D7
#define MOTOR_ENB D8

int MOTOR_PERIOD = 100;

LiquidCrystal_I2C lcd(0x27, 16, 2);

void callback(char* topic, byte* payload, unsigned int length);

/*
 * setup
 */
void setup() {
  Serial.begin(115200);

  pinMode(LED_PIN, OUTPUT);
  pinMode(MOTOR_ENA, OUTPUT);
  pinMode(MOTOR_IN1, OUTPUT);
  pinMode(MOTOR_IN2, OUTPUT);
  pinMode(MOTOR_ENB, OUTPUT);
  pinMode(MOTOR_IN3, OUTPUT);
  pinMode(MOTOR_IN4, OUTPUT); 
  
  lcd.init();
  lcd.begin(16,2);
}


/*
 * loop
 */
void loop() {
  // Ensure connected to wifi
  connectWifi();

  // Ensure connected to MQTT server
  connectPubSub();

  // Run the loop of the PubSubClient
  if (WiFi.status() == WL_CONNECTED && client.connected()) {
    client.loop();
  }
}

/*
 * myPrint:
 * Custom print function to only print if DEBUG is on
 */
void myPrint(String message) {
  if (DEBUG) {
    Serial.print(message);
  }
}

/*
 * myPrintln:
 * Custom print function to only print if DEBUG is on
 */
void myPrintln(String message) {
  if (DEBUG) {
    Serial.println(message);
  }
}

/* 
 *  connectWifi:
 *  Connect to the WiFi network if not already connected
 */
void connectWifi() {
  if (WiFi.status() != WL_CONNECTED) {
    myPrint("Connecting to ");
    myPrint(WIFI_SSID);
    myPrintln("...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
 
    if (WiFi.waitForConnectResult() != WL_CONNECTED) {
      return;
    }
    myPrintln("WiFi connected");
  }
}

/*
 * connectPubSub:
 * Connect to the MQTT server if not already connected
 */
void connectPubSub() {
  // client object makes connection to server
  if (!client.connected()) {
    myPrintln("Connecting to MQTT server");
      
    // Authenticating the client object
    if (client.connect("mqtt", MQTT_USER, MQTT_PASSWORD)) {
       myPrintln("Connected to MQTT server");       
       client.setCallback(callback);
       client.subscribe(SUB_TOPIC);   
    } else {
        myPrintln("Could not connect to MQTT server");   
    }
  }
}


/*
 * callback:
 * Executed when a message is read from MQTT
 */
void callback(char* topic, byte* payload, unsigned int len) {  
  if (DEBUG) {
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    for (int i = 0; i < len; i++) {
      Serial.print((char)payload[i]);
    }
    Serial.println();
  }

  // parse out and handle control
  char isRead = ((char)payload[0] == 'R');
  char command = (char)payload[1];
  char value[16] = "";
  
  for (int i = 2; i < len; i++) {
    value[i - 2] = (char)payload[i]; 
  }
  control(isRead, command, value);
}


/*
 * control:
 * Executes the appropriate control based on the given command
 * isRead: True if the command is a "read" command (e.g. reading temp)
 *         False if it is a "write" command (e.g. moving a motor)
 * command: Character that denotes the sensor/actuator being triggered
 *          M = motor, L = LED, T = temperature, D = display, S = status
 * value: String denoting the actual value being sent to an actuator
 *        e.g. for the motor, can be {f, l, r, b}
 *        for the message display, it is the text
*/
void control(bool isRead, char command, char* value) {
  if (command == 'L') {
    if (isRead) {
      readLED();
    } else {
      toggleLED(value[0] == '1');
    }
  }
  else if (command == 'T') {
    readTemp();
  }
  else if (command == 'M') {
    controlMotor(value[0]);
  }
  else if (command == 'D') {
    displayMessage(value);
  }
  else if (command == 'S') {
    checkStatus();
  }
}

/*
 * checkStatus:
 * Publishes a status confirmation
 */
void checkStatus() {
  client.publish(PUB_TOPIC, "S");
}

/*
 * toggleLED:
 * Toggles the LED
 */
void toggleLED(bool turnOn) {
  digitalWrite(LED_PIN, turnOn? HIGH : LOW);
}

/*
 * displayMessage:
 * Prints the message to the LCD display
 */
void displayMessage(char* message) {
  lcd.clear();
  lcd.backlight();
  lcd.print(message);
  delay(2000);
  lcd.clear();
  lcd.noBacklight();
}

/*
 * readLED:
 * Reads the value of the LED (on/off), packs it into a message, and publishes
 */
void readLED() {
  int val = digitalRead(LED_PIN);
  char msg[6] = "";
  sprintf(msg,"%s%d", "L", val);
  client.publish(PUB_TOPIC, msg);
}

/*
 * readTemp:
 * Reads the value of the temp sensor, packs it into a message, and publishes
 */
void readTemp() {
  int val = analogRead(TEMP_PIN);
  float voltage = (val/1024.0) * 3.3;
  float res = (voltage - 0.5) * 100;

  char result[4] = "";
  sprintf(result, "%.2f", res);

  char msg[6] = "";
  sprintf(msg,"%s%s", "T", result);
  client.publish(PUB_TOPIC, msg);
}

/*
 * controlMotor:
 * Activate the motors to drive the unit
 * dir: Direction {f, l, r, b}
 */
void controlMotor(char dir) {
  digitalWrite(MOTOR_ENA, HIGH);
  digitalWrite(MOTOR_ENB, HIGH);
  
  if (dir == 'f') {
    // Forward
    digitalWrite(MOTOR_IN1, HIGH);
    digitalWrite(MOTOR_IN2, LOW);
    
    digitalWrite(MOTOR_IN3, LOW);
    digitalWrite(MOTOR_IN4, HIGH);
  }
  else if (dir == 'l') {
    // Left
    digitalWrite(MOTOR_IN1, HIGH);
    digitalWrite(MOTOR_IN2, LOW);

    //digitalWrite(MOTOR_IN3, HIGH);
    //digitalWrite(MOTOR_IN4, LOW);
  }
  else if (dir == 'r') {
    // Right
    //digitalWrite(MOTOR_IN1, LOW);
    //digitalWrite(MOTOR_IN2, HIGH);

    digitalWrite(MOTOR_IN3, LOW);
    digitalWrite(MOTOR_IN4, HIGH);
  }
  else if (dir == 'b') {
    // Back
    digitalWrite(MOTOR_IN1, LOW);
    digitalWrite(MOTOR_IN2, HIGH);

    digitalWrite(MOTOR_IN3, HIGH);
    digitalWrite(MOTOR_IN4, LOW);
  }

  // Run the motors for the specified period
  delay(MOTOR_PERIOD);

  // Turn the motors off once finished
  digitalWrite(MOTOR_IN1, LOW);
  digitalWrite(MOTOR_IN2, LOW);
  digitalWrite(MOTOR_IN3, LOW);
  digitalWrite(MOTOR_IN4, LOW);
}
