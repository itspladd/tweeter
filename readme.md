# Tweeter
A simple, single-page, AJAX-based Twitter clone that uses jQuery, HTML5, and CSS3 to help me practice front-end technologies. Created as part of my education at Lighthouse Labs.

## Overview

Tweeter is a very simple one-page app that's primarily focused on front-end behaviors. I did not edit the server code at all - every contribution I made is within the **public** folder!

## Installing and Running Tweeter

1. Clone the project to a new folder.
2. Use `npm install` to install dependencies.
3. Use `npm run local` to start the server.
4. Navigate to [localhost:8080](localhost:8080) to see the app!

## Features

### Single-Page Functionality
Tweeter allows you to compose, post, and load tweets without refreshing the page. It doesn't support actual user profiles, so the server randomly assigns a username and profile picture to each tweet.

<!-- tweetpost.gif goes here -->

### Animated, Location-Aware Interface
Tweeter's interface includes a bit of animation to make it feel more alive, and its navigational elements change as you scroll. It's not extensive, but the idea is there.

<!-- animation.gif goes here -->

### Input Validation
Tweeter checks your content before submitting it to the server, preventing accidental empty tweets or tweets that go over the character limit. And you can't inject HTML or JavaScript through a tweet - it just gets rendered as text!

<!-- validation.gif goes here -->

### Responsive Design
Tweeter adapts to both mobile-sized and desktop-size views, with custom functionality for the navigation bar, hover-aware elements, and an adaptive layout, including a minimized navigation bar for mobile-size screens!

<!-- responsive.gif goes here >