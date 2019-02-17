const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const app = express();
app.set('port', (process.env.PORT || 3001));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Express only serves static assets in production
console.log("NODE_ENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    // Return the main index.html, so react-router render the route in the client
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('client/build', 'index.html'));
    });
}

const host = "localhost"
const user = "root"
const pswd = ""
const dbname = "trade_inventory"

// config db ====================================
const pool = mysql.createPool({
    host: host,
    user: user,
    password: pswd,
    port: "3306",
    database: dbname
});

const COLUMNS = [
    'stock_date',
    'taka_no',
    'meter',
    'taka_type',
    'd_no',
    'color',
    'cat',
    'p_o_no',
    'weight'
];

app.get('/api/stocks', (req, res) => {

    /*const firstName = req.query.firstName;

    if (!firstName) {
        res.json({
            error: 'Missing required parameters',
        });
        return;
    }

    let queryString = ``;
    if (firstName == "*") {
        queryString = `SELECT * from stock_master`
    } else {
        queryString = `SELECT * from stock_master WHERE first_name REGEXP '^${firstName}'`
    }*/

    queryString = `SELECT * from stock_master`
    pool.query(queryString,
        function (err, rows, fields) {
            if (err) throw err;

            if (rows.length > 0) {
                res.json(
                    rows.map((entry) => {
                        const e = {};
                        COLUMNS.forEach((c) => {
                            e[c] = entry[c];
                        });
                        return e;
                    })
                );
            } else {
                res.json([]);
            }
        });

});

app.post('/api/addstocks', (req, res) => {
    console.log('--'+ req.body);
    let queryString = `INSERT INTO stock_master VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9])`;
    pool.query("INSERT INTO stock_master set ?", req,
        function (err, rows, fields) {
            console.log("err" + err);
            console.log("rows" + rows);
            console.log("fields" + fields);
            /*if (err) throw err;

            if (rows.length > 0) {
                res.json(
                    rows.map((entry) => {
                        const e = {};
                        COLUMNS.forEach((c) => {
                            e[c] = entry[c];
                        });
                        return e;
                    })
                );
            } else {
                res.json([]);
            }*/
        });

});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
