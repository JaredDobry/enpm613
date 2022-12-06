# enpm613

Group project for ENPM613 - Software Design &amp; Implementation

# Backend

## Pre-requisites

You must have Python installed on your computer.
There are a variety of ways to get this:

- Download the newest stable version from https://www.python.org/downloads/ (3.11 recommended)
- If on Windows, use winget (Replace _ with your version number):
  winget install Python.Python.3._
- If on Linux, use your package manager

## Installation

To install the necessary environment dependencies, run (inside /enpm613/shiftchange):
poetry install

## Running

Run (inside /enpm613/shiftchange):
poetry run python ./manage.py

# Frontend

## Pre-requisites

You must have Node.JS installed on your computer.
There are a variety of ways to get this:

- Download the newest LTS version from https://nodejs.org/en/
- If on Windows, use winget:
  winget install OpenJS.NodeJS.LTS
- If on Linux, use your package manager

## Installation

To install the necessary environment dependencies, run (inside /enpm613/shiftchange-ui):
npm install

## Development environment

For hot-reloading and to view the application with mocks, run (inside /enpm613/shiftchange-ui):
npm start

## Building the production software

For building a production build, run (inside /enpm613/shiftchange-ui):
npm run build

## Serving the production build

After building as outlined above, run (inside /enpm613/shiftchange-ui):
npx serve -s build
