
"use strict";
APP.IndexView = Backbone.View.extend({

  // the constructor
  initialize: function (options) {
    _.bindAll(this, 'more');

    this.cheeses = options.collection;
    this.cheeses.bind('reset', this.addAll, this);
    this.cheeses.bind('add', this.render, this);

    // $(window).scroll(this.more);
  },

  events: {
    'keyup .textSearch': 'search',
    'click .more': 'more',
    'scroll': 'more'
  },

  more: function() {
    this.collection.page++;

    // $('.spinner').toggleClass('active');
    this.collection.fetch( { add: true, remove: false });
  },

  search: function(evt) {
    var term = $('.textSearch').val();

    if (term.length > 2) {
      this.cheeses.term = term;
      console.log('ready to call with a new term')
      this.cheeses.fetch();
    }
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#indexTemplate').html(), { term: this.collection.term }));

    this.addAll();
    return this;
  },

  addAll: function () {
    // clear out the container each time you render index
    // this.$el.find('tbody').children().remove();
    console.log('Models', this.cheeses.models.length);

    _.each(this.cheeses.models, $.proxy(this, 'addOne'));
  },

  addOne: function (cheese) {
    var view = new APP.TrView({
      cheeses: this.cheeses,
      cheese: cheese
    });
    this.$el.find("tbody").append(view.render().el);
  }
});
