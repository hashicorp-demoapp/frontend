VERSION=v0.0.1
REPOSITORY=hasicorpdemoapp/frontend

build_docker:
	docker build -t ${REPOSITORY}:${VERSION} .