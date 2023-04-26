'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('cruds', {
    id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: type.STRING, length: 255 },
    created_at: { type: type.TIMESTAMP, notNull: true },
    updated_at: { type: type.TIMESTAMP, notNull: true }
  });
};

exports.down = function(db) {
  return db.dropTable('cruds');
};

exports._meta = {
  "version": 1
};
