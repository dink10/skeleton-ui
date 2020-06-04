#!/bin/sh

cp /dist/nginx.conf /etc/nginx/conf.d/default.conf
sed -i "s,__API_URL__,${API_URL},g" /etc/nginx/conf.d/default.conf
sed -i "s,__STATS_URL__,${STATS_URL},g" /etc/nginx/conf.d/default.conf

sed "s,__GOOGLE_LOGIN_CLIENT_ID__,${GOOGLE_LOGIN_CLIENT_ID},g" /dist/index.html > /dist/index-temp.html
mv /dist/index-temp.html /dist/index.html

exec nginx -g "daemon off;"
