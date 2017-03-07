FROM ruby:2.4.0

RUN apt-get update -yqq \
    && apt-get install -yqq --no-install-recommends \
    nodejs \
    && apt-get -q clean \
    && rm -rf /var/lib/apt/lists

ENV RAILS_ROOT /usr/src/app
WORKDIR $RAILS_ROOT

COPY Gemfile* ./
RUN bundle install
COPY . .

CMD exec bundle exec rails server
