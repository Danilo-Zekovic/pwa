# pwa
Trying to make it from scratch

I was thinking of modifying existing templates for react app, but after some thinking
 I decided to make my own structure and that way understand better how everything works.
 If this experiment is successuful I will set some time a side and write a detailed tutorial
 how to build PWAs.

## Running the app
To run webpack dev server:   
  npm test

To create a bundle:   
  npm run build

To run server after bundle is made:   
  npm start


## Forever
 usage: forever [start | stop | stopall | list] [options] SCRIPT [script options]    

options:   
  start     -->  start SCRIPT as a daemon    
  stop      -->  stop the daemon SCRIPT    
  stopall   -->  stop all running forever scripts    
  list      -->  list all running forever scripts  


## MongoDB
sudo systemctl start mongod    
sudo systemctl stop mongod      
sudo systemctl reload mongod     
sudo systemctl restart mongod      

# Setting Up The Project And Running It From Scratch    
### Instructions tested on CentOS    

## Digital Ocean    
1. Create a CentOS droplet on Digital Ocean     
2. Setup a user and password    
3.    


## Dependencies    
1. Node, follow instructions at https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server
2. nvm, install the latest node 7 and hier https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

3. git https://www.digitalocean.com/community/tutorials/how-to-install-git-on-centos-7
4. web-push, sudo npm install -g web-push
5.

## Getting the Project
1. git clone https://github.com/Danilo-Zekovic/pwa    
2. cd pwa
3. npm install    

## Install Cerbot
0. Instructions can be found https://certbot.eff.org/#centosrhel7-other    
1. yum -y install yum-utils
2. yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
3. sudo yum install certbot

## Domain
1. Link a domain name to the IP of the server (domain-name)

## Get and Imbed SSL Certificats
0. instructions found https://certbot.eff.org/#centosrhel7-other, below is commnd you are looking for
1. certbot certonly --standalone -d www.example.com
2. Certificats are placed in /etc/letsencrypt/live/www.example.com/fullchain.pem
2. /etc/letsencrypt/live/lkjhgfdsa.danilozekovic.com/privkey.pem
3. In file ./server.js replace privateKey path with path to privkey.pem
3. and certificate path with path to fullchain.pem

## Get and Imbed VAPID Keys
1. create keys: web-push generate-vapid-keys
2. copy the key values
3. In file routes.js replace publicKey and privateKey with generated values
4. Also, change the email to match email that you hae access to
5. replace applicationServerPublicKey in ./public/scripts/push.js with the value of the publicKey

## Forever
1. sudo npm install forever -g
2. sudo forever start index.js
3. in the browser open https://your.domain.name

# Develope your own PWA and change the World
