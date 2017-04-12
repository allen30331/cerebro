[![Build Status](https://travis-ci.org/allen30331/cerebro.svg?branch=master)](https://travis-ci.org/allen30331/cerebro)

# Cerebro Music

## About
> Cerebro Music is an app intended to provide users the ability to find songs and create playlists.


# Getting Started 

## Installing 

* git clone https://github.com/allen30331/cerebro
* cd cerebro
* npm install

## Launching 

* npm start
* open localhost:8080 in browser


# API Routes

## Users

* get(/users). Retrieves all users.
* get(/users/:id). Retrieves user by id.
* post(/users). Creates a user.
* put(/users/:id). Updates user by id. 
* delete('/users/:id'). Deletes user by id. 


## Playlists

* get(/playlists). Retrieves all playlists.
* get(/playlists/:id). Retrieves playlist by id.
* post(/playlists). Creates a playlist.
* put(/playlists/:id). Updates playlist by id. 
* delete('/playlists/:id'). Deletes playlist by id.