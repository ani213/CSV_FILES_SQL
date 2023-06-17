const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'COMPANY',

});
module.exports = con

// con.connect((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Connected");
//     }
// })
