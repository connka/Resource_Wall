'use strict';

const express = require('express');
const router = express.Router();

module.exports = knex => {
  // @route   GET api/resourses
  // @desc  returns all resourses
  // @access  Public

  router.get('/', (req, res) => {
    knex('resourses')
      .select(['url', 'title', 'description', 'intrest_id'])
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Mesaage : 500 : Internal server error');
      });
  });

  // @route   GET api/resourses/:id
  // @desc  returns one resourse by id
  // @access  Public
  router.get('/:id', (req, res) => {
    knex('resourses')
      .select(['url', 'title', 'description', 'intrest_id'])
      .where({
        id: req.params.id
      })
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Mesaage : 500 : Internal server error');
      });
  });
  // @route   GET api/resourses/:id
  // @desc  returns one resourse by id
  // @access  Public
  router.get('/:id', (req, res) => {
    knex('resourses')
      .select(['url', 'title', 'description', 'intrest_id'])
      .where({
        id: req.params.id
      })
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Mesaage : 500 : Internal server error');
      });
  });

  return router;
};
