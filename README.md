## Spork

[Spork](http://)

## Versions

* ruby 2.4.1
* Rails 5.2.0

## Dependencies

* @rails/webpacker   3.5
* babel-preset-react   ^6.24.1",
* prop-types   ^15.6.1",
* react   ^16.3.2",
* react-dom   ^16.3.2",
* react-on-rails   ^11.0.3"

## System Dependencies

## Configuration

## Database Creation

## Database Initialization

## How to run the development suite

# Install yarn by running the following command lines

* curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
* echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee
* /etc/apt/sources.list.d/yarn.list
* sudo apt-get update && sudo apt-get install --no-install-recommends yarn

# Install Ruby, rails, and foreman by running the following command lines

* rvm install 2.4.1 
* rvm use 2.4.1 --default
* rvm list
* gem install rails
* gem install foreman

# Fork and Clone this repo

# Get dependencies for ruby and react by running the following command lines

* bundle
* yarn

# Start server with the following command line

* foreman start -f Procfile.dev

travel to http://localhost:3000 to view the development page