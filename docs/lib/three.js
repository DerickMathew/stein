(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.stein = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
(function() {
  var LineIter, patterns, randArrSel, voc;

  randArrSel = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  LineIter = (function() {
    function LineIter(grammar, vocab) {
      this.grammar = grammar;
      this.vocab = vocab;
      if (this.grammar.start == null) {
        throw new Error("StartError: No Start rule");
      }
      this.key = randArrSel(this.grammar.start);
    }

    LineIter.prototype.reset = function() {
      return this.key = randArrSel(this.grammar.start);
    };

    LineIter.prototype.nextWord = function() {
      var word;
      word = randArrSel(this.vocab[this.key]);
      this.key = randArrSel(this.grammar[this.key]);
      return word;
    };

    LineIter.prototype.gen = function() {
      var line;
      line = ((function() {
        var results;
        results = [];
        while (this.key !== "END") {
          results.push(this.nextWord());
        }
        return results;
      }).call(this)).join(" ");
      this.reset();
      return line;
    };

    return LineIter;

  })();

  module.exports = LineIter;

  patterns = {
    start: ["noun_s", "det_s", "adj"],
    noun_s: ["verb_s", "verb_past", "END"],
    noun_p: ["verb_past", "END"],
    det_s: ["adj", "noun_s"],
    adj: ["noun_s"],
    verb_s: ["adv", "END"],
    verb_past: ["adv", "day", "END"],
    day: ["END"],
    adv: ["END"],
    END: ["END"]
  };

  voc = {
    noun_s: ["bat", "tree", "leaf", "love", "courage", "power"],
    noun_p: ["boats", "beasts", "skies", "pens", "papers"],
    det_s: ["the", "this", "that", "her", "his", "my"],
    verb_past: ["walked", "blinked", "died", "lived", "throbbed", "pounded", "fought"],
    verb_s: ["thinks", "talks", "looks", "travels", "bleeds"],
    adj: ["red", "big", "fast", "yellow", "dark"],
    day: ["today", "yesterday", "monday", "sunday"],
    adv: ["quickly", "abruptly", "cautiously", "happily", "sadly"]
  };

}).call(this);



},{}],2:[function(require,module,exports){
module.exports={
    "begin":{
        "grammar":{
            "start":["det", "pos"],
            "det":["adj"],
            "pos":["adj"],
            "adj":["END"]
        },
        "vocab":{
            "det":["the", "this", "that"],
            "pos":["my", "his", "her", "their"],
            "adj":["calm", "chaotic", "angry", "immense", "blissful", "strong", "sharp", "shimmering", "dangerous", "glowing", "breezy", "windy", "molten", "icy", "muddy", "enticing"]
        }
    },
    "des_obj":{
        "grammar":{
            "start":["adj", "obj"],
            "adj":["obj"],
            "obj":["post", "mass_post"],
            "post":["det"],
            "mass_post":["mass_noun"],
            "det":["sing_noun"],
            "sing_noun":["END"],
            "mass_noun":["END"]
        },
        "vocab":{
            "adj":["cool", "warm", "hot", "green", "dark", "bright", "crisp", "light", "bold", "red", "brown", "fluffy", "rough"],
            "obj":["face", "spirit", "lion", "beast", "dragon", "tree", "leaf", "blade", "dog", "glass"],
            "post":["of", "beside", "from", "near", "toward"],
            "det":["the"],
            "sing_noun":["river", "forest", "mountain", "underworld"],
            "mass_post":["of"],
            "mass_noun":["roses", "love", "hate", "rage", "power", "evil", "virtue", "peace"]
        }
    },
    "act":{
        "grammar":{
            "start":["verb_past", "verb_pres", "act_past"],
            "act_past":["pron_past_m"],
            "verb_past":["pron_m"],
            "verb_pres":["pron_m"],
            "pron_m":["post_q"],
            "pron_past_m":["adv_past", "END"],
            "adv_past":["END"],
            "post_q":["det"],
            "det":["act_obj"],
            "act_obj":["END"]
        },
        "vocab":{
            "verb_past":["asked", "begged", "beckoned", "wanted"],
            "verb_pres":["asks", "begs", "beckons", "wants"],
            "act_past":["stabbed", "healed", "loved", "hated", "liked"],
            "pron_m":["me", "him", "her", "them"],
            "pron_past_m":["me", "him", "her", "them"],
            "post_q":["for"],
            "det":["a"],
            "act_obj":["kiss", "hand", "rose", "blessing", "hug", "flower", "glance", "look"],
            "adv_past":["softly", "abruptly", "intensely", "viciously", "cowardly", "swiftly", "sharply", "sadly"]
        }
    }
}
},{}],3:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
(function() {
  var engData, iter, one, poemWriter, three, two, write,
    slice = [].slice;

  engData = require("./threeline.json");

  iter = require("../LineIter");

  one = new iter(engData.begin.grammar, engData.begin.vocab);

  two = new iter(engData.des_obj.grammar, engData.des_obj.vocab);

  three = new iter(engData.act.grammar, engData.act.vocab);

  poemWriter = function() {
    var generators;
    generators = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function(amount) {
      var i, j, obj, ref, results;
      results = [];
      for (i = j = 0, ref = amount - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        results.push(((function() {
          var k, len, results1;
          results1 = [];
          for (k = 0, len = generators.length; k < len; k++) {
            obj = generators[k];
            results1.push(obj.gen());
          }
          return results1;
        })()).join(",\n"));
      }
      return results;
    };
  };

  write = function(num) {
    var poet;
    poet = poemWriter(one, two, three);
    return poet(num).join("\n") + "\n";
  };

  module.exports.write = write;

}).call(this);

},{"../LineIter":1,"./threeline.json":2}]},{},[3])(3)
});