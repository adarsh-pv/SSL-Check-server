# SSL Checker API

This project is a Node.js application that provides an API to check the SSL certificate details of a given domain. The application fetches SSL information such as validity, issuer details, and more. It uses the `ssl-checker` and `pem` libraries to fetch and parse certificate information.

## Features

- Check if an SSL certificate is valid for a given domain
- Get the validity period (start and end date) of the certificate
- Get detailed information about the issuer and the subject of the SSL certificate
- Verify if the certificate is self-signed or CA-signed
- Fetch additional SSL information such as CRL status

## Tech Stack

- **Backend:** Node.js, Express.js
- **Libraries:** `ssl-checker`, `https`, `pem`

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v14 or later
- npm (Node package manager)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/adarsh-pv/Nextjs-client.git
1.Navigate to project directory 
cd SSL-Check-server
2.Install the necessary dependencies:
npm install
3.Start the Node.js server:
npm start
