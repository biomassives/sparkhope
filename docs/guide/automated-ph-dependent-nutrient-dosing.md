---
title: Pleurotus Liquid Culture Dosing Pump
description: A project for creating an Arduino-based dosing pump for Pleurotus liquid culture, calibrated using pH and temperature measurements.
date: 2025-08-20
tags:
  - Arduino
  - Dosing Pump
  - Liquid Culture
  - Pleurotus
---

# Pleurotus Liquid Culture Dosing Pump

## Project Summary
This project involves the development of an Arduino-based dosing pump specifically designed for administering nutrients to **Pleurotus** (oyster mushroom) liquid cultures. The dosing pump is calibrated based on real-time pH and temperature measurements, ensuring optimal growth conditions for the fungi. The system utilizes a peristaltic pump for precise dosing and is equipped with an LCD display for monitoring.

## Parts Used
| Item Description                                   | Estimated Cost | Item ID/Model                      | Order Link                                                                                     |
|----------------------------------------------------|----------------|------------------------------------|------------------------------------------------------------------------------------------------|
| **Low Flow Rate Peristaltic Pump**                 | $200 - $300    | LabV1 Intelligent Low Flow Pump    | [Order Here](https://darwin-microfluidics.com)                                               |
| **Standard Flow Rate Peristaltic Pump**            | $150 - $250    | Watson-Marlow Peristaltic Pump     | [Order Here](https://www.wmfts.com)                                                          |
| **Arduino Uno**                                    | $25            | A000066                            | [Order Here](https://store.arduino.cc/usa/arduino-uno-rev3)                                 |
| **Arduino Mega**                                   | $45            | A000067                            | [Order Here](https://store.arduino.cc/usa/arduino-mega-2560-rev3)                           |
| **pH Sensor**                                      | $150 - $250    | Sensorex pH Sensor                 | [Order Here](https://sensorex.com)                                                           |
| **DS18B20 Temperature Sensor**                      | $10            | DS18B20                            | [Order Here](https://www.adafruit.com/product/381)                                           |
| **16x2 LCD Display**                               | $10            | HD44780                            | [Order Here](https://www.adafruit.com/product/181)                                           |
| **Push Buttons / Rotary Encoder**                   | $5 - $15      | Rotary Encoder                     | [Order Here](https://www.adafruit.com/product/377)                                           |
| **SD Card Module**                                 | $5 - $10      | MicroSD Card Module                | [Order Here](https://www.adafruit.com/product/254)                                           |
| **Food-Grade Silicone Tubing**                     | $1 - $3/ft    | Silicone Tubing                    | [Order Here](https://www.moddiy.com)                                                          |
| **Fittings and Connectors**                         | $10 - $20     | Various                            | [Order Here](https://www.mcmaster.com)                                                       |
| **Mounting Hardware**                              | $5 - $15      | Various                            | [Order Here](https://www.mcmaster.com)                                                       |
| **Calibration Solutions for pH**                   | $20            | Calibration Kit                    | [Order Here](https://www.sensorex.com)                                                       |

## Arduino Code
Below is the Arduino code used for the dosing pump system. This code reads pH and temperature values, calculates the dosing rate, and controls the pump accordingly.

```cpp
#include <LiquidCrystal.h>

// Pin definitions
const int pHSensorPin = A0; // Analog pin for pH sensor
const int tempSensorPin = A1; // Analog pin for temperature sensor
const int pumpPin = 9; // Digital pin for controlling the pump
const int buttonPin = 2; // Button pin for starting the pump

// LCD setup
LiquidCrystal lcd(12, 11, 5, 4, 3, 2); // Adjust pins as necessary

// Variables
float pHValue = 0.0;
float temperatureValue = 0.0;
float dosingRate = 0.0;
bool pumpActive = false;

void setup() {
  // Initialize LCD
  lcd.begin(16, 2);
  lcd.print("Dosing Pump");
  
  // Set pin modes
  pinMode(pumpPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP); // Use internal pull-up resistor

  // Start with pump off
  digitalWrite(pumpPin, LOW);
}

void loop() {
  // Read pH and temperature values
  pHValue = analogRead(pHSensor
