const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 8080
const con = require('./config/connection');
const { randomInteger, downloadCsv } = require('./helper');
const path = require('path')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use()

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;



app.use(fileUpload({
    useTempFiles: true
}))

app.get("/", (req, res) => {
    res.send({ message: "Working Fine" })
})

app.post("/file", async (req, res) => {
    let errorsData = []
    try {
        if (req.files && req.files.file) {
            // console.log(req.files.file);
            con.connect((err) => {
                if (err) throw err;

                fs.createReadStream(req.files.file.tempFilePath)
                    .pipe(csv())
                    .on('data', (data) => {

                        const { FIRST_NAME, LAST_NAME,
                            PHONE_NUMBER, HIRE_DATE,
                            SALARY
                        } = data;
                        let job_id = randomInteger(1, 6);
                        let dep_id = randomInteger(1, 4)
                        let sql = `insert into EMPLOYEE (firstName,lastName,phone,hireDate,salary,jobprofile_id,department_id)
                     values ('${FIRST_NAME}','${LAST_NAME}','${PHONE_NUMBER}','${HIRE_DATE}','${Number(SALARY)}','${job_id}','${dep_id}');`
                        con.query(sql, (err, result) => {
                            // console.log(err, data);
                            if (err) {
                                errorsData.push({ FIRST_NAME, LAST_NAME, PHONE_NUMBER, HIRE_DATE, SALARY, joprofile_id: job_id, department_id: dep_id })
                            }
                        });

                    })
                    .on('end', () => {
                        downloadCsv(res, errorsData)

                    });
            })

        } else {
            res.send({ message: "Please select csv file" })
        }
    } catch (err) {
        res.send({ message: err.message })
    }
})

app.listen(PORT, console.log(`server start:#${PORT}`));
