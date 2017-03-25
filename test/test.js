var githublang = require('../');

var valid = [
  'https://github.com/nodejs/node',
  'git@github.com:nodejs/node.git',
  'git@github.com:asciidisco/Backbone.Marionette.Handlebars.git',
  'https://github.com/asciidisco/Backbone.Marionette.Handlebars',
];

var invalid = ['https://www.google.com'];

valid.forEach(function(url) {
  githublang(url, function(err, langStats) {
    console.log('TEST: valid url: ' + url);
    if (err) return done(err);
    var langs = Object.keys(langStats);
    if (langs.length === 0) return done(new Error('Missing langauges'));
    for (var i = 0; i < langs.length; i++) {
      var lang = langs[i];
      console.log('\tchecking ' + lang);
      if (typeof langStats[lang] !== 'number' || isNaN(langStats[lang]))
        return done(new Error('Invalid usage amount'));
    }
    done();
  });
});

invalid.forEach(function(url) {
  githublang(url, function(err) {
    console.log('TEST: invalid url: ' + url);
    if (err === undefined)
      return done(new Error('expected error was not found'));
    done();
  });
});

var error = null;
var count = 0;
var toRun = valid.length + invalid.length;
function done(err) {
  if (err) console.log('\tnot ok');
  else console.log('\tok');
  error = error || err;
  count++;
  if (count == toRun && error) {
    console.log(error.stack);
    process.exit(1);
  }
  if (count > toRun) throw new Error('"done" was called too many times');
}
