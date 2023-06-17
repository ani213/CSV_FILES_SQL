const path = require('path')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



module.exports.randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.downloadCsv = (res, data) => {
    const csvWriter = createCsvWriter({
        path: 'csvfiles/data.csv',
        header: [
            { id: 'FIRST_NAME', title: 'FIRST_NAME' },
            { id: 'LAST_NAME', title: 'LAST_NAME' },
            { id: 'PHONE_NUMBER', title: 'PHONE_NUMBER' },
            { id: 'HIRE_DATE', title: 'HIRE_DATE' },
            { id: 'SALARY', title: 'SALARY' },
            { id: 'department_id', title: 'department_id' },
            { id: 'joprofile_id', title: 'joprofile_id' },

        ]
    });
    csvWriter
        .writeRecords(data)
        .then(() => {
            // Stream the file as the response
            // res.send(data)
            res.download(path.normalize(__dirname + '/csvfiles/' + 'data.csv'));

            // res.sendFile('data.csv', { root: path.normalize(__dirname + '/csvfiles/' + 'data.csv') });
        })
        .catch(err => {
            console.error('Error writing CSV:', err);
            res.status(500).send('Internal Server Error');
        });
}