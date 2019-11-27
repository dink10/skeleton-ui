FROM node:12.13.1-alpine3.9 as builder
ENV GOOGLE_CLIENT_ID=__GOOGLE_CLIENT_ID__
COPY . /ui
WORKDIR /ui
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
