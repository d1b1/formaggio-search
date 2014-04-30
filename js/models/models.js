
"use strict";
APP.CheeseModel = Backbone.Model.extend({

  defaults: {
    title: "",
    author: "",
    image: "",
    maker: "",
    description: "",
    source: ""
  },

  idAttribute: "_id",

  validate: function (attrs) {
    var errors = {};
    // if (!attrs.title) errors.title = "Hey! Give this thing a title.";
    if (!attrs.description) errors.description = "You gotta write a description, duh!";
    if (!attrs.author) errors.author = "Put your name in dumb dumb...";

    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});

APP.CheeseCollection = Backbone.Collection.extend({

  model: APP.CheeseModel,

  // localStorage: new Backbone.LocalStorage("cheese-models"),

  initialize: function(options) {
    this.term = "Blue";
    this.page = 1;
  },

  url: function() {
    return 'http://api.formagg.io/cheese/search?page=' + this.page + '&size=2&name=' + ( this.term || '' );
  },

  parse: function(data) {
    return data.results;
  }
});
