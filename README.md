# Spork [![Build Status](https://travis-ci.org/thelornenelson/zen-spork.svg?branch=master)](https://travis-ci.org/thelornenelson/zen-spork)

Deployed version of [Spork](https://damp-cove-57304.herokuapp.com/)

The recipe website that gives you a full screen, hands-free recipe view when cooking. Organize all of your recipes in one place and quickly copy a recipe (we call it sporking) to save it to your recipes and edit it to suit your needs.

## Project Description
Spork is a full stack single page app built with React on Rails. Spork has a focus on user friendly interface and design - something that is surprisingly lacking in most recipe web apps.

## Amazing user features

* Spicy one button recipe copying ("spork" a recipe)
* Create and edit your recipes
* Cooking friendly (hands free) recipe view
* Delicious UI
* Track how often your recipe has been copied
* Link to what inspired your recipe for the full story

## Stupendous coding

* Input any photo and they are all changed to a uniform size
* Title character count is limited so that browsing recipes is properly presented
* Permission to create recipes requires you to login
* You must own a recipe to be able to edit it
* Required fields in forms are marked as such and you're unable to save until they are filled
* Build as a SPA making for extra crispy loading
* If information isn't included in a recipe, it is hidden when viewing the recipe
* setup factory bot and faker to seed our database during the early stages of development
* User passwords are saved as hashed values for extra security
* If no image is used with the photo there is a placeholder image that is loaded to keep the layout looking sharp
* Notifications when you create, edit, or spork a recipe


## Wonderfulrisical teamwork

* Award winning CD & CI pipeline was utilized throughout the project
* Deployed our scafold to Heroku on day 2 and all approved updated went live
* Test driven backend development with 38 RSpec code tests and counting
* Setup Travis to test any code before it could be pushed to master on Github
* All code being merged to master had to be approved by one other team mate
* Followed an agile workflow. Of course we called our scrums sizzles... because, you know... food.
* Prioritized and coordinated work on a shared Trello board
* style guide was setup and code was tested against style guide before it could be approved to merge to the master 


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Install yarn by running the following command lines

```curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -```  
```echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list```  
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

## Dependencies

* ruby 2.4.1
* Rails 5.2.0
* PostgreSQL 9.5
* react-on-rails 11.0.3

## Logo Design

* Bryan Rice

## Authors

* Andrew Barclay
* Phil Werner
* Elyott Ryan
* Craig Rice

## Screenshots of current version

!["Home page view"](#)
!["Detailed recipe view"](#)

## License

This project is licensed under the MIT License
