FROM maven:3.6.2-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM java:8
ADD target/zuul-proxy-0.0.1-SNAPSHOT.jar zuul-proxy-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "zuul-proxy-0.0.1-SNAPSHOT.jar"]
