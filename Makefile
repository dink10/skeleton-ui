VERSION=`git describe --abbrev=7 --always --tags`

default: build

build:
	bash -c "VERSION=${VERSION} docker-compose build --no-cache"

push: build
	bash -c "VERSION=${VERSION} docker-compose push"
