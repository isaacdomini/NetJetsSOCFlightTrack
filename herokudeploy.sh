#!/bin/bash
heroku config:set BUNDLE_WITHOUT="development:test"
git subtree push --prefix soctrack heroku master
heroku run rails db:migrate
