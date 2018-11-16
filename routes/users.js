'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = knex => {
  // -------- ALL GET ROUTES ----------

  // @route   GET api/users
  // @desc    check for currentUser else redirect to login
  // @access  Public

  router.get('/', (req, res) => {
    const user_id = req.session.user_id;
    console.log('From users/:', user_id);
    if (user_id) {
      knex
        .select()
        .from('users')
        .where('id', user_id)
        .returning(['id', 'username'])
        .then(user => {
          console.log('Inside user:', user[0]);
          res.redirect(`/api/users/${user[0].id}`);
          // .render('login')
        });
    } else {
      req.session = null;
      res.redirect(`/api/users/login`);
    }
  });

  // @route   GET api/users/register
  // @desc    renders register page
  // @access  Public

  router.get('/register', (req, res) => {
    res.render('register');
  });

  // @route   GET api/users/login
  // @desc    renders login page
  // @access  Public

  router.get('/login', (req, res) => {
    res.status(200).render('login');
  });

  // @route   GET api/users/:id
  // @desc    gets current user
  // @access  Private

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('GET /:id:', id);
    knex
      .select('*')
      .from('user_resourses')
      .join('users', 'users.id', 'user_resourses.user_id')
      .join('user_likes', 'user_resourses.user_id', 'user_likes.user_id')
      .join('resourses', 'user_resourses.resourse_id', 'resourses.id')
      .then(resourses => {
        res.status(200).send(resourses);
      })
      .catch(err => {
        console.log(err);
        // res.status(404).send('Mesaage : 404 :No resourses found');
        res.status(302).redirect('/');
      });
  });

  // @route   GET api/users/:id/rate
  // @desc    gets all rated by  current user
  // @access  Private
  router.get('/:id/rate', (req, res) => {
    const { id } = req.params;
    console.log('GET /:id:', id);
    knex
      .select('*')
      .from('resourses')
      .join(
        'user_resourse_rating',
        'resourses.id',
        'user_resourse_rating.resourse_id'
      )
      //.join('users', 'users.id', 'user_resourse_rating.user_id')
      .where('user_resourse_rating.user_id', id)
      //.join('resourses', 'user_resourses.resourse_id', 'resourses.id')
      .then(resourses => {
        res.status(200).send(resourses);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send('Mesaage : 404 :No resourses found');
      });
  });

  // @route   GET api/users/:id/like
  // @desc    gets current user
  // @access  Private
  router.get('/:id/like', (req, res) => {
    const { id } = req.params;
    console.log('GET /:id:', id);
    knex
      .select('*')
      .from('resourses')
      .join('user_likes', 'resourses.id', 'user_likes.resourse_id')
      //.join('users', 'users.id', 'user_likes.user_id')
      .where('user_likes.user_id', id)
      //.join('resourses', 'user_resourses.resourse_id', 'resourses.id')
      .then(resourses => {
        res.status(200).send(resourses);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send('Mesaage : 404 :No resourses found');
      });
  });
  // @route   GET api/users/:id/comment
  // @desc    gets current users commented resourses
  // @access  Private
  router.get('/:id/comment', (req, res) => {
    const { id } = req.params;
    console.log('GET /:id', id);
    knex
      .select('*')
      .from('resourses')
      .innerJoin('user_comments', 'resourses.id', 'user_comments.resourse_id')
      //.innerJoin('users', 'users.id', 'user_comments.user_id')
      .where('user_comments.user_id', id)
      //.join('resourses', 'user_resourses.resourse_id', 'resourses.id')
      .then(resourses => {
        res.status(200).send(resourses);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send('Mesaage : 404 :No resourses found');
      });
  });

  // @route   GET api/users/:id/resourses
  // @desc    return all resourses of a user
  // @access  Private

  // ============= POST REQUESTS ==================== //

  // @route   POST api/users/login
  // @desc    renders login page
  // @access  Public

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('POST /login : req.body', req.body);

    knex
      .select()
      .from('users')
      .where({
        username: username
      })
      //.returning(['id', 'username'])
      .then(user => {
        console.log('POST /login:', user[0]);
        if (bcrypt.compareSync(password, user[0].password)) {
          console.log('POST /login: inside bcrypt', user[0]);

          req.session.user_id = user[0].id;
          console.log('From login:', user.username);
          res.status(200).redirect(`/api/users/${user[0].id}`);
        }
      })
      .catch(err => {
        console.log('ERROR IS', err);
        res.status(403).send('Mesaage: 403: Invalid username or password');
      });
  });

  // @route   POST api/users/logout
  // @desc    logsout user and redirects to home page
  // @access  Public
  router.post('/logout', (req, res) => {
    req.session = null;
    res.status(200).redirect('/');
  });

  // @route   POST api/users/register
  // @desc  registers new users
  // @access  Public
  router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    knex('users')
      .returning(['id', 'username'])
      .insert({
        username,
        password: hashedPassword
      })
      .then(user => {
        console.log('sEtting cookie in register:', user[0].id);

        req.session.user_id = user[0].id;
        res.status(201).redirect(`/api/users/${user[0].id}`);
      })
      .catch(err => {
        console.error('FROM catch:', err.message);
        res.status(400).send('Message: 400: Bad request: username or password');
      });
  });

  // @route   POST api/users/:id/resourse
  // @desc  registers new users
  // @access  Private
  router.post('/:id/resourse', (req, res) => {
    const { id } = req.params;
    const { url, title, description, intrest_id } = req.body;
    let newResourse;
    return knex
      .transaction(function(t) {
        return knex('resourses')
          .transacting(t)
          .insert({
            url,
            title,
            description,
            intrest_id
          })
          .returning('*')
          .then(function(response) {
            console.log('RESPONSE:', response);
            newResourse = response[0];
            return knex('user_resourses')
              .transacting(t)
              .insert({
                user_id: id,
                resourse_id: response[0].id
              });
          })
          .then(t.commit)
          .catch(t.rollback);
      })
      .then(function(resp) {
        console.log('Transaction complete.');
        res.status(201).send(newResourse);
      })
      .catch(function(err) {
        console.error(err);
        res.status(400).send('Message : 400 : Bad request');
      });
  });

  // @route   POST api/users/:user_id/resourses/:resourse_id/like
  // @desc  logged in user addes a like to a resourse
  // @access  Private
  router.post('/:user_id/resourses/:resourse_id/like', (req, res) => {
    const { user_id, resourse_id } = req.params;
    console.log('req.params:', req.params);
    knex('user_likes')
      .insert({
        user_id: user_id,
        resourse_id: resourse_id
      })
      .then(result => {
        console.log('result :', result);
        res.status(201).send(`LIke added to resourse ${resourse_id}`);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send('Status : 400 : Bad request');
      });
  });

  // @route   POST api/users/:user_id/resourses/:resourse_id/comment
  // @desc  logged in user addes a comment to a resourse
  // @access  Private
  router.post('/:user_id/resourses/:resourse_id/comment', (req, res) => {
    const { user_id, resourse_id } = req.params;
    const { text } = req.body;
    console.log('req.params:', req.params);
    knex('user_comments')
      .insert({
        text: text,
        user_id: user_id,
        resourse_id: resourse_id
      })
      .then(result => {
        console.log('result :', result);
        res.status(201).send(`Comment added to resourse ${resourse_id}`);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send('Status : 400 : Bad request');
      });
  });

  // @route   POST api/users/:user_id/resourses/:resourse_id/rate
  // @desc  logged in user addes a rate to a resourse
  // @access  Private
  router.post('/:user_id/resourses/:resourse_id/rate', (req, res) => {
    const { user_id, resourse_id } = req.params;
    const { rating } = req.body;
    console.log('req.params:', req.params);
    knex('user_resourse_rating')
      .insert({
        rating: rating,
        user_id: user_id,
        resourse_id: resourse_id
      })
      .then(result => {
        console.log('result :', result);
        res.status(201).send(`Rating added to resourse ${resourse_id}`);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send('Status : 400 : Bad request');
      });
  });

  return router;
};
