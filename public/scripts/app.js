// app.use(express.static('./styles/css'));

//Render Users
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

  //Comment Button Toggle:
$(".comment_toggle").on("click", () => {
  $(".comment_dropdown").slideToggle();
  });

  // //Like Button Toggle:
  // $(".likebtn").on("click", function(event) {
  //   event.preventDefault();
  //         $.ajax({
  //           url: "<%= user_id%>/resourses/<%= allResources[resource].resourse_id%>/like%>",
  //           method: "POST",
  //           data: $(this).serialize(),
  //           success: like => {
  //               $(".comment_dropdown").prepend();
  //           }
  //       });
  //   }
});
