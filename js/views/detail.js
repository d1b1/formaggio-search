
"use strict";
APP.CheeseDetailView = Backbone.View.extend({

  // the constructor
  initialize: function (options) {
    this.model = options.model;
  },

  // populate the html for the dom
  render: function () {
    this.$el.html(_.template($('#showTemplate').html(), this.model.toJSON()));
    return this;
  }

});
