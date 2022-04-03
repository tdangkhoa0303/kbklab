example of using tool to CREATE new instance of lab: 
<br> sudo python3 instance.py --start --student-code=se140781 --lab-location=/vulnweb/ssti
<br> student-code: mssv
<br> lab-location: folder contains docker-compose.yml
<br> DELETE instance:
<br> sudo python3 instance.py --stop --student-code=se140781
<br> currently only create instance will return a string as url with format {host}:{port}
<br> the use of 'sudo' will be configured later, dont worry