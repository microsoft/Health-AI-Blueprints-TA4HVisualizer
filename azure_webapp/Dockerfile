# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package.json /app/
COPY old_package-lock.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
