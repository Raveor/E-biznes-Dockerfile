FROM ubuntu:18.04

MAINTAINER Maciej Książkiewicz <student.wazny@uj.edu.pl>

RUN useradd ujot --create-home

RUN apt-get update 
RUN apt-get install -y vim unzip curl git wget gnupg

# dodaj konfigurację tutaj

RUN apt-get install -y default-jre

RUN apt-get install -y scala
RUN echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 642AC823
RUN apt-get update
RUN apt-get install -y sbt

USER ujot

CMD echo "Hello World"
CMD java -version
CMD scala -version
