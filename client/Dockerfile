FROM node:20.11.0-alpine as build

WORKDIR /app/chatapplication-ui

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/chatapplication-ui/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]