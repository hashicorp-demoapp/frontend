VERSION=v0.0.6
REPOSITORY=hashicorpdemoapp/frontend

build_docker:
	docker build -t ${REPOSITORY}:${VERSION} .