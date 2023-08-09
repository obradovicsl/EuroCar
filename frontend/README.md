# Rental Car Agency

## Quick Overview
Fully functional application for a fictional car rental company

The application was the final project in 6th semester
It contains registration, authorization, authentication (using JWT)
It has multiple roles (admin, manager and customer)

Admin - can create new rental objects
      - can create new managers
      - can block users
      - can see all users

Manager - can add new, or edit existing vehicles in his store

Customer - can rent a car
         - (with every rental, the customer gets points, and level up)

## Backend

The backend is built using nodeJS and express
Database is not used (it was emphasized in the specification), and all data is stored in JSON format

## Frontend

The frontend is built using VueJS 3