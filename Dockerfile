FROM nginx

COPY ./build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf