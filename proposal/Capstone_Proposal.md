# Marine Corps Marathon Medical Communications System and User Interface

## Overview
### What are you planning to build?
A mesh network system that connects to a user interface composed of an html server, data base, authentication system, volunteer login, and administrator log in.
### What problem will it solve?
Solve efficiency and manpower problems with the current HAM radio system. Currently the Medical Communication team is having a hard time finding volunteers with HAM radio licenses and are currently manually inputting data into their internal database.
### Why is it important?
The Marine Corps Marathon is a large event and high visibility with 30,000 participants and many more spectators as well distiniguished participants and guests.
## Market Resarch/Literature Review:
### Existing Process
- HAM Radios communication system. There are HAM radio operators strategically located throughout the route at medical tents that communicate with headquarters to report medical casaulties. There are 2 antennas put up.
- Once the medical casaulty is recieved by the individual at headquarters, it is recorded and inserted by hand into their internal database.
- Note: (Description of policy will be updated after Movement Order to USMC Marathon 27OCT25 where our team will have hands on experience with their system)  
### Market Research
-
### Literature Review: 
Can be found [here.](Literature_Review.md)

## Proposed Design and Architecture
### User Types/Personas:
- Main Customer's name is Mark and he is in charge of the HAM radio volunteer group for the USMC Marathon.
- Users are USMC Marathon volunteers. 
### System Design: Software Designed Mesh Network
- We intend to solve the problem by creating a mesh network, testing this network in an urban environment, and produce a user interface to go alongside it.
### System Architecture:
- We intend to construct a meshed network using nodes bought from Eltec Automation [product_page](https://heltec.org/project/wifi-lora-32-v3/) with transceivers from semtech [product_page](https://www.semtech.com/products/wireless-rf/lora-transceivers/sx1276) and use the physical and transport systems from radio head [library_page](https://www.airspayce.com/mikem/arduino/RadioHead/).
- We also inted to design a user interface using html, php, json, and java script that allows users to input information into the nodes and autopopulate and sort allowing for the lead volunteer to track medical casualties during live time.
## Project Management

### Premilinary Release Plan

### Product Back Log

### Faculty SME
- LCDR Downs (SME)
- Professor Dias (Faculty Advisor - Cyber Operation)

# Admin/Fine Print

## GFI/GFE
## Customer Meeting Plan
## Acceptance Window
Scheduled completion by the end of the academic year.
## How code will be delivered.
The code will be delivered via GitLab, with access provided to project advisors.
## Usage License
The project follows the standard usage license outlined in Paragraph 10 of the USNA CS Capstone Instruction.
## Termination Clause