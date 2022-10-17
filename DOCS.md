# MIGRATED TO https://trtl.acaiberii.win/docs
PLEASE USE THIS INSTEAD OF THESE DOCS.

# Welcome to the Trtl docs!
Here you'll find information on how to code with Trtl.

## Trtl-Migrate
VillainsRule4000 has made a Trtl distribution with the exact same syntax of Betastar.js - allowing you to efficiently migrate from Betastar.js to Trtl with no issues. (link unavailable)

## Trtl-Main
Trtl has TypeScript declarations, meaning you can use Trtl with TypeScript without any usage of ```// @ts-ignore```.  
Trtl can also be installed with NPM - ```npm install blacket-turtle```.

Trtl-Main is asynchronous-only, which may cause some problems, but not enough to ruin your project.

Here's a good basic bot from Trtl-Main

```js
var {TurtleClient} = require('blacket-turtle');

var client = new TurtleClient('session ID');

client.events.on('join', (data) => {
    console.log(data.user.username + ' joined.');
});

client.events.on('leave', (data) => {
    console.log(data.user.username + ' left.');
});

client.events.on('msg', (data) => {
    console.log('['+data.role+'] '+data.from+' - '+data.msg);
});

// Run code asynchronously so we can use .getUser, etc.
(async () => {
// Get the current user (use await client.getUser('name') to get another user). Returns an axios request object directly.
var user = await client.getUser();
var data = user.data;

console.log('Logged in as '+data.user.username+' (id '+data.user.id.toString()+')');
})();
```

### What's in the shell?
An important notice, first of all.

Using a continuous loop for all of these functions is NOT recommended. You can get banned for API abuse for a single ratelimit.

If you do want to make an auto-opener, which is DEFINITELY NOT RECOMMENDED, please use a delay of over 3500 milliseconds to prevent bans.

You MUST either use your real IP address, or a system-wide VPN (system-wide VPNs such as Nord, Express, Proton are all recommended.) The IP address you signed up with MUST be the same IP address that Trtl runs off of. Otherwise, your account may be banned for using two separate IP addresses on the same account.

- ```TurtleClient``` - The client itself. ```new TurtleClient('session id')```   
    - ```TurtleClient.events``` - The event emitter. ```client.events.on('event', () => {console.log('function');})```
        - ```error``` - Event for when an error occurs.
        - ```msg``` - Event for when a message is received.
        - ```clear``` - Event for when the chat is (supposed) to be cleared.
        - ```join``` - Event for when a user joins the chat.
        - ```leave``` - Event for when a user leaves the chat.
    - ```logout``` - Log out of your account (and reset the session ID) ```await client.logout();```
    - ```join``` - Join a room. For chatbots, this is required, but a parameter isn't. ```await client.join('room')```, ```await client.join()```
    - ```sendMessage``` - Send a message. ```await client.sendMessage('message', 'room')```, ```await client.sendMessage('message')```
    - ```openBox``` - Open a box. ```await client.openBox('box')```
    - ```sellBlook``` - Sell a blook. ```await client.sellBlook('blook', 1337)```
    - ```getNews``` - Get the news. ```await client.getNews()```
    - ```getPacks``` - Get a list of the current packs. ```await client.getPacks()```
    - ```getRarities``` - Get a list of the rarities of items in each pack. ```await client.getRarities()```
    - ```getBlooks``` - Get a list of every blook. ```await client.getBlooks()```
    - ```getConfig``` - Get the current instance's configuration settings. ```await client.getConfig()```
    - ```getLeaderboard``` - Get people on the leaderboard. ```await client.getLeaderboard()```
    - ```getExistingMessages``` - Get the existing messages in a room. ```await client.getExistingMessages('room')```
    - ```getUser``` - Get detailed information about the bot itself, OR information about other users. ```await client.getUser()```, ```await client.getUser('name')```
    - ```getSession``` - Get your session ID. **DO NOT SHARE THIS WITH ANYONE, OR YOUR ACCOUNT CAN BE COMPROMISED.** - ```await client.getSession()```
