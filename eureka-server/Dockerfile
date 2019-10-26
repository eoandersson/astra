FROM maven:3.6.2-jdk-11-slim AS build

COPY src /home/app/src
COPY pom.xml /home/app

RUN mvn -f /home/app/pom.xml dependency:go-offline
RUN mvn -f /home/app/pom.xml package

FROM java:8
COPY --from=build /home/app/target/eureka-server-0.0.1-SNAPSHOT.jar /usr/local/lib/eureka-server-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/usr/local/lib/eureka-server-0.0.1-SNAPSHOT.jar"]
