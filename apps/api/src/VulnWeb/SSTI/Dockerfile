FROM node:12
WORKDIR /app/
COPY package*.json /app/
RUN npm install
RUN npm install pm2 -g
COPY . .
RUN chown nobody:nogroup -R /app
CMD [ "/bin/bash", "./start.sh"]

