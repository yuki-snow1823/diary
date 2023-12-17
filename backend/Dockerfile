FROM ruby:3.2.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

COPY Gemfile* ./
RUN bundle install
COPY . .

RUN chmod +x bin/render-build.sh

EXPOSE 3000

CMD ["bash", "-c", "bin/render-build.sh && rails server -b 0.0.0.0"]