# Environment Setup

## 1. Ubuntu Machine
After having an ubuntu machine running, you need to install the following packages:
- git
- rvm
- ruby 2.4.0 + 
- rails 5.0.1+
- nodejs 6.x

To install git:
``` sudo apt-get install git ```

Installing rvm (ruby version manager) and ruby (I have scripts in my repo for easy install):
```
curl https://raw.githubusercontent.com/cyriacd/dotfiles/master/ubuntu/ruby.sh > rubyinstall.sh && bash rubyinstall.sh && rm -f rubyinstall.sh
gem install -g bundler
```
Installing rails(I have scripts in my repo for easy install):
```
curl https://raw.githubusercontent.com/cyriacd/dotfiles/master/ubuntu/rails.sh > railsinstall.sh && bash railsinstall.sh && rm -f railsinstall.sh
```
Installing nodejs (Ubuntu repos have old nodejs versions) (I have scripts in my repo for easy install):
```
curl https://raw.githubusercontent.com/cyriacd/dotfiles/master/ubuntu/node.sh > nodeinstall.sh && bash nodeinstall.sh && rm -f nodeinstall.sh
```


After cloning this repo (you might have to go into a login shell if some commands dont work (sudo --login)
```
cd /<REPOSITORY_LOCATION>/Sp17FlightDashBoard/soctrack
bundle install
rails db:migrate
rails db:seed
rails s
 ```
  
