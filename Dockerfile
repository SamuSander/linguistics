FROM php:8.1.17-apache

RUN docker-php-ext-install mysqli pdo_mysql

COPY WINOGRAD/ /var/www/html

EXPOSE 80