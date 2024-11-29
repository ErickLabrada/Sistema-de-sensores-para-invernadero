#include <Arduino.h>  // Required for the Serial and hexdump utility
#include <WiFi.h>
#include <SocketIoClient.h>


#define BUTTON_PIN 23
// Set your Wi-Fi credentials here
const char* ssid = "Totalplay-2.4G-6968";
const char* password = "FQeJ4UMyNsCWuht9";

// Set the Socket.IO server address and port
const char* socketIoServer = "192.168.100.18";  // Replace with the actual IP address of the server
const int socketIoPort = 3000;

SocketIoClient socketIO;

void sendSocketIoMessage(String event, String message);

class Manager {
public:
  String name;
  String phone;

  Manager(String n, String p) : name(n), phone(p) {}
};

class Section {
public:
  String sectionName;

  Section(String name) : sectionName(name) {}

  String toString() const {
    return "Section: " + sectionName;
  }
};

class Sensor {
public:
  Section section;
  bool sendAsJson;
  bool useCelsius;

  Sensor(Section s) : section(s) {
    sendAsJson = random(0, 2);  // Randomize data format
    useCelsius = random(0, 2); // Randomize temperature unit
  }

  void captureData() {
    float temperature = random(10, 30); // Temperature in Celsius
    float humidity = random(20, 60);    // Humidity in percentage

    String tempString = useCelsius ? String(temperature) : String(temperature * 9.0 / 5.0 + 32);
    String tempUnit = useCelsius ? "C" : "F";

    String data;
    if (sendAsJson) {
      data = "{"
             "\"GreenHouse\": {"
               "\"ID\": \"GH001\","
               "\"Sensor\": {"
                 "\"Section\": {"
                   "\"Name\": \"" + section.sectionName + "\","
                   "\"Data\": {"
                     "\"Temperature\": \"" + tempString + "\","
                     "\"Humidity\": \"" + String(humidity) + "%\","
                     "\"Temperature_Unit\": \"" + tempUnit + "\""
                   "}"
                 "}"
               "}"
             "}"
           "}";
    } else {
      data = "<GreenHouse>"
               "<ID>GH001</ID>"
               "<Sensor>"
                 "<Section>"
                   "<Name>" + section.sectionName + "</Name>"
                   "<Data>"
                     "<Temperature>" + tempString + "</Temperature>"
                     "<Humidity>" + String(humidity) + "%</Humidity>"
                     "<Temperature_Unit>" + tempUnit + "</Temperature_Unit>"
                   "</Data>"
                 "</Section>"
               "</Sensor>"
             "</GreenHouse>";
    }

    sendSocketIoMessage("message", data);
  }

  void captureAlarmingData() {
    float temperature = random(31, 40);
    float humidity = random(61, 80);

    String tempString = useCelsius ? String(temperature) : String(temperature * 9.0 / 5.0 + 32);
    String tempUnit = useCelsius ? "C" : "F";

    String data = "{"
                  "\"Temperature\": \"" + tempString + "\","
                  "\"Humidity\": \"" + String(humidity) + "%\""
                "}";
    sendSocketIoMessage("Data", data);
  }
};

class GreenHouse {
public:
  String id;
  Manager manager;
  Sensor* sensors[10];
  int sensorCount;

  GreenHouse(String greenhouseId, Manager m) : id(greenhouseId), manager(m), sensorCount(0) {}

  void addSensor(Sensor& sensor) {
    if (sensorCount < 10) {
      sensors[sensorCount++] = &sensor;
    }
  }

  void sendData() {
    for (int i = 0; i < sensorCount; ++i) {
      sensors[i]->captureData(); 
    }
  }
};

// Instances of greenhouses
GreenHouse myGreenHouse1("GH001", Manager("John Doe", "123456789"));
GreenHouse myGreenHouse2("GH002", Manager("Jane Doe", "987654321"));

void sendSocketIoMessage(String event, String message) {
  socketIO.emit(event.c_str(), message.c_str());
}

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");

Serial.print("Connecting to WebSocket at: ");
Serial.print(socketIoServer);
Serial.print(":");
Serial.println(socketIoPort);

socketIO.begin(socketIoServer, socketIoPort,"/socket.io/?EIO=4");
  
  socketIO.on("connect", [](const char *payload, size_t length) {
    Serial.println("Socket.IO connected!");
  });

  socketIO.on("disconnect", [](const char *payload, size_t length) {
    Serial.println("Socket.IO disconnected!");
  });

  socketIO.on("message", [](const char *payload, size_t length) {
    Serial.printf("Message received: %s\n", payload);
  });

  Section sectionA("Section A");
  Sensor sensorA(sectionA);

  Section sectionB("Section B");
  Sensor sensorB(sectionB);

  myGreenHouse1.addSensor(sensorA);
  myGreenHouse2.addSensor(sensorB);
}

void loop() {
  socketIO.loop();

  static unsigned long lastTime = 0;
  if (millis() - lastTime > 10000) {
    lastTime = millis();
    myGreenHouse1.sendData();
  }

  static unsigned long buttonLastTime = 0;
  if (digitalRead(BUTTON_PIN) == LOW && millis() - buttonLastTime > 300) {
    buttonLastTime = millis();
    GreenHouse* selected = &myGreenHouse1;
    if (selected->sensorCount > 0) {
      int randomSensorIndex = random(0, selected->sensorCount);
      selected->sensors[randomSensorIndex]->captureAlarmingData();
    }
  }
}