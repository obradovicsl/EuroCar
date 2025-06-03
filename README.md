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

<img width="1503" alt="Screenshot 2025-06-03 at 1 11 27 PM" src="https://github.com/user-attachments/assets/5fc02eda-1d08-4ac5-8f4e-f6f62f7c90bc" />
[Profile informations - all rentals for logged user]

<img width="1498" alt="Screenshot 2025-06-03 at 1 11 42 PM" src="https://github.com/user-attachments/assets/48af1080-dd28-4b04-a596-a07600b5ca03" />
[Landing page - all rental companies with search and sort]

<img width="670" alt="Screenshot 2025-06-03 at 1 12 26 PM" src="https://github.com/user-attachments/assets/8b23a76e-ddf4-4919-831a-cd3555b7655d" />
[Company page - location and available vehicles]


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
