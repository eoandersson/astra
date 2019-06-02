# Sling Project Management

**Sling** is a project management tool where users can define projects, as well as 
tasks which allow users to track their progress. Projects can also be shared with 
several memebers, allowing for collaborative project management across teams.

Sling is built on an underlying microservices architecture. 
For technical speficiations, see the [Built With](#built-with) section.

## Getting Started

These instructions will get you a copy of the project up and running on your 
local machine for development and testing purposes.

### Prerequisites

In order to get started with Sling there are a few required dependencies, these include:

```
Apache Maven 3.6.0+
Java 11+
Docker 18.0+
Docker-Compose 1.23+
```

### Installing

Maven is the build tool of choice for this project and is used to build the backend. 
To build and install the project run the following command:

```
mvn install
```

### Running the Project

After the project has been built using maven, the project can then easily be started 
by using the following command in the root folder of the project:

```
docker-compose up --build
```

## Running the tests

Backend as well as frontend tests are managed using Maven.

You can run unit tests with the following command:

```
mvn test
```

Similarly, integration tests are run using:

```
mvn verify
```

## Built With

As a general overview, the system follows a microservices architecture. All services 
are containerized in order to ensure that the  application runs quickly and reliably 
from one computing environment to another.

The following tools and frameworks are used in this project:

### Front-end

* [React](https://reactjs.org) - Front-end Framework
* [Redux](https://redux.js.org) - Application State Management
* [React-Bootstrap](https://react-bootstrap.github.io) Styled Components

### Back-end

* [Java Spring Suite](https://spring.io) - Backend Services
  * [Netflix Zuul](https://github.com/Netflix/zuul) - API Gateway
  * [Netflix Eureka](https://github.com/Netflix/eureka) - Service Discovery
  * [Spring Security](https://spring.io/projects/spring-security) - Authentication & Authorization
  * [Spring Data](https://spring.io/projects/spring-data) - Database Access
* [Maven](https://maven.apache.org/) - Dependency Management & Build Tool

### Data Storage

* [MongoDB](https://www.mongodb.com) - Data Storage
  * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Hosted Databases

### Additional Tools and Frameworks

* [Docker](https://www.docker.com) - Service Containerization
* [Docker-Compose](https://docs.docker.com/compose/) - Running Multi-Container Docker Applications

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Authors

* **Erik Andersson** - *erian599@student.liu.se*
* **Elin Larsson** - *elila927@student.liu.se*

## License

This project is currently not under any license

## Acknowledgments

* A big thanks to all TDDD27 course assistants!
