'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = knex => {
  // -------- ALL GET ROUTES ----------

  // @route   GET api/users/
  // @desc    gets all users
  // @access  Public

  // router.get('/', (req, res) => {
  //   knex
  //     .select('*')
  //     .from('users')
  //     .then(results => {
  //       res.json(results);
  //     });
  // });

  // @route   GET api/users
  // @desc    gets all users
  // @access  Public

  router.get('/', (req, res) => {
    //const user_id = req.session.user_id;
    if (user_id) {
      res.redirect('/');
    } else {
      req.session = null;
      res.redirect('/login');
    }
  });

  // @route   GET api/users/register
  // @desc    renders register page
  // @access  Public

  router.get('/register', (req, res) => {
    res.status(200).render('register');
  });

  // @route   GET api/users/login
  // @desc    renders login page
  // @access  Public

  router.get('/login', (req, res) => {
    res.status(200).render('login');
  });

  // ============= POST REQUESTS ==================== //

  // @route   POST api/users/login
  // @desc    renders login page
  // @access  Public

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('body', req.body);
    knex
      .select()
      .from('users')
      .where('username', username)
      .returning(['id', 'username'])
      .then(user => {
        if (bcrypt.compareSync(password, user[0].password)) {
          req.session.user_id = user.id;
          res.status(200).send(user[0]);
        }
      })
      .catch(err => {
        res.status(403).send('Mesaage : 403 : Invalid username or password');
      });
  });

  // @route   POST api/users/logout
  // @desc    logsout user and redirects to home page
  // @access  Public
  router.post('/logout', (req, res) => {
    req.session = null;
    res.status(200).redirect('/');
  });

  // route to register a user , check if id,email are avialabe ,and email and password fields are not let empty by user .
  //route : "/register"
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
        req.session.user_id = user[0].id;
        res.status(201).redirect('/');
      })
      .catch(err => {
        console.error('FROM catch:', err.message);
        res.status(400).send(err.message);
      });
  });

  return router;
};
