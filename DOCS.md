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
