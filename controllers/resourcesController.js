const db = require('../server/urlDB');
const helpers = require('../helpers/functions');

/**
 * 
 * @param {req} req 
 * @param {res} res 
 * If session exists render resources
 * If session does not exist redirect to loginErr
 */
exports.render_resources = (req, res) => {
    if (this.testVar) {
      res.render('reources', {db: db[cookie], cookie: cookie})
    } else if (session) {
    res.render('resources', {db: db[session], cookie: session});
    } else {
      res.redirect('/loginErr')
    }
  };
  /**
   * 
   * @param {req} req 
   * @param {res} res 
   * If session does not exist redirect to loginErr
   * If resource does not exist send Err
   * If All params are good render the Update page
   */
  exports.render_id = (req, res) => {
    dbInner = //TODO: 
    console.log(session)
    if (this.testVar) {
      res.render('show', {val: req.params.id, longVal: db['cookie']['cookie1'], cookie: cookie});
    } else if (!session) {
      res.redirect('/loginErr')
    } else if (!dbInner[req.params.id]) {
      res.send('Error, resource does not exist')
    } else {
      res.render('show', {val: req.params.id, longVal: db[session][req.params.id], cookie: session});
    }
  }
  /**
   * 
   * @param {req} req 
   * @param {res} res
   * If session exists render new URL page
   * If session does not exist redirect to resources
   */
exports.render_new = (req, res) => {
    if (this.testVar) {
        res.render('new', {cookie: cookie});
    } else if (objCheck(session) === 'goodCookie') {
        res.render('new', {cookie: session});
    } else {
        res.redirect('/resources');
    }
};
  /**
   * 
   * @param {req} req 
   * @param {res} res
   * If session exists add new resource to DB and redirect to resource page
   * If session does not exist redir to loginErr 
   */
exports.post_new = (req, res) => {
    if (session) {
    rString = genRang();
    db[session] = {...db[session], [rString]: resource};
    res.redirect(`/resource`);
    } else {
    res.redirect('/loginErr')
    }
};
  /**
   * 
   * @param {req} req 
   * @param {res} res
   * If Url exists and is owned by session update it
   * If no session redirect to Err 
   */
  exports.post_update = (req, res) => {
    if (db[session] && req.params.id === Object.keys(db[session])[0]) {
    shortUrl = req.params.id;
    longUrl = req.body.longURL;
    db[session][shortUrl] = longUrl;
    res.redirect('/resources');
    } else {
      res.redirect('/loginErr')
    }
  };