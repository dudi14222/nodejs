const express = require('express')
    , router = express.Router()
    , Quiz = require('../models/quiz')

router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.all();
        res.json(quizzes);
    }
    catch (error) {
        return res.json({ok: false});
    }
    // Quiz.all()
    //     .then(quizzes => res.json(quizzes))
    //     .catch(err => res.json({ ok: false }))
})

router.get('/:id', function (req, res) {
    res.json({ ok: true, id: req.params.id });
})

module.exports = router