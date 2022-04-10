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


def get_instance_url(student_id,image):
    ret = ''
    app = ''
    for i in image:
        if i.startswith('app'):
            app = i
    containers = client.containers.list()
    for container in containers:
        if str(container.name).startswith(student_id + '_' + app):
            id = container.id[:12]
            socket_info = list(
                container.attrs['NetworkSettings']['Ports'].values())[0][0]
            host = socket_info['HostIp']
            port = socket_info['HostPort']
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
        f'docker-compose -f {lab_location}/docker-compose.yaml --project-name {student_id} up --detach >> /dev/null 2>&1', shell=True)
    # time.sleep(10)


def stop_lab(student_id,image):
    global client
    lst = tuple([student_id + '_' + i for i in image])
    containers = client.containers.list(all=True)
    for container in containers:
        if str(container.name).startswith(lst):
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
                os.system(f'rm -rf /etc/nginx/sites-enabled/{id}.kbklab.tech')
            except Exception as e:
                pass
            try:
                os.system('systemctl reload nginx')
            except Exception as e:
                pass
    client.volumes.prune()
    client.networks.prune()


def main():
    if not len(sys.argv[1:]):
        print('more options')
        return
    try:
        lst = sys.argv[1:]
        opts, args = getopt.getopt(
            lst, '', ['start', 'stop', 'student-code=', 'lab-location=', 'get-url','image='])
    except getopt.GetoptError as e:
        print(e)
    student_code = ''
    lab_location = ''
    command = ''
    image = []
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
            elif o in ('--image'):
                image = a.split(',')
    except Exception as e:
        print(e)
    # print(f'{command} {student_code} {lab_location}')

    if command == 'start':
        start_lab(student_code,lab_location)

    if command == "get-url":
        ret = get_instance_url(student_code,image)
        if ret is None:
            print("'")
        else:
            print(ret)
        # print('846aa9bb05ac 0.0.0.0:12345')

    elif command == 'stop':
        stop_lab(student_id=student_code,image=image)


if __name__ == '__main__':
    main()
