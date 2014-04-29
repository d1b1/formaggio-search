"use strict";
APP.TrView = Backbone.View.extend({
  // the wrapper defaults to div, so only need to set this if you want something else
  // like in this case we are in a table so a tr
  tagName: "tr",
  // functions to fire on events
  events: {
    "click a.delete": "destroy"
  },

  // the constructor
  initialize: function (options) {
    // model is passed through
    this.cheese  = options.cheese;
    this.cheeses = options.cheeses;
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#rowTemplate').html(), this.cheese.toJSON()));
    return this;
  },

  // delete the model
  destroy: function (event) {
    event.preventDefault();
    event.stopPropagation();
    // we would call
    // this.model.destroy();
    // which would make a DELETE call to the server with the id of the item
    this.cheeses.remove(this.cheese);
    this.$el.remove();
  }
});
