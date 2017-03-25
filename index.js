var request = require('request');
var cheerio = require('cheerio');

module.exports = function(url, callback) {
  var data = url.match(
    /github.com[/:][a-zA-Z0-9\-]*\/[a-zA-Z0-9\-\.]*(\.git){0,1}/
  );
  if (data == undefined || data[0] === null) {
    return setTimeout(function() {
      callback(new Error('Unknown url format: ' + url));
    });
  }
  var stub = data[0].replace(/github.com[\/:]/, '');
  var parts = stub.split(/\//);
  var user = parts[0];
  var repo = parts[1];

  var url = 'https://github.com/' + user + '/' + repo;

  request(url, function(err, result) {
    if (err) {
      callback(err);
    } else {
      var langs = {};

      var $ = cheerio.load(result.body);
      var toggleStats = $('.js-toggle-lang-stats');
      toggleStats.find('span').each(function(i, span) {
        var lang = $(this).text();
        var styleAttr = $(this).attr('style').replace(/[ %]/g, '');
        var styles = styleAttr.split(';');
        var percent = null;
        for (var i = 0; i < styles.length; i++) {
          var style = styles[i];
          if (style.indexOf('width:') == 0) {
            percent = style.replace('width:', '');
            break;
          }
        }

        if (percent) {
          langs[lang] = parseFloat(percent, 10);
        } else {
          callback(new Error('Cannot find percent'));
        }
      });

      callback(null, langs);
    }
  });
};
