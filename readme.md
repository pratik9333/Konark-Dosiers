<p align="center">
  <img  src="https://res.cloudinary.com/dqdnwfv3r/image/upload/v1676571303/Screenshot_2023-02-16_at_11.43.55_PM_eh6f0v.png">
</p>

Konark Dossiers is a digital portal that helps to provide new dth connections to its users.

## Features

- A user can buy new dth connection, with a free recharge pack included.
- Able to buy multiple accessories after first connection sets up.
- E-generated bill can be viewed and easily downloaded from the user dashboard.
- A reminder which reminds to recharge pack for a connection before 2-3 days of getting expiring.
- Seperate ISP dashboard to add new dth connections for users, able to add a new user. Seperate admin dashboard to add new/update accessories stocks, can update with new features to website, etc.

## Built With

- [NodeJS](https://nodejs.org/en/) - Node.js is an open-source, cross-platform, back-end JavaScript runtime environment.
- [MongoDB NoSQL](https://www.mongodb.com) - MongoDB is an open source NoSQL database management program.
- [ReactJS](https://www.reactjs.org) - A JavaScript library for building user interfaces.
- [Express.js](https://expressjs.com)- Fast, unopinionated, minimalist web framework for Node.js.

## Prerequisites

- [NodeJS](https://nodejs.org/en/) version 16+
- [MongoDB Compass](https://www.mongodb.com/products/compass)

## Getting Started

### .env file

To run this project, create a .env in root directory with and paste env variables

```javascript
MAIL_APP_PASSWORD = bsadxypwaszfsoth
DATABASE = mongodb://0.0.0.0:27017/konarklocaldb
PORT = 4000
SECRET = konarkdossiers12345
```

<h3>Start mongodb client, open terminal and install npm packages</h3>

```bash
npm i
```

<h3>Run development server</h3>

```bash
npm run dev
```

<h3>To test apis locally, import api collection from the folder Postman API Collection to your postman workspace</h3>

- Refer to this video if need help - https://www.youtube.com/watch?v=M-qHvBhULes&t=1s

- Make sure to include token to protected routes i.e product, that you will get when you sign up or log in

<h3>Use following credentials to login and test the app from main prod website<h3>

To test functionality of buying new connection

- email - harsh@gmail.com
- pass - 123456

To test functionality of buying accessories after new connection has set up

- email - pratik@gmail.com
- pass - 123456

## 📸 Screenshots

![Imgur](https://res.cloudinary.com/dqdnwfv3r/image/upload/v1676572500/Screenshot_2023-02-10_at_5.11.59_PM_gccf5b.png)
![Imgur](https://res.cloudinary.com/dqdnwfv3r/image/upload/v1676572500/Screenshot_2023-02-10_at_5.08.36_PM_pohci4.png)
![Imgur](https://res.cloudinary.com/dqdnwfv3r/image/upload/v1676572500/Screenshot_2023-02-10_at_5.08.09_PM_vfhxfh.png)
![Imgur](https://res.cloudinary.com/dqdnwfv3r/image/upload/v1676572500/Screenshot_2023-02-10_at_5.08.49_PM_vftmwj.png)
![Imgur](https://res.cloudinary.com/dqdnwfv3r/image/upload/v1676572500/Screenshot_2023-02-10_at_5.08.24_PM_fjgcfi.png)
![Imgur](https://res.cloudinary.com/dqdnwfv3r/image/upload/v1676572500/Screenshot_2023-02-10_at_5.08.36_PM_pohci4.png)

## Usefull Links

- [Deployed website link](https://konark-dossiers.netlify.app/)

- [Deployed api link](https://konark-dosiers-production.up.railway.app/)
