var {TurtleClient} = require('../dist/index');
var readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function qus(query) {
  return new Promise(resolve => rl.question(query, ans => {
      rl.close();
      resolve(ans);
  }))
}

var pee;
var turtle;
pee = async (cmd) => {
    var raw = cmd.split(' ');
    if (raw[0] === 'login') {
      console.log('Logging in...');
      turtle = new TurtleClient(raw[1]);
      console.log('Logged in with session ID ' + raw[1] + '.');
    } else if (raw[0] === 'stats') {
      console.log('Please wait...');
      var d = await turtle.getUser(raw[1]);
      d = d.data;
      console.log('--- '+d.user.username+' ---');
      console.log('ID: ' + d.user.id.toString());
      console.log('Tokens: ' + d.user.tokens.toString());
      console.log('EXP: ' + d.user.exp.toString());
      console.log('Role: ' + d.user.role.toString());
      console.log('Color: ' + d.user.color.toString());
    } else if (raw[0] === "session") {
      console.log('Please wait...');
      console.log('--- SESSION (DO NOT SHARE) ---');
      console.log(await turtle.getSession());
    } else if (raw[0] === "lb") {
      console.log('Please wait...');
      console.log('--- LEADERBOARD ---');
      var ses = await turtle.getLeaderboard();
      ses = ses.data;
      for (var x of ses.tokens) {
        console.log('['+x.role+'] '+x.username+' - '+x.tokens.toString())
      }
    } else {
      console.log('Unknown command.');
    }
    process.stdout.write('> ')
};

process.stdout.write('> ')

rl.on('line', async (cmd) => {
  if ((cmd !== undefined) && (cmd !== null)) {
    await pee(cmd === undefined ? "" : cmd === null ? "" : cmd);
  };
});