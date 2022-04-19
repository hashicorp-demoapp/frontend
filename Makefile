VERSION=v1.0.4
REPOSITORY=hashicorpdemoapp/frontend

build_docker:
	docker build -t ${REPOSITORY}:${VERSION} .