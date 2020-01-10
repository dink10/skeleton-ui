FROM node:12.13.1-alpine3.9 as builder
ENV GOOGLE_CLIENT_ID=__GOOGLE_CLIENT_ID__

COPY . /ui
WORKDIR /ui
RUN apk update && apk add openssh
RUN apk add git
RUN mkdir /root/.ssh/
COPY id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts && \
    ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts
RUN npm install && \
    npm run build

FROM nginx:1.15.6-alpine
COPY ./nginx.conf /dist/nginx.conf
COPY ./run.sh /run.sh
COPY --from=builder /ui/dist /dist
RUN chmod +x /run.sh
WORKDIR /dist
EXPOSE 80
ENV API_URL=__API_URL__
CMD [ "/run.sh" ]
