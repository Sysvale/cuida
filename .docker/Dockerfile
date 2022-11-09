FROM node:16.18.1-alpine3.16

COPY bin/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN mkdir -p /usr/src/app \
  && apk update \
  && apk add --no-cache bash==5.1.16-r2 \
  && rm -rf /var/cache/apk/* \
  && rm -rf /tmp/*

WORKDIR /usr/src/app

EXPOSE 6006
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
