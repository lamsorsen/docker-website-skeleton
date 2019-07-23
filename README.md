# docker-website-skeleton
Forkable website created with Docker, Flask, React (create-react-app), and Nginx.
# Creating a website from scratch
In order to create a website from scratch you need to 1. aquire a **host**, 2. run a **web application** on that host, and 3. get a **domain name** that directs to your host. 
There are many different ways to stand up websites and most of them handle one or all of those three steps for you. 
Through the steps listed below I outline a way to do all those steps yourself as painlessly as possible.
This way you will have almost total control over your website.

We'll use DigitalOcean for hosting, this project (docker-website-skeleton) as a basis for the web app, and namecheap for the domain name. Hosting and Domain names aren't free so have a credit card handy. However, this doesn't need to be expensive. Our shopping list will cost ~$10 all told.

## Local Preparations
These instructions are Windows-specific. If you're on Linux or Mac then you will do things slightly differently.
1. Install [git bash](https://gitforwindows.org/). Make sure you can open a git bash window.
![image](https://user-images.githubusercontent.com/33299806/61739060-4f8b5b80-ad51-11e9-80eb-468db3b6f7cb.png)
1. Try `cat ~/.ssh/id_rsa.pub`. If you get a result, move on to the next section.
1. If you did not get a result, run `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"` and repeatedly press enter,
accepting the defaults. Do not enter a password, just press enter.
1. Now try `cat ~/.ssh/id_rsa.pub` again. You should have a result.
![image](https://user-images.githubusercontent.com/33299806/61740339-0557a980-ad54-11e9-87d2-882ca331e28e.png)

## Buying a Host
You can host a website on any computer, but generally you don't want your website to go down every time you turn off your machine.
Generally, it's going to be better to rent a host (usually a virtual machine) from a hosting service. I like DigitalOcean
for this, as you can buy a suitable host for them for $5 a month. Besides, having this little machine will be a great place
to test any apps you create.
1. Go to [DigitalOcean's website](https://www.digitalocean.com/) and start creating your account.
1. Once you get to the page where you provide your project details, be sure that you select "Docker" under the "tools and technologies that you plan to use on DigitalOcean." Other than that, everything is up to you.
![image](https://user-images.githubusercontent.com/33299806/61738754-9dec2a80-ad50-11e9-841d-e025393ab535.png)
1. Soon you will find yourself on your project's DigitalOcean page. Under "Create a Droplet" click the Docker one. You have to hover over the Docker icon to see it.
![image](https://user-images.githubusercontent.com/33299806/61740909-5fa53a00-ad55-11e9-826c-3ac20a9ef500.png)
![image](https://user-images.githubusercontent.com/33299806/61740944-6df35600-ad55-11e9-8bb9-7bdef4ce18eb.png)
1. You're now creating your Droplet (aka "host" aka "node") that will host your website. DigitalOcean makes this
really easy. Under "Choose an image" make sure that Docker is selected. 
![image](https://user-images.githubusercontent.com/33299806/61741047-ac891080-ad55-11e9-9ba9-5ee1ba56245f.png)
1. Scroll down to "Choose a plan". Wow, $40/month is expensive. Click the left arrow to find the $5/month option and select that instead!
![image](https://user-images.githubusercontent.com/33299806/61741166-e4905380-ad55-11e9-9cdd-71c5001f5401.png)
![image](https://user-images.githubusercontent.com/33299806/61741178-ed812500-ad55-11e9-8746-314c16e0ccc2.png)
1. Scroll down to "Choose a datacenter region". Choose a datacenter in or nearby your country.
![image](https://user-images.githubusercontent.com/33299806/61741246-0f7aa780-ad56-11e9-991c-186bf1c604dc.png)
1. Scroll down to "Authentication". Choose "SSH keys" and then click the "New SSH Key" button. Copy-paste the contents
of your `~/.ssh/id_rsa.pub` on your local machine, then click "Add SSH Key". Like this:
![image](https://user-images.githubusercontent.com/33299806/61741389-5ff20500-ad56-11e9-8c7e-cab8e68db47d.png)
1. Scroll down to "Finalize and create". Change the hostname to something a little more human readable (I called mine
"tinydockernode01").
![image](https://user-images.githubusercontent.com/33299806/61741520-b8290700-ad56-11e9-92d9-ea9617daf2b7.png)
1. Click "Create Droplet" at the bottom to finish. You should see a progress bar as your node spins up, then an IP address
when it is complete! Make a note of that IP address.
![image](https://user-images.githubusercontent.com/33299806/61741609-e3135b00-ad56-11e9-9247-765a08bc90c5.png)
![image](https://user-images.githubusercontent.com/33299806/61741618-e9093c00-ad56-11e9-9b44-64dd0de8e00f.png)

Congratulations, you are now the proud owner of a little linux node!
## Setting Up Your Host
Now that you have a linux node, let's start doing things on it!
1. Copy the IP address from your Droplet on DigitalOcean and ssh to it as root. My IP was 159.203.66.137 so I'll run `ssh root@159.203.66.137`. The first time you do this you'll need to type "yes" to say you trust your host.
![image](https://user-images.githubusercontent.com/33299806/61742028-d6dbcd80-ad57-11e9-8062-5ef24a52b308.png)
If all goes well your node should greet you like this:
![image](https://user-images.githubusercontent.com/33299806/61742075-e9ee9d80-ad57-11e9-93ab-4a5e3ccad518.png)
1. Let's go ahead and [start docker swarm on our node](https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/).
Run `docker swarm init --advertise-addr XXX.XXX.XXX.XXX` where `XXX.XXX.XXX.XXX` is the IP address you used to connect to this node.
![image](https://user-images.githubusercontent.com/33299806/61742297-6a150300-ad58-11e9-812a-fc8a5e525abb.png)
1. It'll also be nice to have a docker registry running on your swarm. You can do that by running `docker service create --name registry --publish published=5000,target=5000 registry:2`
![image](https://user-images.githubusercontent.com/33299806/61742369-93ce2a00-ad58-11e9-8a4a-bba6f6f7f58e.png)
1. Let's also set up authentication to github. Run `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"` and repeatedly press enter. Then `cat ~/.ssh/id_rsa.pub` and copy that result into a [new ssh key on github](https://github.com/settings/keys). This way you can push and pull from github freely while on your droplet!

There quite a few other little quality-of-life things to do on your linux node, but I'll leave those for a different guide.

## Running a Dev Instance Of Your Website
1. [Create a fork of docker-website-skeleton (this repo) on github](https://help.github.com/en/articles/fork-a-repo).
1. On your fork, copy the ssh clone uri.             
![image](https://user-images.githubusercontent.com/33299806/61742668-40a8a700-ad59-11e9-8424-23e579f3df07.png)
1. Clone your fork onto your node using that uri:
![image](https://user-images.githubusercontent.com/33299806/61743071-199ea500-ad5a-11e9-8b89-31b9e5752c30.png)
1. `cd` into your repo.
1. `docker-compose up --build`. This could take a while the first time, but on subsequent runs it should be decently fast.
1. Visit your website at `IP:3000` in your web browser. So for me I went to 159.203.66.137:3000.
![image](https://user-images.githubusercontent.com/33299806/61743746-85354200-ad5b-11e9-9eac-e2b8753d345a.png)
1. Make any changes you wish to the frontend or API and see the changes reflected live. The only time you should need to rebuild is when you add new dependencies or change Docker or docker-compose configuration.

## Deploying A Stable Instance Of Your Website
Your dev instance from the previous section is nice but to create an "official" instance of your
project follow these steps. This instance will run in the background, will run on port 80, and will stay up indefinitely. 
These commands are based on https://docs.docker.com/engine/swarm/stack-deploy/
1. `WEBSITE_VERSION=1.0.0 docker-compose -f docker-compose.prod.yml build`
1. `WEBSITE_VERSION=1.0.0 docker-compose -f docker-compose.prod.yml push`
1. `WEBSITE_VERSION=1.0.0 docker stack deploy -c docker-compose.prod.yml my-website`
1. Watch your website get replicated by typing `docker service ls`.
![image](https://user-images.githubusercontent.com/33299806/61744927-0b528800-ad5e-11e9-8e0d-aea9be05ebbf.png)
1. Visit your website by just typing your IP into your browser. Your browser connects to port 80 by default!
![image](https://user-images.githubusercontent.com/33299806/61744301-96328300-ad5c-11e9-9d30-aceb015af238.png)

Whenever you want to update the "production" version of your website you can run the above commands again but with a new WEBSITE_VERSION.

When you fix a bug, increment the third number in the WEBSITE_VERSION (so 1.0.0 would become 1.0.1). 
When you add new features increment the second number and zero out the last number (so 1.0.1 would become 1.1.0). 
When you make a major overhaul increment the first number and zero out the other two (so 1.1.0 would become 2.0.0).

## Getting a Domain Name
You don't want to have to reach your website at an IP all the time. Here's how you can get a domain name and attach
it to your droplet.
TODO
