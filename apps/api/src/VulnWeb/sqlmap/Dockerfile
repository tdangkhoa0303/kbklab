FROM php:7.2-apache
RUN apt update
RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY --chown=www-data:www-data ./ /var/www/html
