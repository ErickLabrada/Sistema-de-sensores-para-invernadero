#include <WiFi.h>
#include <WebSocketsClient.h>

#define BUTTON_PIN 23

const char* ssid = "TP-Link_C869";
const char* password = "48233118";

const char* webSocketServer = "192.168.0.109"; 
const int webSocketPort = 80;

WebSocketsClient webSocket;

void sendWebSocketMessage(String message);

class Manager {
public:
  String name;
  String phone;

  Manager(String n, String p) : name(n), phone(p) {}
};

class Threshold {
public:
  float minTemperature;
  float maxTemperature;
  float minHumidity;
  float maxHumidity;

  // Constructor to initialize the threshold values with valid ranges
  Threshold(float minT, float maxT, float minH, float maxH)
      : minTemperature(minT), maxTemperature(maxT), minHumidity(minH), maxHumidity(maxH) {}

  String toString() const {
    return "minT: " + String(minTemperature) + ", maxT: " + String(maxTemperature) +
           ", minH: " + String(minHumidity) + ", maxH: " + String(maxHumidity);
  }
};

class Section {
public:
  String sectionName;
  Threshold threshold;

  Section(String name, Threshold t) : sectionName(name), threshold(t) {}

  String toString() const {
    return "Section: " + sectionName + ", Threshold: [" + threshold.toString() + "]";
  }

  Threshold getThreshold(){
    return threshold;
  }
};

class Sensor {
public:
  Section section;
  bool sendAsJson;
  bool useCelsius;

  Sensor(Section s) : section(s) {
    sendAsJson = random(0, 2);
    useCelsius = random(0, 2);
  }

  void captureData(Threshold threshold) {
    // Ensure realistic temperature and humidity generation within threshold ranges
    float temperature = threshold.minTemperature + 
                        ((float)random(0, 10000) / 10000.0) * 
                        (threshold.maxTemperature - threshold.minTemperature);

    float humidity = threshold.minHumidity + 
                     ((float)random(0, 10000) / 10000.0) * 
                     (threshold.maxHumidity - threshold.minHumidity);

    // Convert to Celsius or Fahrenheit as needed
    String tempString = useCelsius ? String(temperature) + "C" : String(temperature * 9.0 / 5.0 + 32) + "F";
    String data;

    if (sendAsJson) {
      data = "{\"Temperature\": \"" + tempString + "\", \"Humidity\": \"" + String(humidity) + "%\"}";
    } else {
      data = "<Sensor><Temperature>" + tempString + "</Temperature><Humidity>" + String(humidity) + "%</Humidity></Sensor>";
    }

    sendWebSocketMessage(data);
  }

  String toString() const {
    return  "Threshold: [" + section.threshold.toString() + "]";
  }

  void captureAlarmingData(Threshold threshold) {
    // Limit random variation for temperature and humidity to generate alarming data
    float temperature = threshold.maxTemperature + (random(0, 1000) / 1000.0) * 5;  // Adjust the factor (5) if needed

    float humidity = threshold.maxHumidity + (random(0, 1000) / 1000.0) * 5;  // Adjust the factor (5) if needed

    Serial.println(threshold.toString());

    String tempString = useCelsius ? String(temperature) + "C" : String(temperature * 9.0 / 5.0 + 32) + "F";
    String data;

    if (sendAsJson) {
      data = "{\"Temperature\": \"" + tempString + "\", \"Humidity\": \"" + String(humidity) + "%\"}";
    } else {
      data = "<Sensor><Temperature>" + tempString + "</Temperature><Humidity>" + String(humidity) + "%</Humidity></Sensor>";
    }

    sendWebSocketMessage(data);
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
      sensors[i]->captureData(sensors[i]->section.getThreshold()); 
    }
  }

  String toString() const {
    String result = "GreenHouse ID: " + id + "\n";
    result += "Manager: " + manager.name + " (Phone: " + manager.phone + ")\n";
    result += "Sensors:\n";
    
    for (int i = 0; i < sensorCount; ++i) {
      result += "  Sensor " + String(i + 1) + ": " + sensors[i]->toString() + "\n";
    }
    
    return result;
  }
};

// Instances of greenhouses
GreenHouse myGreenHouse1("GH001", Manager("John Doe", "123456789"));
GreenHouse myGreenHouse2("GH002", Manager("Jane Doe", "987654321"));
GreenHouse myGreenHouse3("GH003", Manager("Alice Smith", "555123456"));
GreenHouse myGreenHouse4("GH004", Manager("Bob Johnson", "555987654"));

void sendWebSocketMessage(String message) {
  if (webSocket.isConnected()) {
    webSocket.sendTXT(message);
  } else {
    Serial.println("WebSocket not connected. Cannot send message.");
  }
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("WebSocket Disconnected");
      break;

    case WStype_CONNECTED:
      Serial.println("WebSocket Connected");
      webSocket.sendTXT("Connected to WebSocket Server!");
      break;

    case WStype_TEXT:
      //Serial.printf("Received message: %s\n", payload);
      break;

    case WStype_BIN:
      //Serial.println("Received binary data");
      break;
  }
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

  webSocket.begin(webSocketServer, webSocketPort, "/");
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);

  // Define threshold ranges that are realistic
  Threshold sensorThreshold1(15.0, 30.0, 40.0, 70.0);
  Section sensorSection1("Section A", sensorThreshold1);
  Sensor sensor1(sensorSection1);

  Serial.println(sensor1.toString());

  Threshold sensorThreshold2(10.0, 25.0, 30.0, 60.0);
  Section sensorSection2("Section B", sensorThreshold2);
  Sensor sensor2(sensorSection2);

  Threshold sensorThreshold3(20.0, 35.0, 45.0, 75.0);
  Section sensorSection3("Section C", sensorThreshold3);
  Sensor sensor3(sensorSection3);

  Threshold sensorThreshold4(18.0, 28.0, 40.0, 80.0);
  Section sensorSection4("Section D", sensorThreshold4);
  Sensor sensor4(sensorSection4);

  myGreenHouse1.addSensor(sensor1);
  myGreenHouse2.addSensor(sensor2);
  myGreenHouse3.addSensor(sensor3);
  myGreenHouse4.addSensor(sensor4);


  Serial.println(myGreenHouse1.toString());


}

void loop() {
  webSocket.loop();

  static unsigned long lastTime = 0;
  if (millis() - lastTime > 10000) {
    lastTime = millis();
    myGreenHouse1.sendData();
    myGreenHouse2.sendData();
    myGreenHouse3.sendData();
    myGreenHouse4.sendData();
  }

  if (digitalRead(BUTTON_PIN) == LOW) {
    Serial.println("BUTTON PRESSED");
    GreenHouse* greenhouses[] = { &myGreenHouse1, &myGreenHouse2, &myGreenHouse3, &myGreenHouse4 };
    int randomGreenhouseIndex = random(0, 4);
    GreenHouse* selectedGreenhouse = greenhouses[randomGreenhouseIndex];
    if (selectedGreenhouse->sensorCount > 0) {
      int randomSensorIndex = random(0, selectedGreenhouse->sensorCount);
      selectedGreenhouse->sensors[randomSensorIndex]->captureAlarmingData(selectedGreenhouse->sensors[randomSensorIndex]->section.getThreshold());
    }
    delay(1000);
  }
}