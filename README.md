# Rental Car Agency

## Quick Overview
Fully functional application for a fictional car rental company

The application was the final project in 6th semester <br/>
It contains registration, authorization, authentication (using JWT) <br/>
It has multiple roles (admin, manager and customer) <br/>

Admin - can create new rental objects <br/>
      - can create new managers <br/>
      - can block users <br/>
      - can see all users <br/>

Manager - can add new, or edit existing vehicles in his store 

Customer - can rent a car <br/>
         - (with every rental, the customer gets points, and level up)

## Backend

The backend is built using nodeJS and express <br/>
Database is not used (it was emphasized in the specification), and all data is stored in JSON format

## Frontend

The frontend is built using VueJS 3