# HashiCups Frontend

React UI that interacts with GraphQL `public-api`.

[![CircleCI](https://circleci.com/gh/hashicorp-demoapp/frontend.svg?style=svg)](https://circleci.com/gh/hashicorp-demoapp/frontend)  

Docker Image: [https://hub.docker.com/repository/docker/hashicorpdemoapp/frontend](https://hub.docker.com/repository/docker/hashicorpdemoapp/frontend)

Docker Image: [https://hub.docker.com/repository/docker/hashicorpdemoapp/frontend-nginx](https://hub.docker.com/repository/docker/hashicorpdemoapp/frontend-nginx)

# Running

The frontend proxies requests to the graphQL backend at the path /api. When running locally ensure your `public-api` is running at `http://localhost:8080` or change package.json before running `yarn start`.

To run the application using the Docker container you need to add nginx configuration like the following example and mount it at `/etc/nginx/conf.d/default.conf`. Set the backend proxy_add for the api to the location of your server.

For the frontend only image:

```
docker run -it -p 3000:3000 hashicorpdemoapp/frontend:v1.0.6
```

For the frontend (with nginx) image:

```
docker run -it -p 80:80 -v $PWD/nginx.conf:/etc/nginx/conf.d/default.conf --env NEXT_PUBLIC_FOOTER_FLAG=test123 hashicorpdemoapp/frontend-nginx
```

# Creating a new release
The build pipeline is setup with Circle CI to build and create a new Docker image whenever a new tag is pushed to this repo. To create a new release execute the following commands:

```shell
# Use sem var for tags, i.e. v0.0.1
git tag [tag]
git push origin [tag]
```
