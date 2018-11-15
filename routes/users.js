'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = knex => {
  // -------- ALL GET ROUTES ----------

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

  // @route   GET api/users/:id/resourses
  // @desc    return all resourses of a user
  // @access  Private

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
        req.session.user_id = user[0].id;
        res.status(201).redirect(`/api/users/${user[0].id}`);
      })
      .catch(err => {
        console.error('FROM catch:', err.message);
        res
          .status(400)
          .send('Mesaage : 400 : Bad request : username or password');
      });
  });

  return router;
};
