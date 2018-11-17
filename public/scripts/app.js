// app.use(express.static('./styles/css'));


// const userData = {
//   "user": {
//       "id": "1",
//       "username": "@JSmith",
//       "name": "Joe Smith",
//       "email": "joesmith@gmail.com",
//       "location": "Boston",
//       "intrests": {
//           "intrest 1": "Hiking", 
//           "intrest 2": "Programming", 
//           "intrest 3": "Drawing"
//       },
//   },

//   "user": {
//       "id": "2",
//       "username": "@KatCon",
//       "name": "Kate Connolly",
//       "email": "connka87@gmail.com",
//       "location": "Calgary",
//       "intrests": {
//           "intrest 1": "Hiking", 
//           "intrest 2": "Programming", 
//           "intrest 3": "Dogs"
//       }
//   }
// }


function createUserElement(userData) {
  console.log("User Data: ", userData);
  let $user = `<a class="name" name ="name">${userData.name}</a>
  <a class="email" name="email">${userData.email}</a>
  <a class="location" name="location">${userData.location}</ar>   
  <a class="intrests" name="intrests">${JSON.stringify(userData.intrests_id)}</a>` 

  return $user
}

function renderUsers(users) {
  users.forEach(user => {
    let html = createUserElement(user);
      $("#user-profile").append(html);
  })
}

//Load Users
function loadUsers(callback) {
  $.ajax({
      method: 'GET',
      url: '/api/users/:id/', 
      success: users => {
        console.log('were back', users)
          callback(users);
      }
  });
}

// Calls on Page Load
$("document").ready(() => {
  loadUsers(renderUsers);

});



// //Render User Data
// $("document").ready(() => {
//   function loadUsers(callback) {
//     $.ajax({
//       method: 'GET',
//       url: '/api/users'
//     }).done(users => {
//       for (user of users) {
//         $('<div>')
//           .text(user.username)
//           .appendTo($('body'));
//       }
//     });
//   }
//   loadUsers(renderUsers);
// });