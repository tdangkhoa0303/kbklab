FROM node:12
COPY app_1/package*.json /app/app_1/
COPY app_2/package*.json /app/app_2/
WORKDIR /app/
COPY . .
RUN cd app_1 && npm install && npm install pm2 -g && cd ../app_2 && npm install && npm install pm2 -g 
CMD [ "/bin/bash", "./start.sh"]