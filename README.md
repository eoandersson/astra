# Sling Project Management

**Sling** is a project management tool where users can define projects as well as 
tasks which allow users to track their progress. Projects can also be shared with 
several memebers, allowing for collaborative project management across teams.

Sling is built on an underlying microservices architecture. 
For technical speficiations, see the [Built With](#built-with) section.

## Getting Started

Lorem ipsum.

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

* [React]() - Front-end Framework
* [Redux]() - Application State Management
* [React-Bootstrap]() Styled Components

### Back-end

* [Java Spring Suite]() - Backend Services
  * [Netflix Zuul]() - API Gateway
  * [Netflix Eureka]() - Service Discovery
  * [Spring Security]() - Authentication & Authorization
  * [Spring Data]() - Database Access
* [Maven](https://maven.apache.org/) - Dependency Management & Build Tool

### Data Storage

* [MongoDB]() - Data Storage
  * [MongoDB Atlas]() - Hosted Databases

### Additional Tools and Frameworks

* [Docker]() - Service Containerization
* [Docker-Compose]() - Running Multi-Container Docker Applications

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Authors

* **Erik Andersson** - *erian599@student.liu.se*
* **Elin Larsson** - *elila927@student.liu.se*

## License

This project is currently not under any license

## Acknowledgments

* A big thanks to all TDDD27 course assistants!
