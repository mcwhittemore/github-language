require("should");

var githublang = require("../");

var asynchelper = function(done, fn){
	try{
		fn();
		done();
	}
	catch(err){
		done();
	}
}

var hasLangs = function(langs){
	var langNames = Object.keys(langs);
	langNames.length.should.be.greaterThan(0);
	langNames.forEach(function(name){
		langs[name].should.be.a.Number;
	});
}

describe("When this is used", function(){
	describe("and a repo url like", function(){
		it("https://github.com/joyent/node should return an object of languages", function(done){
			this.timeout(5000);
			githublang("https://github.com/joyent/node", function(err, langs){
				asynchelper(done, function(){
					if(err){
						throw err;
					}
					else{
						hasLangs(langs);
					}
				});
			});
		});

		it("git@github.com:joyent/node.git should return an object of languages", function(done){
			this.timeout(5000);
			githublang("git@github.com:joyent/node.git", function(err, langs){
				asynchelper(done, function(){
					if(err){
						throw err;
					}
					else{
						hasLangs(langs);
					}
				});
			});
		});

		it("https://www.google.com should though an error", function(done){
			githublang("https://www.google.com", function(err, langs){
				asynchelper(done, function(){
					if(err){
						err.message.should.startWith("Unknown url format");
					}
					else{
						throw err;
					}
				});
			});
		});
	});
});