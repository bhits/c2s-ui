# Consent2Share User Interface

The Consent2Share User Interface (c2s-ui) is a generic user interface component of Consent2share (C2S). Patients can use this application to manage his or her electronic consents and providers.

## Build

### Prerequisites

+ [Oracle Java JDK 8 with Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
+ [Docker Engine](https://docs.docker.com/engine/installation/) (for building a Docker image from the project)
+ [Node.js](https://nodejs.org/en/) (Optional, *see [Structure](#structure) for details*)
+ [Angular CLI](https://github.com/angular/angular-cli) (Optional, *see [Structure](#structure) for details*)
+ [MD2](https://github.com/Promact/md2) (Optional, *see [Structure](#structure) for details*)

### Structure

There are two main modules in this project:

+ `client`: This folder contains all frontend user interface code, which is written using [Angular](https://angular.io/) v2.4.
+ `server`: This folder contains a [Spring Boot](http://projects.spring.io/spring-boot/) project, which is primarily responsible for packaging and serving the static resources that are built from the `client` module. This is also an [Apache Maven](https://maven.apache.org/) project and utilizes [Frontend Maven Plugin](https://github.com/eirslett/frontend-maven-plugin) to: 
    1. locally install [Node.js](https://nodejs.org/en/) and the `client` module Node.js dependencies; 
    2. Build the `client` module using Node Package Manager [NPM](https://www.npmjs.com/) Node.js package. Finally, it uses [Apache Maven Resources Plugin](https://maven.apache.org/plugins/maven-resources-plugin/) to copy the resources that are built from the `client` module into the `server` module that will be eventually packaged as a build artifact in `jar` format. Therefore, there is no need to install Node.js globally if `server` module is built with Maven.
+ Angular CLI and MD2 are required only during development. It is not required to install them if you're only running the application out of the box.
      
### Commands

This Maven project requires [Apache Maven](https://maven.apache.org/) 3.3.3 or greater to build it. It is recommended to use the *Maven Wrapper* scripts provided with this project. *Maven Wrapper* requires an internet connection to download Maven and project dependencies for the very first build.

To build the project, navigate to the folder that contains `pom.xml` file using the terminal/command line.

+ To build a JAR:
    + For Windows, run `mvnw.cmd clean install`
    + For *nix systems, run `mvnw clean install`
+ To build a Docker Image (this will create an image with `bhits/pp-ui:latest` tag):
    + For Windows, run `mvnw.cmd clean package docker:build`
    + For *nix systems, run `mvnw clean package docker:build`

Note: Frontend developers can build `client` and `server` modules separately and save build time by using Angular CLI. This option requires [Angular CLI](http://gruntjs.com/) to be installed globally.
 **TOMSON Start**
1. Build the `client` module: *run `npm install` in the client folder*
2. Manually repackage the `jar` file from the `server` module 
**TOMSON End**
## Run

### Commands

This is a [Spring Boot](https://projects.spring.io/spring-boot/) project and serves the project via an embedded Tomcat instance. Therefore there is no need for a separate application server to run it.

+ Run as a JAR file: `java -jar c2s-ui-x.x.x-SNAPSHOT.jar <additional program arguments>`
+ Run as a Docker Container: `docker run -d bhits/c2s-ui:latest <additional program arguments>`

*NOTE: In order for this project to fully function as a microservice in the Consent2Share application, it is required to setup the dependency microservices and the support level infrastructure. Please refer to the Consent2Share Deployment Guide in the corresponding Consent2Share release (see [Consent2Share Releases Page](https://github.com/bhits/consent2share/releases)) for instructions to setup the Consent2Share infrastructure.*

## Debug TypeScript

[TypeScript](https://www.typescriptlang.org/index.html) is used to write code in Angular 2. The default build task in the `client` module only generates JavaScript files without source maps when transpiling TypeScript. 

In order to debug TypeScript, we need source maps to be generated as well:
 **TOMSON Start**
1. Run Grunt build debug task in the `client` module to generate source maps along with transpiled JavaScript: *run `grunt build:debug` in the client folder*
2. Run the application and use browser development tools to set breakpoints in related TypeScript files to start debugging.
 **TOMSON End**
*NOTE: The [source maps](https://code.tutsplus.com/tutorials/source-maps-101--net-29173) file is also generated when TypeScript translate into JavaScript, it sets correspondence between lines in the TypeScript code and in the generated JavaScript code.*

## Configure

The `server` module runs with some default configuration that is primarily targeted for development environment. It utilizes [`Configuration Server`](https://github.com/bhits/config-server) which is based on [Spring Cloud Config](https://github.com/spring-cloud/spring-cloud-config) to manage externalized configuration, which is stored in a `Configuration Data Git Repository`. We provide a [`Default Configuration Data Git Repository`]( https://github.com/bhits/c2s-config-data).

This API can run with the default configuration, which is targeted for a local development environment. Default configuration data is from three places: `bootstrap.yml`, `application.yml`, and the data which `Configuration Server` reads from `Configuration Data Git Repository`. Both `bootstrap.yml` and `application.yml` files are located in the `resources` folder of this source code.

We **recommend** overriding the configuration as needed in the `Configuration Data Git Repository`, which is used by the `Configuration Server`.

Also, please refer to [Spring Cloud Config Documentation](https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html) to see how the config server works, [Spring Boot Externalized Configuration](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) documentation to see how Spring Boot applies the order to load the properties, and [Spring Boot Common Properties](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html) documentation to see the common properties used by Spring Boot.

### Other Ways to Override Configuration

### Override a Configuration Using Program Arguments While Running as a JAR:

+ `java -jar c2s-ui-x.x.x-SNAPSHOT.jar --c2s.c2s-ui.oauth2.client.secret=strongpassword`

*NOTE: The `oauth2.client.client-id` and `oauth2.client.secret` value are used for [User Account and Authentication (UAA) Password Grant type](http://docs.cloudfoundry.org/api/uaa/#password-grant). The configuration uses the format `client_id:client_secret` to be Base 64 encoded. The `client_id` refers to the OAuth2 Client ID assigned to the Consent2Share UI by [UAA](https://docs.cloudfoundry.org/concepts/architecture/uaa.html). C2S uses `c2s-ui` as the default `client_id` for this application.*

### Override a Configuration Using Program Arguments While Running as a Docker Container:

+ `docker run -d bhits/c2s-ui:latest --c2s.c2s-ui.oauth2.client.secret=strongpassword`

+ In a `docker-compose.yml`, this can be provided as:
```yml
version: '2'
services:
...
  c2s-ui.c2s.com:
    image: "bhits/c2s-ui:latest"
    command: ["--c2s.c2s-ui.oauth2.client.secret=strongpassword"]
...
```

*NOTE:*
**TOMSON Start**
+ Please note that these additional arguments will be appended to the default `ENTRYPOINT` specified in the `Dockerfile` unless the `ENTRYPOINT` is overridden.
+ The Consent2Share UI uses [HTML5 mode](https://docs.angularjs.org/guide/$location#html5-mode) for the URL format in the browser address bar and it also uses `/fe` as the base for all Angular routes. Therefore, the `server` component forwards all paths that starts with `/fe` to root.
In the `PPUIApplication.java`:

```java

...
  @RequestMapping(value = "/fe/**")
      public String redirect() {
          return "forward:/";
      }
...
```
**TOMSON End**
### Enable SSL

For simplicity in development and testing environments, SSL is **NOT** enabled by default configuration. SSL can easily be enabled following the examples below:

#### Enable SSL While Running as a JAR

+ `java -jar c2s-ui-x.x.x-SNAPSHOT.jar --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`

#### Enable SSL While Running as a Docker Container

+ `docker run -d -v "/path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore" bhits/c2s-ui:latest --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`
+ In the `docker-compose.yml`, this can be provided as:
```yml
...
  c2s-ui.c2s.com:
    image: "bhits/c2s-ui:latest"
    command: ["--spring.profiles.active=ssl","--server.ssl.key-store=/path/to/ssl_keystore.keystore", "--server.ssl.key-store-password=strongkeystorepassword"]
    volumes:
      - /path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore
...
```

*NOTE: As seen in the examples above, `/path/to/ssl_keystore.keystore` is made available to the container via a volume mounted from the Docker host running this container.*

### Override Java CA Certificates Store In Docker Environment

Java has a default CA Certificates Store that allows it to trust well-known certificate authorities. For development and testing purposes, one might want to trust additional self-signed certificates. In order to override the default Java CA Certificates Store in Docker container, one can mount a custom `cacerts` file over the default one in the Docker image as follows: `docker run -d -v "/path/on/dockerhost/to/custom/cacerts:/etc/ssl/certs/java/cacerts" bhits/c2s-ui:latest`

*NOTE: The `cacerts` references given regarding volume mapping above are files, not directories.*

[//]: # (## API Documentation)

[//]: # (## Notes)

[//]: # (## Contribute)

## Contact
If you have any questions, comments, or concerns please see [Consent2Share](https://bhits.github.io/consent2share/) project site.

## Report Issues
Please use [GitHub Issues](https://github.com/bhits/c2s-ui/issues) page to report issues.

[//]: # (License)
