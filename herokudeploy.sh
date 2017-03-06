#!/bin/bash
git subtree push --prefix soctrack heroku master
# git push heroku `git subtree split --prefix soctrack master`:master --force
heroku pg:reset --confirm soctrackdev
heroku run rails db:migrate
heroku run rake db:seed
