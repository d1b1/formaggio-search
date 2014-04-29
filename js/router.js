"use strict";
window.APP = window.APP || {};
APP.Router = Backbone.Router.extend({

  routes: {
    "cheese/new": "create",
    "cheese/index": "index",
    "cheese/:id/edit": "edit",
    "cheese/:id/view": "show"
  },

  initialize: function (options) {
    this.cheeses = options.collection;
    this.cheeses.bind('reset', this.updateDebug, this);
    this.cheeses.bind('add', this.updateDebug, this);
    this.cheeses.bind('remove', this.updateDebug, this);
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.cheeses.toJSON(), null, 4));
  },

  create: function () {
    this.currentView = new APP.CheeseNewView({
      notes: this.cheeses, note: new APP.NoteModel()
    });

    $('#primary-content').html(this.currentView.render().el);
  },

  edit: function (id) {
    var note = this.cheeses.get(id);
    this.currentView = new APP.NoteEditView({note: note});
    $('#primary-content').html(this.currentView.render().el);
  },

  show: function (id) {
    var cheese = this.cheeses.get(id);

    if (!cheese)
      return window.location.hash = "cheese/index";

    this.currentView = new APP.CheeseDetailView({
      model: cheese
    });

    $('#primary-content').html(this.currentView.render().el);
  },

  index: function () {
    this.currentView = new APP.IndexView({
      collection: this.cheeses
    });

    $('#primary-content').html(this.currentView.render().el);

    // Call for new data.
    this.cheeses.fetch()
  }
});
