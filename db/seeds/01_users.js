exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'user1',
          password:
            '$2b$10$2zsFYWNIAX/JQtNZGD7r5OW7ZVcc1ZwNdJ26Fr5Q0g/cZavMtMu66'
        },
        {
          username: 'user2',
          password:
            '$2b$10$vSWd3jm7q267084QHRKm4eVJONTjVPvBNX6G5jYuPdHqduGEARFRi'
        },
        {
          username: 'user3',
          password:
            '$2b$10$mlpC/QPHiBLgsJ0QbpeHO.7Dh/XED5wTj/u6MWe.4MsUrQOfWgt/i'
        },
        {
          username: 'user4',
          password:
            '$2b$10$gTwKfeXavUGyN46mZswWfeWIn/W3ex8V5wNQzf97bP8jluD51.crq'
        },
        {
          username: 'user5',
          password:
            '$2b$10$o1XTQ25K/L.YV9rc.C.Zjuku1tclWxmG9/0dDl3Y6fmT93EQlAhqu'
        },
        {
          username: 'user6',
          password:
            '$2b$10$QhkmduJRbuIHUNTmwvpJLuzVaZHoP4siWBbBuAYWShjF.qmFiB.gi'
        }
      ]);
    });
};
