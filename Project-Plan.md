# W05D05 - Mid-term Project Kickoff

### Pick a Project

- Buy/Sell Listing Website

### User Stories

- A _user story_ describes how users will interact with your application
- They have the form: As a **\_\_**, I want to **\_\_**, because **\_\_**.
<!-- - eg. As a _user_, I want to _be able to save posts_, because _I want to review them later_.
- User stories can also be negated: As a **\_**, I shouldn't be able to **\_\_**, because **\_**.
- eg. As a _user_, I shouldn't be able to _edit other users posts_, because _I don't own those posts_. -->

USERS

- As a USER, I want to be able to GET FEATURED ITEMS, because i want SEE WHAT IS NEW.
- As a USER, I want to be able to FILTER BY FAVOURITES, because i want SEE ALL MY FAVOURITE.
- As a USER, I want to be able to FILTER BY PRICE, because i want BUY ITEMS WITHIN MY BUDGET.
- As a USER, I want to be able to FILTER BY ITEM, because i want BUY SPECIFIC ITEMS. (STRETCH)
- As a USER, I want to be able to FAVOURITE ITEMS, because i want CHECK UP ON A ITEM I WANT TO BUY LATER.

BREAD (BROWSE, READ, EDIT, ADD, DELETE) ADMINS

- As a ADMIN, I want to be able to POST/UPDATE ITEMS, because i want SELL THE ITEM.
- As a ADMIN, I want to be able to POST/UPDATE THE PRICE, because i want SELL AT A CERTAIN PRICE.
- As a ADMIN, I want to be able to POST/UPDATE THE CATEGORY FOR THE ITEM, because i want SELL A SPECIFIC ITEM IN A CERTAIN CATEGORY. (stretch)
- As a ADMIN, I want to be able to POST/UPDATE THE DESCRIPTION FOR THE ITEM, because i want DESCRIBE MY PRODUCT.
- As a ADMIN, I want to be able to SEE THE POST DATE(AUTOMATIC), because i want TO SHOW WHEN IT WAS POSTED.
- As a ADMIN, I want to be able to POST/UPDATE THE PICTURES OF THE ITEM, because i want SHOW PRODUCT.
- As a ADMIN, I want to be able to DELETE THE POSTED ITEM, because I CHANGED MY MIND.
- As a ADMIN, I want to be able to UPDATE THE POSTED ITEM AS SOLD, because SOMEONE BOUGHT THE ITEM.

//TODO ASK INSTRUCTOR ABOUT MESSAGING SYSTEM

MESSAGING SYSTEM (TWILLIO)

- As a USER, I want to be able to MESSAGE THE SELLER, because i want BUY AT A CERTAIN PRICE (NEGOTIATE/AVAILABILITY). START OF WITH EMAIL MESSAGING FIRST.
- As a ADMIN, I want to be able to RESPOND TO THE USER VIA EMAIL OR CHAT, because I WANT TO SELL MY ITEM.

### User Scenarios

- A _user scenario_ is a syntactic alternative to user stories
- They have the form: Given **\_**, when **\_\_**, then **\_\_**.
- eg. Given _that I am logged in_, when _I click favourite on a post_, then _it is added to my favourites_.
- You can also chain on an _and_ to user stories/scenarios
- eg. Given _that I am logged in_, when _I click favourite on a post_, then _it is added to my favourites_ **and** _the save icon will change to indicate success_.

USERS (USER SESSION IE COOKIE SESSION)

- Given THAT I AM LOGGED IN, when I CLICK FAVOURITE ON A POST, then IT IS ADDED TO MY FAVOURITE
- Given THAT I AM LOGGED IN, when I CLICK FAVOURITE ON A POST, then IT IS ADDED TO MY FAVOURITES **AND** THE SAVE ICON WILL CHANGE TO INDICATE SUCCESS.
- Given THAT I AM LOGGED IN, when I CLICK FILTER DROP DOWN BUTTON, then I CAN SEE FILTERED ITEMS BY PRICE
- Given THAT I AM LOGGED IN, when I CLICK FILTER DROP DOWN BUTTON, then I CAN SEE A FILTERED ITEMS BY FAVOURITES
- Given THAT I AM NOT LOGGED IN, when I CLICK CREATE POST, THEN I CANT CREATE A POST
- Given THAT I AM NOT LOGGED IN, when I CLICK FAVOURITE POST, then IT

- Given THAT I AM LOGGED IN, when I CHAT BUTTON ON A POST, then IT MESSAGES THE USER

### ERD

- nouns: users, products, favourites, messages
- The user stories provide you with nouns (eg. user, posts, favourites)
- Use these nouns/entities to build out your database (ie. tables are the nouns from the stories)

### Routes

- Once you know the resources that you'll have, write out the routes that you'll need to perform BREAD operations on those resources
- Remember RESTful conventions (they make it much easier)

GET is shareable/repeatable and is shown in the URL (filtering)
POST submits a body of key values pairs

POST /message/:id

POST /create/:id/
POST /login/:id/mylistings/edit
POST /login/:id/mylistings/sold
POST /login/:id/mylistings/delete

POST /login/:id/edit/:productID
POST /login/:id/sold/:productID
POST /login/:id/delete/:productID

GET /
GET login/:id/mylistings/
GET /create
GET /favourites/:id
GET login/:id/contact/:productID/

EMAIL (MESSAGE HISTORY)

### MVP vs MVD

- There is a concept in development of an MVP, the Minimum Viable Product
- An MVP has just enough features to be useful to a user
- This concept helps streamline the development process and help keep the team on target
- For mid-terms, we want to focus on the MVD, the Minimum Viable Demo
- **If you aren't going to demo it, don't build it**

### Wireframes

- for each route
- Draw out the structure of your web pages
- This will make it much easier to build out these pages later
- This is also a great opportunity to get input from all of the team members
- Design matters... however you are a developer, not a designer
- Get inspiration from websites you visit

### User Login

- Don't do it
- Seriously, don't do it
- We know that you know how to register and login users

```js
// do this instead
app.get("/login/:id", (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // or using plain-text cookies
  res.cookie("user_id", req.params.id);

  // send the user somewhere
  res.redirect("/");
});
```

### Tech Choices

- We have made all the tech choices for you
- Back End: Node and Express
- Front End: HTML, CSS, JS, jQuery, Bootstrap

### The Mid-term Skeleton

- Use the provided `node-skeleton` as a template for your project
- This will get you up and running quickly

### SPA vs Multi-page App

- MULTI-PAGE PAGE APP

### Git

- Use Git best practices (ask a mentor for clarification if you need it)
- Use branches

### DO NOT CODE ON MASTER

- I repeat, do not code on master

### Splitting up the Work

- Horizontally - whole team working on front-end or back-end at the same time
- Vertically - divide the work between front-end and back-end
- Pair Programming - working together on the same tasks

### Communication

- Make sure to communicate with your team members
- Use Slack, iMessage, Google Hangouts, whatever... just make sure that everyone is on the same page

### Github Projects

- Github has a built-in project board (similar to a kanban board)

### Deployment

- Decide if you want/need to deploy your application to the cloud
- Ask a mentor for assistance/advice if your team decides to deploy

Availability:

Kevin: M-F starting 7PM EST, Saturday/Sunday - ALL Day
Tony: M-F starting 8PM EST - 10/11PM EST, Saturday/Sunday - ALL Day
Medhanie: M-T 5/6PM - 12PM W-F 8:30PM-12AM Saturday - All Day, Sunday - All day except 11:30AM-3:00PM

Meeting Monday, Wednesday, Friday 8:30PM
Big meeting Tuesday after lecture.
