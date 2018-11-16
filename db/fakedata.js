const userData = {
    "user": {
        "id": "1",
        "username": "@JSmith",
        "name": "Joe Smith",
        "email": "joesmith@gmail.com",
        "location": "Boston",
        "intrests": {
            "intrest 1": "Hiking", 
            "intrest 2": "Programming", 
            "intrest 3": "Drawing"
        },
    },

    "user": {
        "id": "2",
        "username": "@KatCon",
        "name": "Kate Connolly",
        "email": "connka87@gmail.com",
        "location": "Calgary",
        "intrests": {
            "intrest 1": "Hiking", 
            "intrest 2": "Programming", 
            "intrest 3": "Dogs"
        }
    }
}


function createUserElement(userData) {
    console.log("User Data: ", userData);
    let $user = `<a class="name" name ="name">${userData.user.name}</a>
    <a class="username" name="username">${userData.user.username}</a>
    <a class="email" name="email">${userData.user.email}</a>
    <a class="location" name="location">${userData.user.location}</ar>   
    <a class="intrests" name="intrests">${JSON.stringify(userData.user.intrests)}</a>` 

    return $user
}
//console.log(createUserElement(userData));

function renderUsers(users) {
    users.forEach(user => {
        $("#user-profile").append(createUserElement(user));
    })
}

// Calls on Page Load
$("document").ready(() => {
    function renderUsers(users) {
        users.forEach(userData => {
            $("user-profile").append(createUserElement(user));
        });
    }

//Load Users
    function loadUsers(callback)
        $.ajax({
            method: 'GET',
            url: '/api/users', 
            success: users => {
                callbacks(users);
            }
        });
    loadUsers(renderUsers);
});
