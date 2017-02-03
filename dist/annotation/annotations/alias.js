'use strict';

var _Array$find = require('babel-runtime/core-js/array/find')['default'];

exports.__esModule = true;
exports['default'] = alias;

function alias(env) {
  return {
    name: 'alias',

    parse: function parse(text) {
      return text.trim();
    },

    resolve: function resolve(data) {
      data.forEach(function (item) {
        if (item.alias === undefined) {
          return;
        }

        var alias = item.alias;
        var name = item.context.name;
        var aliasGroup = item.group;

        var aliasedItem = _Array$find(data, function (i) {
          return i.context.name === alias;
        });

        if (aliasedItem === undefined) {
          env.logger.warn('Item `' + name + '` is an alias of `' + alias + '` but this item doesn\'t exist.');
          delete item.alias;
          return;
        }

        if (!Array.isArray(aliasedItem.aliased)) {
          aliasedItem.aliased = [];
        }

        if (!Array.isArray(aliasedItem.aliasedgroup)) {
          aliasedItem.aliasedgroup = [];
        }

        aliasedItem.aliased.push(name);
        aliasedItem.aliasedgroup.push({ group: aliasGroup, name: name });
      });
    },

    allowedOn: ['function', 'mixin', 'variable'],

    multiple: false
  };
}

module.exports = exports['default'];