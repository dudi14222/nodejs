const express = require('express')
    , router = express.Router()
    , Quiz = require('../models/quiz')

router.get('/', function (req, res) {
    Quiz.all((err, data) => {
        if (err) {
            res.json({ ok: false });
        }
        else {
            res.json(data);
        }
    })
})

router.get('/:id', function (req, res) {
    res.json({ ok: true, id: req.params.id });
})

module.exports = router