---
title: "Automated Nutrient and pH Controller for Mycology & Food Security"
description: "Technical documentation for an open-source Arduino Due-based hydroponic controller featuring automated dosing, pH calibration, and Bluetooth remote control."
pubDate: 2025-08-24
author: "G Dub"
tags: ["hydroponics", "arduino", "mycology", "food-security", "automation", "open-source"]
license: "MIT"
version: "1.0"
heroImage: "/images/hydroponics-controller.jpg"
---

import { Image } from 'astro:assets';

# Automated Nutrient and pH Controller for Mycology & Food Security

<div class="download-section">
  📄 **[Download Technical Documentation PDF](/assets/automated-nutrient-ph-controller.pdf)**
</div>

## Overview

This document details the design, implementation, and operation of a cutting-edge automated nutrient and pH controller system built on the Arduino Due platform. Designed to enhance mycology and food security applications, the system features automated dosing, robust pH calibration, and remote control via Bluetooth to ensure optimal conditions for cultivation.

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-08-24 | Initial Release |

**Author:** G Dub  
**License:** Open Source, MIT License

## 1.0 Introduction

This document describes the design, implementation, and operation of an automated nutrient and pH controller for hydroponic and liquid culture systems. The system is built on the Arduino Due platform and is designed for applications in mycology and food security, ensuring optimal environmental conditions for cultivation. 

Key features include:
- Automated dosing capabilities
- Robust pH calibration routine
- Remote control via Bluetooth interface
- Real-time monitoring and configuration

## 2.0 System Architecture

The system is composed of four main functional blocks:

### Control Unit
An Arduino Due microcontroller, selected for its:
- 3.3V logic compatibility
- 12-bit ADC precision
- Extended I/O capabilities

### Dosing Subsystem
Four 12V DC peristaltic pumps, each controlled by a single FDS6612A N-Channel MOSFET acting as a low-side switch, ensuring efficient and precise liquid delivery.

### Sensing Subsystem
A pH probe with associated 3.3V-compatible module. The system uses a two-point linear regression calibration method for high accuracy.

### User Interface
- **Local Display:** 2.2-inch TFT LCD for system status
- **Remote Access:** HC-05 Bluetooth module for mobile device connectivity
- **Data Persistence:** SD card storage for configuration data

## 3.0 Component List

| Component | Quantity | Description |
|-----------|----------|-------------|
| Arduino Due | 1 | Microcontroller board |
| FDS6612A MOSFET | 5 | N-Channel, logic-level MOSFET |
| Peristaltic Pump | 4 | 12V DC, 400mA |
| pH Sensor Module | 1 | 3.3V compatible |
| HC-05 Module | 1 | Bluetooth Transceiver |
| 2.2" TFT LCD | 1 | 220x176 with SD card cage |
| Power Supply | 1 | 12V DC, >2A |
| Breadboard | 1 | For prototyping |
| Jumper Wires | Assorted | For connections |
| 1N4001 Diode | 4 | Flyback diode for each pump motor |

## 4.0 Hardware Connections

### 4.1 Peristaltic Pump Control

1. Connect Arduino digital pins 2, 3, 4, and 5 to the Gate of each MOSFET
2. Connect the Source of each MOSFET to the common ground (Arduino GND and 12V power supply ground)
3. Connect the Drain of each MOSFET to the negative terminal of corresponding pump motor
4. Connect the positive terminal of each pump motor to the +12V rail
5. Install a 1N4001 diode in reverse across each pump motor's terminals

### 4.2 pH Sensing

1. Connect pH sensor module VCC to Arduino 3.3V pin
2. Connect GND to GND
3. Connect analog output pin to Arduino A0 pin

### 4.3 User Interface

**TFT LCD:**
- Connect TFT LCD module to Arduino Due headers
- Built-in level shifters simplify connection

**Bluetooth Module:**
- VCC to Arduino 5V pin
- GND to GND  
- TX to Arduino RX1 (pin 19)
- RX to Arduino TX1 (pin 18)
- *Note: Use voltage divider on TX to RX1 line or bi-directional logic-level shifter*

## 5.0 Software & Operation

The system runs on open-source firmware providing:

### Automated Dosing
- Nutrients (pumps 1-3) and pH-Up solution (pump 4)
- Triggered when pH drops below user-defined target
- Precise dosing control

### Calibration System
Two-point calibration using pH 7 and pH 4 reference solutions:
- **CALPH 7** command for pH 7 calibration
- **CALPH 4** command for pH 4 calibration
- Commands sent via Bluetooth interface

### Configuration Management
- All parameters stored in Config struct
- Data saved to `ph_cfg.txt` file on SD card
- **SAVE** command for configuration persistence

### Monitoring Interface
- LCD provides live system status
- Bluetooth enables remote monitoring and command execution
- Real-time parameter adjustment

## 6.0 Maintenance & Troubleshooting

### Regular Maintenance
- **Solution Levels:** Check pH and nutrient solution levels regularly
- **Probe Care:** Clean pH probe tip periodically for accurate readings
- **System Check:** Verify pump operation and connections

### Troubleshooting Guide
- **Pump Issues:** Check power supply connections and MOSFET wiring
- **Erratic pH Readings:** Re-run two-point calibration procedure
- **Connectivity Problems:** Verify Bluetooth pairing and signal strength

---

## A Smarter Way to Grow: The Sparkhope Hydroponics Controller

> Welcome to the future of growing! 🌿 At **SPARKHOPE.SPACE**, we believe that everyone should have the tools to grow their own food, especially in a world where food security is more important than ever.

### What This Circuit Provides

Think of this circuit as your personal robotic gardener designed to maintain perfect pH levels 24/7:

**🔬 pH Monitoring**  
A specialized probe continuously monitors your nutrient solution's pH, like a digital thermometer for acidity.

**🤖 Smart Dosing**  
When pH drops below optimal levels, the system automatically activates precision pumps to add exact doses of pH-Up solution.

**📅 Automated Feeding**  
Program the system to automatically dose plants with a full nutrient range on your defined schedule.

**📱 Simple Control**  
- Local display shows real-time status
- Bluetooth connectivity for wireless control
- Mobile app interface for settings and monitoring

### How to Use and Maintain

**Setup Process:**
1. Use Bluetooth to configure target pH and dosing amounts
2. Set nutrient schedules and pH-Up increments
3. Calibrate using standard reference solutions

**Calibration (Critical Step):**
- Use pH 7 and pH 4 calibration fluids
- Guided app process ensures accuracy
- Essential for reliable operation

**Ongoing Maintenance:**
- Keep pH probe clean (weekly wipe-down recommended)
- Monitor nutrient and pH-Up solution levels
- Check system status via mobile interface

### Build Your Own

This project is **fully open-source** and designed for community collaboration:

**🛠️ Hardware**
- Inexpensive, widely available components
- Clear assembly instructions
- Modular design for easy customization

**💻 Software**
- C++ firmware for Arduino
- Mobile app for remote control
- Complete source code available

**🌍 Community**
- Share modifications and improvements
- Support for builders of all skill levels
- Collaborative development encouraged

---

## Mission: Food Sovereignty Through Technology

This is more than just a gadget—it's a tool for **food sovereignty** and knowledge sharing. By creating and distributing these open-source tools, we're building a more resilient and secure food future for everyone.

Whether you're a seasoned mycologist, first-time grower, or electronics enthusiast, you can replicate, modify, and improve this design.

**🍄🌱** 

---

<div class="download-section">
  📄 **[Download Complete Technical Documentation PDF](/assets/automated-nutrient-ph-controller.pdf)**
</div>
