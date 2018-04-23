docker run -d --rm -p 4200:4200 -p 3000:3000 --name jademo -w="/usr/src/app" -t gcsekar/nlp-demo:06.00 /bin/bash -c "forever start /usr/src/server/bin/www && ng serve --host 0.0.0.0"
