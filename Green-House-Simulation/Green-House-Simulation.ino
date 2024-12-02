#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <HTTPClient.h>

//const char* socketIoServer = "192.168.0.109";
const uint16_t socketIoPort = 80;
const char* socketIoServer = "192.168.0.109";

WiFiMulti WiFiMulti;
SocketIOclient socketIO;

#define BUTTON_PIN 23
#define USE_SERIAL Serial

// Websocket event handler
void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      USE_SERIAL.printf("[IOc] Disconnected!\n");
      break;
    case sIOtype_CONNECT:
      USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);
      socketIO.send(sIOtype_CONNECT, "/");
      break;
    case sIOtype_EVENT:
      {
        char* sptr = NULL;
        int id = strtol((char*)payload, &sptr, 10);
        USE_SERIAL.printf("[IOc] get event: %s id: %d\n", payload, id);
        if (id) {
          payload = (uint8_t*)sptr;
        }
        DynamicJsonDocument doc(2048);
        DeserializationError error = deserializeJson(doc, payload, length);
        if (error) {
          USE_SERIAL.print(F("deserializeJson() failed: "));
          USE_SERIAL.println(error.c_str());
          return;
        }

        String eventName = doc[0];
        USE_SERIAL.printf("[IOc] event name: %s\n", eventName.c_str());

        if (id) {
          DynamicJsonDocument docOut(2048);
          JsonArray array = docOut.to<JsonArray>();
          JsonObject param1 = array.createNestedObject();
          param1["now"] = millis();
          String output;
          output += id;
          serializeJson(docOut, output);
          socketIO.send(sIOtype_ACK, output);
        }
      }
      break;
    case sIOtype_ACK:
      USE_SERIAL.printf("[IOc] get ack: %u\n", length);
      break;
    case sIOtype_ERROR:
      USE_SERIAL.printf("[IOc] get error: %u\n", length);
      break;
    case sIOtype_BINARY_EVENT:
      USE_SERIAL.printf("[IOc] get binary: %u\n", length);
      break;
    case sIOtype_BINARY_ACK:
      USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
      break;
  }
}

// Simulation classes
class Manager {
public:
  String name;
  String phone;

  Manager(String n, String p)
    : name(n), phone(p) {}
};

class Section {
public:
  String sectionName;
  Section(String name)
    : sectionName(name) {}

  String toString() const {
    return "Section: " + sectionName;
  }
};

class Sensor {
public:
  Section section;
  bool sendAsJson;  // true if JSON, false for non-JSON format
  bool useCelsius;  // true for Celsius, false for Fahrenheit

  // Updated constructor to accept the temperature unit and format
  Sensor(Section s, bool celsius, bool jsonFormat)
    : section(s), useCelsius(celsius), sendAsJson(jsonFormat) {}

  void captureData(String id, String jwt) {
    // Improved debugging for sendAsJson    
    float temperature = random(20, 30);          // Example temperature in Celsius
    float humidity = random(45, 60);             // Example humidity percentage

    String tempString = useCelsius ? String(temperature) : String(temperature * 9.0 / 5.0 + 32);  // Convert to Fahrenheit if needed
    String tempUnit = useCelsius ? "C" : "F";                                                     // Set unit to Celsius or Fahrenheit

    String data;
    if (sendAsJson) {
      // JSON format
      data = "{"
             "\"GreenHouse\": {"
             "\"Identifier\": \""
             + id + "\","
                    "\"Sensor\": {"
                    "\"Section\": {"
                    "\"Name\": \""
             + section.sectionName + "\","
                                     "\"Data\": {"
                                     "\"Temperature\": \""
             + tempString + "\","
                            "\"Humidity\": \""
             + String(humidity) + "\","
                                  "\"Temperature_Unit\": \""
             + tempUnit + "\""
                          "}"
                          "}"
                          "}"
                          "}"
                          "}";
    } else {
      // Non-JSON format (XML-like)
      data = "<GreenHouse>"
             "<Identifier>"
             + id + "</Identifier>"
                    "<Sensor>"
                    "<Section>"
                    "<Name>"
             + section.sectionName + "</Name>"
                                     "<Data>"
                                     "<Temperature>"
             + tempString + "</Temperature>"
                            "<Humidity>"
             + String(humidity) + "</Humidity>"
                                  "<Temperature_Unit>"
             + tempUnit + "</Temperature_Unit>"
                          "</Data>"
                          "</Section>"
                          "</Sensor>"
                          "</GreenHouse>";
    }

    DynamicJsonDocument doc(2048);
    JsonArray array = doc.to<JsonArray>();
    array.add("Data");


    JsonObject param1 = array.createNestedObject();
    param1["payload"] = data;

    String output;
    serializeJson(doc, output);

    String customHeader = "Authorization: Bearer " + jwt;
    const char* customHeaderChar = customHeader.c_str();

    socketIO.setExtraHeaders(customHeaderChar);

    socketIO.send(sIOtype_EVENT, output);
  }
  void captureAlarmingData(String id, String jwt) {
    // Improved debugging for sendAsJson
   
    float temperature = random(31, 40);          // Example temperature in Celsius
    float humidity = random(71, 80);             // Example humidity percentage

    String tempString = useCelsius ? String(temperature) : String(temperature * 9.0 / 5.0 + 32);  // Convert to Fahrenheit if needed
    String tempUnit = useCelsius ? "C" : "F";                                                     // Set unit to Celsius or Fahrenheit

    String data;
    if (sendAsJson) {
      // JSON format
      data = "{"
             "\"GreenHouse\": {"
             "\"Identifier\": \""
             + id + "\","
                    "\"Sensor\": {"
                    "\"Section\": {"
                    "\"Name\": \""
             + section.sectionName + "\","
                                     "\"Data\": {"
                                     "\"Temperature\": \""
             + tempString + "\","
                            "\"Humidity\": \""
             + String(humidity) + "\","
                                  "\"Temperature_Unit\": \""
             + tempUnit + "\""
                          "}"
                          "}"
                          "}"
                          "}"
                          "}";
    } else {
      // Non-JSON format (XML-like)
      data = "<GreenHouse>"
             "<Identifier>"
             + id + "</Identifier>"
                    "<Sensor>"
                    "<Section>"
                    "<Name>"
             + section.sectionName + "</Name>"
                                     "<Data>"
                                     "<Temperature>"
             + tempString + "</Temperature>"
                            "<Humidity>"
             + String(humidity) + "</Humidity>"
                                  "<Temperature_Unit>"
             + tempUnit + "</Temperature_Unit>"
                          "</Data>"
                          "</Section>"
                          "</Sensor>"
                          "</GreenHouse>";
    }

    DynamicJsonDocument doc(2048);
    JsonArray array = doc.to<JsonArray>();
    array.add("Data");

    JsonObject param1 = array.createNestedObject();
    param1["payload"] = data;

    String output;
    serializeJson(doc, output);

    String customHeader = "Authorization: Bearer " + jwt;
    const char* customHeaderChar = customHeader.c_str();

    socketIO.setExtraHeaders(customHeaderChar);

    socketIO.send(sIOtype_EVENT, output);
  }
};


class GreenHouse {
public:
  String id;
  String auth;
  Manager manager;
  Sensor* sensors[10];
  int sensorCount;

  GreenHouse(String greenhouseId, Manager m)
    : id(greenhouseId), manager(m), sensorCount(0) {}

  void addSensor(Sensor* sensor) {  // Pass pointer to the sensor
    if (sensorCount < 10) {
      sensors[sensorCount++] = sensor;
    }
  }

  void sendAlarmingData() {
    sensors[random(sensorCount)]->captureAlarmingData(this->id, this->auth);
  }

  void sendData() {
    for (int i = 0; i < sensorCount; ++i) {
      sensors[i]->captureData(this->id, this->auth);
    }
  }

  String login() {
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      Serial.println("192.168.0.109:3000/auth/login");

      http.begin("http://192.168.0.109:3000/auth/login");  // Replace with your server's endpoint

      // Create the JSON document for the request body
      StaticJsonDocument<1024> doc;
      doc["identifier"] = this->id;

      String requestBody;
      serializeJson(doc, requestBody);                     // Use the correct document
      http.addHeader("Content-Type", "application/json");  // Add content type header
      Serial.println(requestBody);
      int httpResponseCode = http.POST(requestBody);

      if (httpResponseCode > 0) {  // Check if the request was successful
        String response = http.getString();

        StaticJsonDocument<300> responseJson;
        DeserializationError error = deserializeJson(responseJson, response);

        if (!error) {
          // Extract the JWT token from the response and set it to the `auth` attribute
          String jwtToken = responseJson["access_token"].as<String>();
          this->auth = jwtToken;  // Set the token in the auth attribute
          Serial.println("JWT Token: " + jwtToken);
          http.end();       // Clean up HTTP client
          return jwtToken;  // Return the token
        } else {
          Serial.println("Failed to parse JSON response");
        }
      } else {
        Serial.println("HTTP POST failed, response code: " + String(httpResponseCode));
      }

      http.end();  // Clean up HTTP client
    } else {
      Serial.println("WiFi is not connected");
    }

    return "";  // Return an empty string if login fails
  }
};

// Instances of greenhouses
GreenHouse myGreenHouse1("GH001", Manager("John Doe", "123456789"));
GreenHouse myGreenHouse2("GH002", Manager("Jane Doe", "987654321"));
GreenHouse myGreenHouse3("GH003", Manager("John Doe", "123456789"));
GreenHouse myGreenHouse4("GH004", Manager("Jane Doe", "987654321"));

void setup() {
  USE_SERIAL.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  USE_SERIAL.setDebugOutput(true);
  USE_SERIAL.println();
  USE_SERIAL.println();

  WiFiMulti.addAP("TP-Link_C869", "48233118");
  //WiFiMulti.addAP("INFINITUM5F36", "cbGQy4qWdG");

  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }

  String ip = WiFi.localIP().toString();
  USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());



  Section sectionA("Section A");
  Sensor* sensorA = new Sensor(sectionA, true, true);
  Section sectionB("Section B");
  Sensor* sensorB = new Sensor(sectionB, true, false);
  Section sectionC("Section C");
  Sensor* sensorC = new Sensor(sectionC, false, true);
  Section sectionD("Section D");
  Sensor* sensorD = new Sensor(sectionD, false, false);

  myGreenHouse1.addSensor(sensorA);
  myGreenHouse2.addSensor(sensorB);
  myGreenHouse3.addSensor(sensorC);
  myGreenHouse4.addSensor(sensorD);

  pinMode(BUTTON_PIN, INPUT_PULLUP);

  socketIO.begin(socketIoServer, 80, "/socket.io/?EIO=4");
  socketIO.onEvent(socketIOEvent);

  myGreenHouse1.login();
  myGreenHouse2.login();
  myGreenHouse3.login();
  myGreenHouse4.login();
}
unsigned long messageTimestamp = 0;
void loop() {

  if (digitalRead(BUTTON_PIN) == LOW) {
    // Choose a random greenhouse and send alarming data from one of its sensors
    int greenhouseIndex = random(0, 4);
    if (greenhouseIndex == 0) {
      myGreenHouse1.sendAlarmingData();
    } else if (greenhouseIndex == 1) {
      myGreenHouse2.sendAlarmingData();
    } else if (greenhouseIndex == 2) {
      myGreenHouse3.sendAlarmingData();
    } else {
      myGreenHouse4.sendAlarmingData();
    }

    delay(500);  // Debounce delay
  }

  socketIO.loop();
  uint64_t now = millis();
  static unsigned long lastTime = 0;

  if (millis() - lastTime > 10000) {
    lastTime = millis();
    //myGreenHouse1.sendAlarmingData();
    myGreenHouse1.sendData();
    myGreenHouse2.sendData();
    myGreenHouse3.sendData();
    myGreenHouse4.sendData();
  }
}
