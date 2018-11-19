const findPostAge = resourse => {
  const { updated_at } = resourse;
  const now = new Date().getTime();
  let postAge = now - updated_at.getTime();
  let sufix = '';
  // add the time stamp with correct sufix;
  switch (true) {
    case postAge >= 31557600000:
      sufix += 'year ago';
      postAge = Math.floor(postAge / 31557600000);
      break;
    case postAge >= 86400000:
      sufix += 'days ago';
      postAge = Math.floor(postAge / 86400000);
      break;
    case postAge >= 3600000:
      sufix += 'hours ago';
      postAge = Math.floor(postAge / 3600000);
      break;
    case postAge >= 60000:
      sufix += 'minutes ago';
      postAge = Math.floor(postAge / 60000);
      break;
    default:
      sufix += 'seconds ago';
      break;
  }

  return `${postAge} ${sufix}`;
};

module.exports.postTime = findPostAge;
