echo "dash dash/sh boolean false" | debconf-set-selections
dpkg-reconfigure -f noninteractive dash
cd /app/app_1 
pm2 start npm --name "proxy" -- start
cd /app/app_2
pm2-runtime start npm --name "hidden" -- start