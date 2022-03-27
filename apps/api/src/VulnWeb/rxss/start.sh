echo "dash dash/sh boolean false" | debconf-set-selections
dpkg-reconfigure -f noninteractive dash
pm2-runtime start npm -- start
