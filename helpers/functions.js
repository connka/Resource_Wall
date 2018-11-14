module.exports = {

/*Functions:
    - Math.random (cookies) * DONE *
    - Rating average * DONE *
    - Filter results
    - Form requirements
*/
}

// Random Number Generatior
function randomNum() {
    return Math.random().toString(36).substring(7)
}

// Average for Ratings
function avRat(rating) {
    var avR = 0, i;
    for (i = 0; i < rating.length; i += 1) {
        avR += rating[i];
    }
    return avR / rating.length;
}

