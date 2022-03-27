FROM php:7.4-cli
RUN echo "dash dash/sh boolean false" | debconf-set-selections
RUN DEBIAN_FRONTEND=noninteractive dpkg-reconfigure dash
WORKDIR /app/
COPY . .
CMD [ "/bin/sh", "start.sh" ]
