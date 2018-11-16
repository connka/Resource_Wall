function createResourseElement(resourseData) {
    let $data = TODO:;
  
    return $data;
  }

  function renderResourse(resourses) {
    resourses.forEach(resourse => {
      $("resourses").append(createResourseElement(resoure));
    });
  }

// Calls on Page Load
$("document").ready(() => {
  function renderResourses(resourses) {
      resourses.forEach(resourseData => {
          $("resourseList").append(createResourseElement(resourseData));
      });
  }

function loadResourses(callback) {
    $.ajax({
      method: 'GET',
      url: '/api/resources'
    }).done(users => {
      for (resourse of resourses) {
        $('<div>')
          .text(resourse)
          .appendTo($('body'));
      }
    });
  }
  loadResourses(renderResourses);
});


//Render User Data

function loadUsers(callback) {
  $.ajax({
    method: 'GET',
    url: '/api/users'
  }).done(users => {
    for (user of users) {
      $('<div>')
        .text(user.username)
        .appendTo($('body'));
    }
  });
}
loadUsers(renderUsers);
});