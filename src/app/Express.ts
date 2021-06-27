import express from "express"
var cors = require('cors')


const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

export { app }

// Số finbonaci 
// 1 1 2 3 5 8 13
// finc(n) = finc(n-1) + finc(n-2)

function finc(n) {
    if (n < 0) return -1;
    if (n == 0 || n == 1) return 1;
    return finc(n - 1) + finc(n - 2)
}

console.log(finc(6));
