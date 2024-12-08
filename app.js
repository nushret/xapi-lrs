const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const basicAuth = require('basic-auth');

// Initialize express
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Logging middleware
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: req.body
    });
    next();
});

// Basic Auth middleware
const auth = async (req, res, next) => {
    const credentials = basicAuth(req);
    if (!credentials || credentials.name !== process.env.LRS_USERNAME || credentials.pass !== process.env.LRS_PASSWORD) {
        res.setHeader('WWW-Authenticate', 'Basic realm="xAPI LRS"');
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// MongoDB connection
mongoose.connect('mongodb://localhost/xapi-lrs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// xAPI Statement schema
const statementSchema = new mongoose.Schema({
    actor: Object,
    verb: Object,
    object: Object,
    result: Object,
    context: Object,
    timestamp: Date,
    stored: Date,
    authority: Object
}, { strict: false });

const Statement = mongoose.model('Statement', statementSchema);

// Static files middleware
app.use(express.static('public'));

// Statement handler function
async function handleStatement(req, res) {
    try {
        console.log('Received statement:', JSON.stringify(req.body));
        let statements = Array.isArray(req.body) ? req.body : [req.body];
        const savedStatements = await Statement.insertMany(statements);
        res.status(200).json(savedStatements.map(s => s._id));
    } catch (error) {
        console.error('Error saving statement:', error);
        res.status(400).json({ error: error.message });
    }
}

// TinCan API endpoints
app.get('/TCAPI/about', auth, (req, res) => {
    res.json({
        version: ["1.0.0"],
        extensions: {
            "multipleStatements": true,
            "oauth": false
        }
    });
});

// Handle both PUT and POST for statements
app.route('/TCAPI/statements')
    .post(auth, handleStatement)
    .put(auth, handleStatement);

app.get('/TCAPI/statements', auth, async (req, res) => {
    try {
        const statements = await Statement.find({}).sort({timestamp: -1}).limit(100);
        res.status(200).json({
            statements: statements,
            more: ""
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
