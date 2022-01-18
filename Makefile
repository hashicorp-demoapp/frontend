VERSION=v0.0.8
REPOSITORY=hashicorpdemoapp/frontend

setup_build_x:
	docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
	docker buildx create --name multi || true
	docker buildx use multi
	docker buildx inspect --bootstrap

build_docker: setup_build_x
	docker buildx build --platform linux/amd64,linux/arm64 \
              -t ${REPOSITORY}:${VERSION} \
              --push \
              -f Dockerfile \
              .
	docker buildx rm multi

build_docker_static: setup_build_x
	docker buildx build --platform linux/amd64,linux/arm64 \
              -t ${REPOSITORY}:${VERSION}.static \
              --push \
              -f Dockerfile-static \
              .
	docker buildx rm multi