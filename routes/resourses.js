'use strict';

const express = require('express');
const router = express.Router();

module.exports = knex => {
  // @route   GET api/resourses
  // @desc  returns all resourses
  // @access  Public

  // router.get('/', (req, res) => {
  //   knex('resourses')
  //     .select(['url', 'title', 'description', 'intrest_id'])
  //     .then(results => {
  //       res.status(200).send(results);
  //     })
  //     .catch(err => {
  //       console.error(err.message);
  //       res.status(500).send('Mesaage : 500 : Internal server error');
  //     });
  // });

  router.get('/', (req, res) => {
    knex('resourses')
      .select('*')
      .leftJoin('user_comments', 'resourses.id', 'user_comments.resourse_id')
      .leftJoin('user_likes', 'resourses.id', 'user_likes.resourse_id')
      .leftJoin('user_rating', 'resourse.id', 'user_rating.resourse_id')
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Mesaage : 500 : Internal server error');
      });
  });

  // @route   GET api/resourses/intrest/:id
  // @desc  returns all resourses by intrest id
  // @access  Public
  router.get('/intrest/:id', (req, res) => {
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

  // @route   GET api/resourses/rate
  // @desc  returnsall resourses by rating
  // @access  Public

  router.get('/rate', (req, res) => {
    knex('resourses')
      .select('*')
      .from('resourses')
      .join(
        'user_resourse_rating',
        'resourses.id',
        'user_resourse_rating.resourse_id'
      )
      .orderBy('user_resourse_rating.rating', 'desc')
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Mesaage : 500 : Internal server error');
      });
  });

  // @route   GET api/resourses/created
  // @desc  returnsall resourses by created time
  // @access  Public
  router.get('/created', (req, res) => {
    knex('resourses')
      .select()
      .orderBy('created_at', 'desc')
      .then(results => {
        console.log('From created :', results);
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
