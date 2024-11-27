#include <WiFi.h>
#include <WebSocketsClient.h>

// Replace with your network credentials
const char* ssid = "TP-Link_C869";
const char* password = "48233118";

// Replace with your WebSocket server URL and port
const char* webSocketServer = "192.168.0.109"; // Use "ws://IP_ADDRESS" for local IP
const int webSocketPort = 80;  // Use the correct port, default is usually 80 or 8080

// Declare WebSocket client
WebSocketsClient webSocket;

// Forward declaration of the sendWebSocketMessage function
void sendWebSocketMessage(String message);

// Define the Manager class
class Manager {
public:
  String name;
  String phone;

  Manager(String n, String p) : name(n), phone(p) {}
};

// Define the Threshold class
class Threshold {
public:
  float minTemperature;
  float maxTemperature;
  float minHumidity;
  float maxHumidity;

  Threshold(float minT, float maxT, float minH, float maxH)
      : minTemperature(minT), maxTemperature(maxT), minHumidity(minH), maxHumidity(maxH) {}
};

// Define the Section class
class Section {
public:
  String sectionName;
  Threshold threshold;

  Section(String name, Threshold t) : sectionName(name), threshold(t) {}
};

// Define the Sensor class
class Sensor {
public:
  Section section;
  bool sendAsJson;
  bool useCelsius;

  Sensor(Section s) : section(s) {
    // Randomly assign whether to send data in JSON or XML format
    sendAsJson = random(0, 2); // 0 or 1 for JSON or XML
    // Randomly assign whether to use Celsius or Fahrenheit
    useCelsius = random(0, 2); // 0 or 1 for Celsius or Fahrenheit
  }

  void captureData() {
    // Simulating sensor data capture
    float temperature = random(10, 40);
    float humidity = random(30, 80);

    String tempString = useCelsius ? String(temperature) + "C" : String(temperature * 9.0 / 5.0 + 32) + "F";
    String data;

    if (sendAsJson) {
      // Send data as JSON
      data = "{\"Temperature\": \"" + tempString + "\", \"Humidity\": \"" + String(humidity) + "%\"}";
    } else {
      // Send data as XML
      data = "<Sensor><Temperature>" + tempString + "</Temperature><Humidity>" + String(humidity) + "%</Humidity></Sensor>";
    }

    // Send the captured data over WebSocket
    sendWebSocketMessage(data);
  }
};

// Define the GreenHouse class
class GreenHouse {
public:
  String id;
  Manager manager;
  Sensor* sensors[10]; // Maximum of 10 sensors
  int sensorCount;

  GreenHouse(String greenhouseId, Manager m) : id(greenhouseId), manager(m), sensorCount(0) {}

  void addSensor(Sensor& sensor) {
    if (sensorCount < 10) {
      sensors[sensorCount++] = &sensor;
    }
  }

  void sendData() {
    // Capture and send data from all sensors
    for (int i = 0; i < sensorCount; ++i) {
      sensors[i]->captureData();
    }
  }
};

// Declare the GreenHouse objects for 4 different greenhouses
GreenHouse myGreenHouse1("GH001", Manager("John Doe", "123456789"));
GreenHouse myGreenHouse2("GH002", Manager("Jane Doe", "987654321"));
GreenHouse myGreenHouse3("GH003", Manager("Alice Smith", "555123456"));
GreenHouse myGreenHouse4("GH004", Manager("Bob Johnson", "555987654"));

void sendWebSocketMessage(String message) {
  if (webSocket.isConnected()) {
    webSocket.sendTXT(message);
    Serial.println("Sent message: " + message);
  } else {
    Serial.println("WebSocket not connected. Cannot send message.");
  }
}

// WebSocket event handler
void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("WebSocket Disconnected");
      break;

    case WStype_CONNECTED:
      Serial.println("WebSocket Connected");
      // Send a message once connected
      webSocket.sendTXT("Connected to WebSocket Server!");
      break;

    case WStype_TEXT:
      // Received a message from the server
      Serial.printf("Received message: %s\n", payload);
      break;

    case WStype_BIN:
      // Handle binary data
      Serial.println("Received binary data");
      break;
  }
}

void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");

  // Initialize WebSocket client
  webSocket.begin(webSocketServer, webSocketPort, "/"); // "/" is the endpoint, adjust if necessary

  // Define event handling for WebSocket
  webSocket.onEvent(webSocketEvent);

  // Connect and keep WebSocket alive
  webSocket.setReconnectInterval(5000);  // Reconnect every 5 seconds if connection is lost

  // Create Threshold, Section, and Sensor objects for each greenhouse
  Threshold sensorThreshold1(15.0, 30.0, 40.0, 70.0); 
  Section sensorSection1("Section A", sensorThreshold1);
  Sensor sensor1(sensorSection1);

  Threshold sensorThreshold2(10.0, 25.0, 30.0, 60.0);
  Section sensorSection2("Section B", sensorThreshold2);
  Sensor sensor2(sensorSection2);

  Threshold sensorThreshold3(20.0, 35.0, 45.0, 75.0);
  Section sensorSection3("Section C", sensorThreshold3);
  Sensor sensor3(sensorSection3);

  Threshold sensorThreshold4(18.0, 28.0, 40.0, 80.0);
  Section sensorSection4("Section D", sensorThreshold4);
  Sensor sensor4(sensorSection4);

  // Add sensors to each greenhouse
  myGreenHouse1.addSensor(sensor1);
  myGreenHouse2.addSensor(sensor2);
  myGreenHouse3.addSensor(sensor3);
  myGreenHouse4.addSensor(sensor4);
}

void loop() {
  // Keep WebSocket running
  webSocket.loop();

  // Send data periodically (every 10 seconds for example)
  static unsigned long lastTime = 0;
  if (millis() - lastTime > 10000) {
    lastTime = millis();

    // Send data from all greenhouses
    myGreenHouse1.sendData();  // This will call captureData() on all sensors in GH001
    myGreenHouse2.sendData();  // This will call captureData() on all sensors in GH002
    myGreenHouse3.sendData();  // This will call captureData() on all sensors in GH003
    myGreenHouse4.sendData();  // This will call captureData() on all sensors in GH004
  }
}
