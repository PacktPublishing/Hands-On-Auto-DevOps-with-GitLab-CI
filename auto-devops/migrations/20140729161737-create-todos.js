exports.up = function(db, callback) {
  var schema = {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    title: 'string',
    completed: 'boolean'
  };

  db.createTable('todos', schema, callback);
};

exports.down = function(db, callback) {
  db.dropTable('todos', callback);
};
