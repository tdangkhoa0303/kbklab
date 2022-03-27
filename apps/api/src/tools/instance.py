import docker
import subprocess
import time
import sys
import getopt
import os


client = docker.from_env()
# phase 2: e
# add more checking conditions
# add logging
# clear function


def get_instance_url(student_id):
    ret = ''
    containers = client.containers.list()
    for container in containers:
        if str(container.name).startswith(student_id+'_app'):
            id = container.id[:12]
            socket_info = list(
                container.attrs['NetworkSettings']['Ports'].values())[0][0]
            host = socket_info['HostIp']
            port = socket_info['HostPort']

#             nginx_file = f"""server {{
#   listen 80;
#   server_name {id}.kbklab.tech;
#   location / {{
#     proxy_pass http://{host}:{port};
#     proxy_http_version 1.1;
#     proxy_set_header Upgrade $http_upgrade;
#     proxy_set_header Connection 'upgrade';
#     proxy_set_header Host $host;
#     proxy_cache_bypass $http_upgrade;
#    }}
# }}"""

            new_nginx_file = f"""server{{
server_name {id}.kbklab.tech;
listen 443 ssl;
ssl_certificate /etc/letsencrypt/live/kbklab.tech/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/kbklab.tech/privkey.pem;
location / {{
    proxy_pass http://{host}:{port};
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}}
            }}"""
            file = open(f"/etc/nginx/sites-enabled/{id}.kbklab.tech", 'w')
            file.write(new_nginx_file)
            file.close()
            os.system('systemctl reload nginx')
            return f"{id} {id}.kbklab.tech"


def start_lab(student_id, lab_location):
    subprocess.Popen(
        f'docker-compose -f /app/kbklab-be/src/{lab_location}/docker-compose.yaml --project-name {student_id} up >> /dev/null 2>&1', shell=True)
    # time.sleep(10)


def stop_lab(student_id):
    global client
    containers = client.containers.list(all=True)
    for container in containers:
        if str(container.name).startswith(student_id):
            id = container.id[:12]
            # fucking treat of me
            try:
                container.kill()
            except Exception as e:
                pass
            try:
                container.remove(v=True)
            except Exception as e:
                pass
            try:
                os.system('systemctl reload nginx')
            except Exception as e:
                pass
    client.volumes.prune()

# testing script, uncomment it and comment main funtion to test
# start_lab(student_id='se140781',lab_location='/home/mk7120/ctf/DBS401')
# print(get_instance_url('se140781'))
# stop_lab('se140781')


def main():
    if not len(sys.argv[1:]):
        print('more options')
        return
    try:
        lst = sys.argv[1:]
        opts, args = getopt.getopt(
            lst, '', ['start', 'stop', 'student-code=', 'lab-location=', 'get-url'])
    except getopt.GetoptError as e:
        print(e)
    student_code = ''
    lab_location = ''
    command = ''
    try:
        for o, a in opts:
            if o in ('--start'):
                command = 'start'
            elif o in ('--stop'):
                command = 'stop'
            elif o in ('--get-url'):
                command = 'get-url'
            elif o in ('--student-code'):
                student_code = a
            elif o in ('--lab-location'):
                lab_location = a
    except Exception as e:
        print(e)
    # print(f'{command} {student_code} {lab_location}')

    if command == 'start':
        start_lab(student_id=student_code, lab_location=lab_location)

    if command == "get-url":
        ret = get_instance_url(student_code)
        print(ret)
        # print('846aa9bb05ac 0.0.0.0:12345')

    elif command == 'stop':
        stop_lab(student_id=student_code)


if __name__ == '__main__':
    main()