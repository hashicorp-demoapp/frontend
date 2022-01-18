# frontend
React UI that interacts with GraphQL public api

[![CircleCI](https://circleci.com/gh/hashicorp-demoapp/frontend.svg?style=svg)](https://circleci.com/gh/hashicorp-demoapp/frontend)  

Docker Image: [https://hub.docker.com/repository/docker/hashicorpdemoapp/frontend](https://hub.docker.com/repository/docker/hashicorpdemoapp/frontend)

# Running
The frontend proxies requests to the graphQL backend at the path /api. When running locally ensure your `public-api` is running at `http://localhost:8080` or change package.json before running `yarn start`.

To run the application using the Docker container you need to add nginx configuration like the following example and mount it at `/etc/nginx/conf.d/default.conf`. Set the backend proxy_add for the api to the location of your server.

```
# /etc/nginx/conf.d/default.conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    # Proxy pass the api location to save CORS 
    location /api {
        proxy_pass http://127.0.0.1:18080;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

```
docker run -it -p 8080:80 -v $PWD/nginx.conf:/etc/nginx/conf.d/default.conf hasicorpdemoapp/frontend:v0.0.1
```

# Static version
The frontend can also be run as a static version. This is useful for testing the frontend without the backend. In this mode the graphQL backend has been replaced with
a static json file `mockdata.json`, served from the Nginx server.

You can build the static version using the following command:

```
make build_docker_static
```

Versions of the static frontend can also be found in the DockerHub repository at `hashicorpdemoapp/frontend:${SEMVER}.static`

```
docker run -it -p 80:80 hashicorpdemoapp/frontend:v0.0.8.static
```

# Creating a new release
The build pipeline is setup with Circle CI to build and create a new Docker image whenever a new tag is pushed to this repo. To create a new release execute the following commands:

```shell
# Use sem var for tags, i.e. v0.0.1
git tag [tag]
git push origin [tag]
```
