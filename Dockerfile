FROM ubuntu:18.04

MAINTAINER Maciej Książkiewicz <student.wazny@uj.edu.pl>

RUN useradd ujot --create-home

RUN apt-get update
RUN apt-get install -y --fix-missing nodejs npm systemd
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install mysql-server
RUN mysql -u root -e "CREATE DATABASE book_database"


RUN apt-get install -y default-jre

RUN apt-get install -y scala
RUN echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 642AC823
RUN apt-get update
RUN apt-get install -y sbt

COPY . .

RUN sbt compile
RUN sbt run
EXPOSE 3000
EXPOSE 9000

CMD sbt run