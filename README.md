# Arch DDD Nestjs

## Required `docker` and `docker-compose`

<img src="/imgs/41ni9tGguyL.jpg" alt="book" title="book" height="104" width="76" align="right"/>

#### How to run the application?

- `cp -r .env.example .env`
  
```bash

MONGODB_URI=
MONGODB_PORT=
PORT=
THROTTLE_TTL= 
THROTTLE_LIMIT=
SALT=
JWT_SECRET_KEY=
SMTP_SENDER_EMAIL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER_NAME=
SMTP_PASSWORD=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_PRIVATE_KEY_ID=
TZ=
```

- view script in `package.json`

- run `yarn up` that exec command `docker-compose down && docker-compose up --build`

#### How to test the application?

- run `yarn test` that exec command `jest`

#### How to clean docker containers and images?

- run `yarn prune` that exec command `docker system prune -a -f --volumes`
