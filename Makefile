VERSION=v1.0.1
REPOSITORY=hashicorpdemoapp/frontend

build_docker:
	docker build -t ${REPOSITORY}:${VERSION} .