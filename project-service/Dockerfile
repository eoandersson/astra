FROM maven:3.6.2-jdk-11-slim AS build

COPY src /home/app/src
COPY pom.xml /home/app

RUN mvn -f /home/app/pom.xml dependency:go-offline
RUN mvn -f /home/app/pom.xml package

FROM java:8
COPY --from=build /home/app/target/project-service-1.0.jar /usr/local/lib/project-service-1.0.jar
ENTRYPOINT ["java", "-jar", "/usr/local/lib/project-service-1.0.jar"]
