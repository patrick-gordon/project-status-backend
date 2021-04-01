
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Patrick', password: '123'},
        {username: 'Farish', password: 'ABC'},
        {username: 'Andrew', password: 'password'}
      ]);
    });
};
