angular.module('angular-storage.internalStore', ['angular-storage.storage'])
  .factory('InternalStore', function(storage) {

    function InternalStore(namespace, delimiter) {
      this.namespace = namespace || null;
      this.delimiter = delimiter || '.';
      this.inMemoryCache = {};
    }

    InternalStore.prototype.getNamespacedKey = function(key) {
      if (!this.namespace) {
        return key;
      } else {
        return [this.namespace, key].join(this.delimiter);
      }
    }



    InternalStore.prototype.set = function(name, elem) {
      this.inMemoryCache[name] = elem;
      storage.set(this.getNamespacedKey(name), JSON.stringify(elem));
    };

    InternalStore.prototype.get = function(name) {
      if (name in this.inMemoryCache) {
        return this.inMemoryCache[name];
      }
      var saved = storage.get(this.getNamespacedKey(name));
      var obj =  saved ? JSON.parse(saved) : null;
      this.inMemoryCache[name] = obj;
      return obj;
    };

    InternalStore.prototype.remove = function(name) {
      this.inMemoryCache[name] = null;
      storage.remove(this.getNamespacedKey(name));
    }

    return InternalStore;


  });

