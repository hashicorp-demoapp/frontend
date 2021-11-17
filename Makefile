VERSION=v0.0.7
REPOSITORY=hashicorpdemoapp/frontend

build_docker:
	docker build -t ${REPOSITORY}:${VERSION} .