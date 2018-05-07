# Spork

A recipe website that gives you a handsfree recipe view when cooking and the easy ability to copy (we call it sporking) a recipe to save in your own recipe box.

[Spork Deployed page](https://damp-cove-57304.herokuapp.com/)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Install yarn by running the following command lines

```curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -```
```echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee```
```/etc/apt/sources.list.d/yarn.list```
```sudo apt-get update && sudo apt-get install --no-install-recommends yarn```

### Install Ruby, rails, and foreman by running the following command lines

```rvm install 2.4.1 ```
```rvm use 2.4.1 --default```
```rvm list```
```gem install rails```
```gem install foreman```

### Fork and Clone this repo

### Get dependencies for ruby and react by running the following command lines

```bundle```
```yarn```

### Database Creation & Setup

```bin/rake db:setup```

### Start server with the following command line

```foreman start -f Procfile.dev```

travel to [http://localhost:3000](http://localhost:3000) to view the development page

## Run Various Versions of Our Code Tests

Run all tests with this command
```bundle exec rspec```

Run only model specs with this command
```bundle exec rspec spec/models```

Run only specs for AccountsController with this command
```bundle exec rspec spec/controllers/accounts_controller_spec.rb```

Run only spec on line 8 of AccountsController
```bundle exec rspec spec/controllers/accounts_controller_spec.rb:8```


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

* lots more to be added

## Authors

* Andrew Barclay
* Phil Werner
* Elyott Ryan
* Craig Rice

## License

This project is licensed under the MIT License