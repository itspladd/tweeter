# Tweeter
A simple, single-page, AJAX-based Twitter clone that uses jQuery, HTML5, and CSS3 to help me practice front-end technologies. Created as part of my education at Lighthouse Labs.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above

## Overview

Tweeter is a very simple one-page app that's primarily focused on front-end behaviors. I did not edit the server code at all - every contribution I made is within the **public** folder!

## Features

### Single-Page Functionality
Tweeter allows you to compose, post, and load tweets without refreshing the page. It doesn't support actual user profiles, so the server randomly assigns a username and profile picture to each tweet.

<!-- tweetpost.gif goes here -->
![](https://github.com/itspladd/tweeter/blob/master/docs/tweetpost.gif)
*Thankfully, it's far less addicting than* actual *social media.*

### Animated, Location-Aware Interface
Tweeter's interface includes a bit of animation to make it feel more alive, and its navigational elements change as you scroll. It's not extensive, but the idea is there!

<!-- animation.gif goes here -->
![](https://github.com/itspladd/tweeter/blob/master/docs/animation.gif)
*Look at that basic hover functionality. And the tray sliding in and out! I'm swooning.*

### Input Validation
Tweeter checks your content before submitting it to the server, preventing accidental empty tweets or tweets that go over the character limit. And you can't inject HTML or JavaScript through a tweet - it just gets rendered as text!

<!-- validation.gif goes here -->
![](https://github.com/itspladd/tweeter/blob/master/docs/validation.gif)
*There's probably other ways you could hack it, though. I believe in you.*

### Responsive Design
Tweeter adapts to both mobile-sized and desktop-size views, with custom functionality for the navigation bar, hover-aware elements, and an adaptive layout, including a minimized navigation bar for mobile-size screens!

<!-- responsive.gif goes here -->
![](https://github.com/itspladd/tweeter/blob/master/docs/responsive.gif)
*In this simulation of a touch-only device with no hover functionality, the show-on-hover elements, such as the @handles and icons, display by default!*

### That's it.
Thanks for checking out my project!