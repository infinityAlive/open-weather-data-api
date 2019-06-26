FROM node:10

ENV PROJECT_NAME=open-weather-data-api
RUN mkdir -p /root/${PROJECT_NAME}/
WORKDIR /root/${PROJECT_NAME}/

COPY ./dist ./app
COPY ./package.json ./package.json
COPY ./.env ./.env
COPY ./run-app.sh ./run-app.sh

RUN chmod 755 ./run-app.sh

EXPOSE 8080
ENTRYPOINT ["./run-app.sh"]