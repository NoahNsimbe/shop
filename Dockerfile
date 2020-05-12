FROM node:14-alpine AS build
WORKDIR /usr/src/shopApp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.18.0-alpine
COPY --from=build /usr/src/shopApp/dist/shop /usr/share/nginx/html
