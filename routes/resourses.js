'use strict';

const express = require('express');
const router = express.Router();

module.exports = knex => {
  // @route   GET api/resourses
  // @desc  returns all resourses
  // @access  Public

  router.get('/', (req, res) => {
    let allResources = {};
    knex('resourses')
      .select('*')
      .join('user_resourses', 'resouses.id', 'user_resourses.resouse_id')
      .join('users', 'user_resourses.user_id', 'user.id')
      .then(resources => {
        resources.map(resource => {
          allResources[resource.id] = {
            ...resource,
            totalLikes: 0,
            countRatings: 0,
            totalRating: 0,
            avgRating: function() {
              return this.totalRating / this.countRatings;
            },
            comments: []
          };
        });
        console.log(allResources);
        return allResources;
      })
      .then(() => {
        return knex('user_comments')
          .select(
            'user_comments.id',
            'users.username',
            'user_comments.text',
            'user_comments.updated_at',
            'user_comments.resourse_id'
          )
          .join('users', 'users.id', 'user_comments.user_id');
      })
      .then(comments => {
        console.log('all comments:', comments);
        let allCommnets = [];
        comments.map(comment => {
          let singleComment = { ...comment };

          allResources[comment.resourse_id].comments.push(singleComment);
        });
      })
      .then(() => {
        return knex('user_likes').select('*');
      })
      .then(allLikes => {
        allLikes.map(like => {
          allResources[like.resourse_id].totalLikes++;
        });
      })
      .then(() => {
        return knex('user_resourse_rating').select('*');
      })
      .then(allRatings => {
        allRatings.map(rating => {
          allResources[rating.resourse_id].countRatings += 1;
          allResources[rating.resourse_id].totalRating += rating.rating;
        });
      })
      .then(() => {
        console.log('ALL resources from main:', allResources);
        return allResources;
      })
      .then(() => {
        console.log(allResources);
        res.status(200).render('index', { user_id, allResources });
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
