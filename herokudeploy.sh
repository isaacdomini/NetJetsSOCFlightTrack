#!/bin/bash
git subtree push --prefix soctrack heroku master
heroku pg:reset --confirm soctrackdev
heroku run rails db:migrate
heroku run rake db:seed
