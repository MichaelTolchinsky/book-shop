FROM node:18-alpine3.20 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /app/dist/meanBookShop /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]