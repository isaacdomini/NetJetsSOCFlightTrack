#!/bin/bash
heroku config:set BUNDLE_WITHOUT="development:test"
git subtree push --prefix soctrack heroku master
heroku pg:reset --confirm soctrackdev
heroku run rails db:migrate VERSION=0
heroku run rails db:migrate
heroku run rake db:seed
