FROM node:11.7-slim

RUN npm install -g nodemon
RUN mkdir -p /app 

WORKDIR /app

ENV PORT=80
EXPOSE 80
EXPOSE 9229

CMD ["nodemon", "--inspect=0.0.0.0:9229", "-L", "server.js", "--delay", "3"]