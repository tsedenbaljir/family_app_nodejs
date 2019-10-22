const express = require("express"); //Server_Catch
//////////firebase_Start///////////
// var admin = require("firebase-admin");
 //firebase_DataBase
// var serviceAccount = require("./logindemo-feab5.json");
//firebase_Admin_Accept
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://logindemo-feab5.firebaseio.com"
// }); 
// var ref = admin.database().ref('Login-Users');

//////////firebase_End///////////

//////////MYSQL_Start///////////
const mysql = require("mysql");
const app = express();
const SELECT_ALL_DATA_QUERY = "SELECT * FROM `login`";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  Password: "",
  database: "mydb"
});
//////////MYSQL_End///////////

connection.connect(err => {
  if (err) {
    return err;
  } else {
  }
}); 

app.get("/", (req, res) => {
  res.send("hello world");
});
/////shineer bvrtgel vvsgex xereglegchin xeseg//////

app.get("/users/signup", (req, res) => {
  const { FirstName,LastName,Email,Password } = req.query;
  const INSERT_DATA_QUERY = `INSERT INTO login (FirstName, LastName, Email, Password) VALUES ("${FirstName}","${LastName}","${Email}","${Password}")`;
  connection.query(INSERT_DATA_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(`successfully login :${FirstName}`);
    }
  });
});

/////newterch orox xereglegchin xeseg//////

app.get("/users/login", (req, res) => {
  const { FirstName,Password } = req.query;
  const INSERT_DATA_QUERY = `SELECT * FROM login where FirstName='${FirstName}' and Password='${Password}'`;
  connection.query(INSERT_DATA_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
      } else {
        if(result != 0){
      return res.json({
        data: true
      });
      }else{
        return res.json({
          data: false
        });
      }
    }
    });
});
/////firebased мэдээлэл оруулах//////
// app.get("/firebase/Note", (req, res) => {
//   const { Note,LastName,Password } = req.query;
//   var msg = ref.child('Family_App_Users');
//   msg.push({  
//     text:`${Note}`
//   });
//   res.send("Амжилттай");

//   });
  /////firebased мэдээлэл авах//////
// app.post("/firebase/users", (req, res) => {
//   ref.once('Family_App_Users',function(snapshot){
//       if(snapshot.val()==null){
//         res.json({'text':snapshot.val()})

//       }else{
//         res.json({'Family_App_Users':snapshot.val()})
//       }
//   });
//   });
/////xereglegchiig xarax xeseg//////

app.get("/users", (req, res) => {
	connection.query(SELECT_ALL_DATA_QUERY, (err, result) => {
	  if (err) {
		return res.send(err);
	  } else {
		return res.json({
		  data: result
		});
	  }
	});
  });
  /////xereglegchiig xarax xeseg//////

  app.get("/users/select", (req, res) => {
    const { FirstName,LastName,Email,Password } = req.query;
    const INSERT_DATA_QUERY = `SELECT * FROM login where FirstName='${FirstName}' and Password='${Password}'`;
    connection.query(INSERT_DATA_QUERY, (err, result) => {
      if (err) {
        return res.send(err);
        } else {
          if(result != 0){
        return res.json({
          data: result
        });
        }else{
          return res.json({
            data: false
          });
        }
      }
    });
  });
app.listen(3000, () => {
  console.log("Servers listening on port 3000");
});
