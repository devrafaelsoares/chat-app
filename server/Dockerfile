FROM gradle:8.5-jdk21 as gradle

WORKDIR /app/chatapplication-app

COPY . .

RUN gradle bootJar

FROM openjdk:21

COPY --from=gradle /app/chatapplication-app/build/libs/*.jar chatapplication.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "chatapplication.jar"]