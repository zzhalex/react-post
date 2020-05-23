var express = require('express');
var router = express.Router();
var pool = require('../db.js')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

const getPersonList = () => {
  return new Promise((resolve, reject) => {
    pool
      .connect()
      .then(client => {
        return client
          .query('SELECT * FROM person order by personid desc')
          .then(res => {
            console.log(res.rows)
            client.release()
            resolve(res.rows)
          })
          .catch(err => {
            client.release()
            reject(err.stack)
          })
      })
  })
}

const addPerson = (data) => {
  let sqlQuery = "INSERT INTO Person (lastname, firstname, address, city) VALUES ('"+data.lastname+"', '"+data.firstname+"', '"+data.address+"', '"+data.city+"')"
  console.log(sqlQuery)
  return new Promise((resolve, reject) => {
    pool
      .connect()
      .then(client => {
        return client
          .query(sqlQuery)
          .then(res => {
            console.log(res.rows[0])
            client.release()
            resolve({"done":true})
          })
          .catch(err => {
            client.release()
            reject(err.stack)
          })
      })
  })
}

const deletePerson = (id) => {
  let sqlQuery = "delete from Person where personid ='"+ id +"'"
  return new Promise((resolve,reject)=>{
    pool
    .connect()
    .then(client => {
      return client
        .query(sqlQuery)
        .then(res => {
          console.log(res.rows[0])
          client.release()
          resolve({"done":true})
        })
        .catch(err => {
          client.release()
          reject(err.stack)
        })
    })
  })
}

router.post('/add',function(req,res,next){
  console.log(req)
  addPerson(req.body).then((val)=>{
    console.log(val)
    res.send(val)
  })

})

router.get('/person', function(req,res,next){
  getPersonList().then((val) =>{
    res.send(val)
  })
})

router.delete('/removeperson',function(req,res,next){
  deletePerson(req.body.id).then((val)=>{
    console.log("delete",val)
    res.send(val)
  })
})

module.exports = router;