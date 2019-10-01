FROM maven:3.6.2-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM java:8
ADD target/login-service-1.0.jar login-service-1.0.jar
ENTRYPOINT ["java", "-jar", "login-service-1.0.jar"]
