
var MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/clear';
MongoClient.connect(url, (err, db) => {
  if(!err) {
    console.log("We are connected");
  }
  const Users = db.collection('practiceusers');
  const user = {username: 'vanessap@city-furniture.com', password: 'notencrypted', first: 'Vanessa', last: 'Plugues'};
  Users.insert(user, {w:1}, (error, result) => {
    console.log(error);
    console.log(result);
    db.close();
  });
});