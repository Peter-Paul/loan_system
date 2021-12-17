# loan_system
Simple loan management system to track progress of installments for a loan. Designed with Angular and Bootstrap on the frontend and uses APIs provided by Django server in the backend. trial

## Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

To run the frontend server on your local machine, navigate to the the `loans` folder and run the following commands as instructed

### Install Node Modules

Run `npm install` to install all node modules within the `package-lock.json` file

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Backend

This project was generated with `Django version 4.0` and `Python version 3.9`

To run the backend server on your local machine, navigate to the the `backend` folder and run the following commands as instructed

### Install Modules

Create a python environment using `pipenv shell`

Run `pipenv update` to lock and install all required modules in `Pipfile`

### Create Database and Makemigrations

Use XAMPP/WAMPP to start Apache and MySQL services on your machine

Create locally hosted database called `loans`

Alternatively, open `loans/settings.py` and modify `DATABASES['default']` key values to your prefered values

Run `python manage.py makemigrations`. Once migrations are done, run `python manage.py migrate` to update database

### Development Server

Run `python manage.py runserver` to launch the django development server

### Further help

To get more help on Django usage check out the [Django Documentation](https://docs.djangoproject.com/en/4.0/) page.

