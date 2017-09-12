// const mongoClient = require('mongodb').MongoClient;
//
// mongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//
//   if(err) {
//     console.log('Unable to connect to mongodb');
//     return;
//   }
//
//   console.log('Connected successfully to mongodb');
//
//   db.collection('myCollection').insertOne(
//     {
//       text: 'something to do',
//       completed: false
//     }, (err, result) => {
//       if(err) {
//         console.log('Unable to insert todo', err);
//       }
//       console.log(JSON.stringify(result.ops, undefined, 2));
//     }
//     );
//
//   db.close();
//
// });
//

const url = 'mongodb://localhost:27017/test';


let crypto = require('crypto');
const algorithm = 'aes256';
const key = 'asaadsaad';

const express = require('Express');
let app = express();

app.get('/secrete', function (req, res) {

  let db = require('mongoskin').db(url);
  db.collection('myMessage').findOne(function (err, result) {
    if(err){
      res.send("Unable to connect to MongoDB");
    }

    let message = decrypt(result.message);
    db.close();
    res.send(message);
  })
});

app.listen(8081);




function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,key)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}



