var protoclass = require("protoclass"),
type           = require("type-component");

/**
 */

function Janitor () {
  this._garbage = [];
}

/**
 */
 
protoclass(Janitor, {

  /**
   */

  add: function (disposable) {

    if (disposable.dispose) {
      this._garbage.push(disposable);
    } else if (type(disposable) === "function") {
      this._garbage.push({
        dispose: disposable
      });
    }

    return this;
  },

  /**
   */

  addTimeout: function (timer) {
    return this.add({
      dispose: function () {
        clearTimeout(timer);
      }
    });
  },

  /**
   */

  addInterval: function (timer) {
    return this.add({
      dispose: function () {
        clearInterval(timer);
      }
    });
  },

  /** 
   * disposes all items in the collection
   */

  dispose: function () {
    for(var i = this._garbage.length; i--;) {
      this._garbage.dispose();
    }
    this._garbage = [];
    return this;
  }
});

module.exports = function () {
  return new Janitor();
}