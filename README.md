# Rental Car Agency

## Quick Overview
Fully functional application for a fictional car rental company

It contains registration, authorization, and authentication (using JWT) <br/>
It has multiple roles (admin, manager, and customer) <br/>

Admin - can create new rental objects <br/>
      - can create new managers <br/>
      - can block users <br/>
      - can see all users <br/>

Manager - can add new, or edit existing vehicles in his store 

Customer - can rent a car <br/>
         - (with every rental, the customer gets points, and levels up)

## Backend

The backend is built using nodeJS and express <br/>
The database is not used (it was emphasized in the specification), and all data is stored in JSON format

## Frontend

The frontend is built using VueJS 3

## Getting started

Follow these instructions to set up and run the application on your local machine.

1. Clone the project repository to your local machine:  
 a) git clone [https://github.com/obradovicsl/EuroCar](https://github.com/obradovicsl/EuroCar)  
 b) Or just simply download the file as a zip and unpack it  
3. Navigate to the project directory via terminal
4. Run **npm i command**
5. For starting the project, you will need 2 terminals (one for the front, and one for the back)
6. Using the first terminal, navigate to the **./backend folder**, and run **npm start**
7. Using the second terminal, navigate to the **./frontend folder** and run **npm run serve**
