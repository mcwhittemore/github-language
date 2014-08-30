# Github Languages

Give me a repo and I'll tell you what languages it was written with.

## Example

```js
var gitLang = require("github-languages");
gitLang("https://github.com/mcwhittemore/github-language", function(err, langs){
	console.log(langs);
});
```

Results in `{'JavaScript':100.0}`

## Supported Url Types

* https://github.com/mcwhittemore/github-language
* git@github.com:mcwhittemore/github-language.git