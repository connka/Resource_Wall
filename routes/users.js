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
        });
    } else {
      req.session = null;
      res.redirect('/login');
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

  // @route   GET api/users/:id
  // @desc    gets current user
  // @access  Private

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('GET /:id:', id);
    knex
      .select('*')
      .from('user_resourses')
      .join('users', 'users.id')
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
          req.session.user_id = user.username;
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
        console.log('REturn user:', user[0]);
        req.session.user_id = user[0].username;
        res.status(201).redirect(`/api/users/${user[0].id}`);
      })
      .catch(err => {
        console.error('FROM catch:', err.message);
        res.status(400).send('Message: 400: Bad request: username or password');
      });
  });

  // @route   POST api/users/register
  // @desc  registers new users
  // @access  Public
  router.post('/:id/resourse', (req, res) => {
    const { url, title, description, intrest_id } = req.body;
    knex('resourses')
      .insert({
        url,
        title,
        description,
        insert_id
      })
      .then(resourse => {
        console.log(resourse);
        knex('user_resourses').insert({});
      })
      // .then(resourse => {
      //   req.session.user_id = user[0].username;
      //   res.status(201).redirect(`/api/users/${user[0].id}`);
      // })
      .catch(err => {
        console.error('FROM catch:', err.message);
        res.status(400).send('Message: 400: Bad request: username or password');
      });
  });

  return router;
};
