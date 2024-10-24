FROM node:20 AS build

WORKDIR /app

COPY ./React/package.json .

RUN npm install

COPY ./React/ .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]