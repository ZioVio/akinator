const { Aki } = require("aki-api");

const router = require("express").Router();

let aki = new Aki({ region: 'ru', childMode: false, proxy: undefined })

router.post('/start', async (req, res) => {
    await aki.start();
    res.json({ question: aki.question, answers: aki.answers })
});

router.post('/answer', async (req, res) => {
    // todo: implement
});

module.exports = { router };
