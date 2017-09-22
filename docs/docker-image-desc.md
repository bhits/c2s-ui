# Short Description
The Consent2Share User Interface (c2s-ui) is a generic user interface component of the Consent2share (C2S) application. Patients can use this application to manage his or her electronic consents and providers.

# Full Description

# Supported Source Code Tags and Current `Dockerfile` Link

[`0.6.0(latest)`](https://github.com/bhits-dev/c2s-ui/releases/tag/0.6.0),[`0.5.0`](https://github.com/bhits-dev/c2s-ui/releases/tag/0.5.0), [`0.4.0`](https://github.com/bhits-dev/c2s-ui/releases/tag/0.4.0),[`0.3.0`](https://github.com/bhits-dev/c2s-ui/releases/tag/0.3.0), [`0.1.0`](https://github.com/bhits-dev/c2s-ui/releases/tag/0.1.0)

[`Current Dockerfile`](../server/src/main/docker/Dockerfile)

For more information about this image, the source code, and its history, please see the [GitHub repository](https://github.com/bhits-dev/c2s-ui).

# What is Consent2Share UI?

The Consent2Share User Interface (c2s-ui) is a generic user interface component of the Consent2share (C2S)application. Patients can use this application to manage his or her electronic consents and providers.

For more information and related downloads for Consent2Share, please visit [Consent2Share](https://bhits-dev.github.io/consent2share/).

# How to use this image

## Start a c2s-ui instance

Be sure to familiarize yourself with the repository's [README.md](https://github.com/bhitsdev/c2s-ui) file before starting the instance.

`docker run  --name c2s-ui -d bhitsdev/c2s-ui:latest <additional program arguments>`

*NOTE: In order for this API to fully function as a microservice in the Consent2Share application, it is required to setup the dependency microservices and the support level infrastructure. Please refer to the Consent2Share Deployment Guide in the corresponding Consent2Share release (see [Consent2Share Releases Page](https://github.com/bhits-dev/consent2share/releases)) for instructions to setup the Consent2Share infrastructure.*

## Configure

The Spring profiles `application-default` and `docker` are activated by default when building images.

This API can run with the default configuration which is from three places: `bootstrap.yml`, `application.yml`, and the data which the [`Configuration Server`](https://github.com/bhits-dev/config-server) reads from the `Configuration Data Git Repository`. Both `bootstrap.yml` and `application.yml` files are located in the class path of the running application.

We **recommend** overriding the configuration as needed in the `Configuration Data Git Repository`, which is used by the `Configuration Server`.

Also, [Spring Boot](https://projects.spring.io/spring-boot/) supports other ways to override the default configuration to configure the API for a certain deployment environment. 

The following is an example to override the default configuration:

`docker run -d bhitsdev/c2s-ui:latest --c2s.c2s-ui.oauth2.client.secret=strongpassword`

## Environment Variables

When you start the Consent2Share UI image, you can edit the configuration of the Consent2Share UI instance by passing one or more environment variables on the command line. 

### JAR_FILE
This environment variable is used to setup which jar file will run. you need mount the jar file to the root of container.

`docker run --name c2s-ui -e JAR_FILE="c2s-ui-latest.jar" -v "/path/on/dockerhost/c2s-ui-latest.jar:/c2s-ui-latest.jar" -d bhitsdev/c2s-ui:latest`

### JAVA_OPTS 
This environment variable is used to setup JVM argument, such as memory configuration.

`docker run --name c2s-ui -e "JAVA_OPTS=-Xms512m -Xmx700m -Xss1m" -d bhitsdev/c2s-ui:latest`

### DEFAULT_PROGRAM_ARGS 

This environment variable is used to setup an application argument. The default value of is "--spring.profiles.active=application-default, docker".

`docker run --name c2s-ui -e DEFAULT_PROGRAM_ARGS="--spring.profiles.active=application-default,ssl,docker" -d bhitsdev/c2s-ui:latest`

# Supported Docker versions
This image is officially supported on Docker version 1.12.1.

Support for older versions (down to 1.6) is provided on a best-effort basis.

Please see the [Docker installation documentation](https://docs.docker.com/engine/installation/) for details on how to upgrade your Docker daemon.

# License
View [license](https://github.com/bhits-dev/c2s-ui/blob/master/LICENSE) information for the software contained in this image.

# User Feedback

## Documentation 
Documentation for this image is stored in the [bhitsdev/c2s-ui](https://github.com/bhits-dev/c2s-ui) GitHub repository. Be sure to familiarize yourself with the repository's README.md file before attempting a pull request.

## Internationalization (i18n)

Consent2Share provide support for Internationalization (i18n) in English and Spanish. English is the default language and is fully supported but 
for Spanish, the translation still need to be completed.

## Issues

If you have any problems with or questions about this image, please contact us through a [GitHub issue](https://github.com/bhits-dev/c2s-ui/issues).