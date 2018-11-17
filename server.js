'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const app = express();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const cookieSession = require('cookie-session');

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');
const resoursesRoutes = require('./routes/resourses');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['qwertyu', 'ertyui'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(
  '/styles',
  sass({
    src: __dirname + '/styles',
    dest: __dirname + '/public/styles',
    debug: true,
    outputStyle: 'expanded'
  })
);
app.use(express.static('public'));

// Mount all resource routes
app.use('/api/users', usersRoutes(knex));
app.use('/api/resourses', resoursesRoutes(knex));

// // Home page
// app.get('/', (req, res) => {
//   const user_id = req.session.user_id;
//   const username = req.session.username;
//   console.log('USER IS', user_id);
//   res.render('index', { user_id });
// });

// @route   GET api/resourses
// @desc  returns all resourses
// @access  Public

app.get('/', (req, res) => {
  let allResources = {};
  let user_id = req.session.user_id;
  console.log('current user :', user_id);
  knex('resourses')
    .select('*')
    //.join('intrests', 'intrests.id', 'resourses.intrest_id')
    .then(resources => {
      resources.map(resource => {
        allResources[resource.id] = {
          user_id,
          ...resource,
          totalLikes: 0,
          countRatings: 0,
          totalRating: 0,
          comments: []
        };
      });
      //console.log(allResources);
      //return allResources;
    })
    // knex('resourses')
    //   .select('intrests.name', 'resourses.id')
    //   .join('intrests', 'intrests.id', 'resourses.intrest_id')
    //   .then(allIntrests => {
    //     console.log('ALL INTREST:,', allIntrests);
    //     // allIntrests.map(intrest => {
    //     //   allResources[intrestresource.id] = {
    //     //     user_id,
    //     //     ...resource,
    //     //     totalLikes: 0,
    //     //     countRatings: 0,
    //     //     totalRating: 0,
    //     //     comments: []
    //     //   };
    //     //});
    //     //console.log(allResources);
    //     //return allResources;
    //   })
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
      let allCommnets = [];
      comments.map(comment => {
        let singleComment = { ...comment };
        console.log('Single comment:', singleComment);
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
      //console.log('ALL resources:', allResources);
      return allResources;
    })
    .then(() => {
      //console.log(allResources);
      let templateVars = { user_id, allResources };
      //console.log('TEMPLATE VARS:', templateVars);
      res.status(200).render('index', templateVars);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send('Mesaage : 500 : Internal server error');
    });
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
