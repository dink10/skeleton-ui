#!/bin/sh

sed "s,__API_URL__,${API_URL},g" /dist/nginx.conf > /etc/nginx/conf.d/default.conf
sed "s,__GOOGLE_CLIENT_ID__,${GOOGLE_CLIENT_ID},g" /dist/index.html > /dist/index-temp.html
mv /dist/index-temp.html /dist/index.html

exec nginx -g "daemon off;"
