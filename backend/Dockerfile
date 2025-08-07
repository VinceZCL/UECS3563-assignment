FROM maven:3.9.6-eclipse-temurin-21 AS backend
WORKDIR /app
COPY . .
EXPOSE 8080
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.fork=false"]