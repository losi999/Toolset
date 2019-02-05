FROM node:11.7-slim

RUN npm install -g nodemon
RUN mkdir -p /app
WORKDIR /app

ENV PORT=80
EXPOSE 80

CMD ["nodemon", "-L", "server.js"]