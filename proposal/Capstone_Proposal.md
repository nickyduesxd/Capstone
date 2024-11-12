# Marine Corps Marathon Medical Communications System and User Interface

# Presentation Slidedeck
https://docs.google.com/presentation/d/1x1Ycq-gV-lEZHK0Q1es8ILs1GWJiPB6k/edit#slide=id.p23

## Overview
This Capstone fulfills both Cyber Operations and Computer Science Requirements. For Cyber Operations we will be submitting a paper that highlights our communication system proposal based on the Mesh Network for the replacement of HAM Radios. For Computer Science we will be submitting a User Interface which is described below. The reason for the UI is because the HAM Radio system is used as a 3rd Backup in communications during the Marathon however the UI is the main UI used for the Marathon.
### What are you planning to build?
An off the shelf mesh network system that connects to a user interface composed of an html server, data base, authentication system, volunteer login, administrator log in, bar code generation, bar code reading system, an automated email sender, and data compiler.
Mesh Network System: 
HTML Server:
Data Base:
Authentication System:
Volunteer and Adminstrator Log In:
Bar Code Generation: 
Bar Code Reading:
Automated Email Sender:
Data Compiler: The way the USMC Marathon is run, paper copies of Medical Reports are required, so this feature will compile all the casaulty reports into a single PDF file that can be printed and used in this case.
### What problem will it solve?
Solve efficiency and manpower problems with the current HAM radio system. Currently the Medical Communication team is having a hard time finding volunteers with HAM radio licenses and are currently manually inputting data into their internal database which increases the time that a medical casaulty is reported to when it is recorded.
### Why is it important?
The Marine Corps Marathon is a large event and high visibility with ~70,000 participants and many more spectators as well distiniguished participants and guests.
## Market Resarch/Literature Review:
### Existing Process
- HAM Radios communication system. There are HAM radio operators strategically located throughout the route at medical tents that communicate with headquarters to report medical casaulties. There are 2 antennas put up.
- Once the medical casaulty is recieved by the individual at headquarters, it is recorded and inserted by hand into their internal database.
- This internal database runs at live-time so at the command center located at the G6 shack the head of the medical team can actively track on medical casualties throughout the course with their system.  
### Market Research (And why our proposed system is better)
- Google form: 
- Chat Box
- Voice Transmission
- App
### Literature Review: 
Communication System [here.](Literature_Review.md)

## Proposed Design and Architecture
### User Types/Personas:
- Main Customer's name is Mark and he is in charge of the HAM radio volunteer group for the USMC Marathon. 
- Joe is our secondary customer, he created the database system that they use to input medical information.
- Users, the medical staff at hand which are composed on volunteer nurses, paramedics, Hospital Corpsman from Quantico and Annapolis.
### System Design: Software Designed Mesh Network
- We intend to solve the problem by creating a mesh network, testing this network in an urban environment, and produce a user interface to go alongside it.
### System Architecture:
- We intend to construct a meshed network using nodes bought from Eltec Automation [product_page](https://heltec.org/project/wifi-lora-32-v3/) with transceivers from semtech [product_page](https://www.semtech.com/products/wireless-rf/lora-transceivers/sx1276) and use the physical and transport systems from radio head [library_page](https://www.airspayce.com/mikem/arduino/RadioHead/).
- We also inted to design a user interface using html, php, json, and java script that allows users to input information into the nodes and autopopulate and sort allowing for the lead volunteer to track medical casualties during live time.
## Project Management
### Premilinary Release Plan
Project is broken into 4 phases.
- Phase 1: Reconaissance (Attend the Marine Corps Marathon as observers in order to see the technology used as well as how gameday looks like)
- Phase 2: User interface development - Barcode
    - Barcode Technology over view
    - Barcode generation system
    - Barcode reading script
- Phase 3: User interface development - User Interface
    - Data entry phased with barcode system
    - Database System
    - Tracking System
- Phase 4: Network development
    - Setting up the nodes alonsgide transport layer system and phasing in with the UI.
### Product Back Log
- Reconassiance: USMC Marathon MO 27OCT2024
- Barcode Generator using python (specifically Barcode and ImageWriter libraries)
- Barcode Scanner App (Use open source - andriod application)
- Data entry using app interface
- Data collection using database system
- Data projection using app interface
- User authentication system
- Admin Authentication system
- Live time tracking system
- Node development system

### Faculty SME
- LCDR Downs (SME)
- Professor Dias (Faculty Advisor - Cyber Operation)
# Admin/Fine Print
## Customer Meeting Plan
- Weekly meetings with Capstone Advisor.
- Biweekly meetings with project advisors for status updates and guidance.
## Acceptance Window
Scheduled completion by the end of the academic year.
## How code will be delivered.
The code will be delivered via GitHub, with access provided to project advisors.
## Usage License
The project follows the standard usage license outlined in Paragraph 10 of the USNA CS Capstone Instruction.
## Licenses

## Termination Clause
In the event of project termination, a "recovery plan" will be implemented.
