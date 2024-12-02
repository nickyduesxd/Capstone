# Marine Corps Marathon Medical Communications System and User Interface

# Presentation Slidedeck
https://docs.google.com/presentation/d/1x1Ycq-gV-lEZHK0Q1es8ILs1GWJiPB6k/edit#slide=id.p23

## BLUF
We are making a UI, that is our first objective (specificaly the barcode system - creating and reading). Our second objective is testing out a Software Defined Mesh Network using off the shelf hardware and open source protocols.

## Overview
This Capstone fulfills both Cyber Operations and Computer Science Requirements. For the Cyber Operations Requirement we will be submitting a paper that highlights our communication system proposal based on a Software Defined Mesh Network for the replacement of HAM Radio System. This paper will include review of other solutions including drone systems and other Software Defined Networks as well as a security analysis and node optimization on the route.

For the Computer Science Requirement we will be submitting a User Interface which is described in greater detail below. After our trip to the Marine Corps Marathon to see how the communication system works on game day. The HAM Radio system acts as a 3rd back up. The UI currently used is used by all communication systems to track medical casualties in real time and lacks security and efficiency. After talking to our client, he did not have any specifications for what he wants us to design but wants to see what we come up with.

### What are you planning to build?
A user interface composed of an html server, data base, authentication system, volunteer login, administrator log in, bar code generation, bar code reading system, an automated email sender, and data compiler.
- HTML Server: We will be hosting the HTML server on a local domain using Node.js specifically http-server.
- Data Base: We intent to use MySQL to store all the data.
- Authentication System: This will be a simple Password Hash system, the user creates a username and password, the username and hash of the password is stored on a server.
- Volunteer and Adminstrator Log In: User will be able to log in and depending on if they are a volunteer or administrator they will have different homepages and access.
- Bar Code Generation: We intend to use the barcode package in python. 
- Bar Code Reading: We intend to create multiple solutions for this feature including using the zxing-cpp package, a purpose-built barcode reader hardware, and the pyzbar package.
- Automated Email Sender: We intend to use the smtplib, email.mime, and csv python packages.
- Data Compiler: The way the USMC Marathon is run, paper copies of Medical Reports are required, so this feature will compile all the casaulty reports into a single PDF file that can be printed and used in this case. We intend to use reportlab.pdfgen package.

### What problem will it solve?
Solve efficiency and manpower problems with the current HAM radio system. Currently the Medical Communication team is having a hard time finding volunteers with HAM radio licenses and are currently manually inputting data into their internal database which increases the time that a medical casaulty is reported to when it is recorded.

### Why is it important?
The Marine Corps Marathon is a large event and high visibility with ~70,000 participants and many more spectators as well distiniguished participants and guests.

## Market Resarch/Literature Review:
### Existing Process
- HAM Radios communication system. There are HAM radio operators strategically located throughout the route at medical tents that communicate with headquarters to report medical casaulties. There are 2 antennas put up.
- Once the medical casaulty is recieved by the individual at headquarters, it is recorded and inserted by hand into their internal database which is also a website.
- This internal database runs at live-time so at the command center located at the G6 shack the head of the medical team can actively track on medical casualties throughout the course with their system.  

### Market Research (And why our proposed system is better)
- Google form: Has limited design options, difficulty managing responses, concerns regarding privacy and security when collecting large amounts of personal information. Our design has more features, live tracking, and data analyses (updates map on number of casualties at certain locations).
- Chat Box: Can get disorganized and hard to compile data. Hard to adjust previous responses as well as perform any sort of analyses. Our design allows for volunteers to edit medical casualty reports with updates, as well as provide live time analytics based on location, easily store reports, and access them (instead of scrolling to find information on a specific casualty when using a chat box).
- Voice Transmission: Can get chaotic with multiple voice transmissions happening at the same time. Also data will have to be stored on hand or if using some sort of system (voice to text) has issues on proper format.
- App: Limited by system design of phone IOS vs Andriod. Volunteers have different phones so an app that connects between IPhone and Andriod will have issues.

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
- We inted to design a user interface using html, php, json, and java script that allows users to input information into the nodes and autopopulate and sort allowing for the lead volunteer to track medical casualties during live time.
- We intend to construct a meshed network using nodes bought from Eltec Automation [product_page](https://heltec.org/project/wifi-lora-32-v3/) with transceivers from semtech [product_page](https://www.semtech.com/products/wireless-rf/lora-transceivers/sx1276) and use the physical and transport systems from radio head [library_page](https://www.airspayce.com/mikem/arduino/RadioHead/).

## Project Management
  
### Product Back Log With Dates/Sprints
- Reconassiance: USMC Marathon MO 27OCT2024
- Data entry using web server interface: 10DEC24 (SPRINT 1)
- Data collection using database system: 10DEC24 (SPRINT 1)
- Barcode Generator using python (specifically Barcode and ImageWriter libraries): 24DEC24 (SPRINT 2)
- Barcode Scanner: 24DEC24 (SPRINT 2)
- Data PDF Compiler: 24DEC24 (SPRINT 2)
- Use Node Transport Layer on Laptop to connect to Web Server: 24DEC24 (SPRINT 2)
- User authentication system: 15JAN24 (SPRINT 3)
- Admin Authentication system: 15JAN24 (SPRINT 3)
- Connect Laptop to Node and connect to another Laptop through the Node to access Web Server: 15JAN24 (SPRINT 3)
- Automated Emailer Sender System: 15JAN24 (SPRINT 3)
- Live time tracking and analytic system: 30JAN24 (SPRINT 4)

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
MIT License
## Termination Clause
In the event of project termination, a "recovery plan" will be implemented.
