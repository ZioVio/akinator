const { Aki } = require("aki-api");

const router = require("express").Router();

const aki = new Aki({ region: "en", childMode: false, proxy: undefined });

router.get("/start", async (req, res) => {
  await aki.start();
  res.json({ question: aki.question, answers: aki.answers });
});

router.post("/answer", async (req, res) => {
  const { answer } = req.body;
  await aki.step(answer);
  res.json({ question: aki.question, answers: aki.answers });
});

router.get("/win", async (req, res) => {
  try {
    await aki.win();
    res.json({ guesses: aki.answers });
  } catch (err) {
    res.json({ guesses: [] });
  }
});

module.exports = { router };
