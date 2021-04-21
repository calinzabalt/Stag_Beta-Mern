const router = require('express').Router();
let Target = require('../models/target.model');
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    const targets = await Target.find({ userId: req.user });
    res.json(targets)
});
 
router.post('/add', auth, async (req, res) => {
    try{
        const username = req.body.username;
        const description = req.body.description;
        const priority = req.body.priority;
        const duration = Number(req.body.duration);
        const date = Date.parse(req.body.date);

        const newTarget = new Target({
            username,
            description, 
            priority,
            duration,
            date,
            userId: req.user,
        });

        const savedTarget = await newTarget.save();
        res.json(savedTarget);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
});

router.route('/:id', auth).get((req, res) => {
    Target.findById(req.params.id)
        .then(target => res.json(target))
        .catch(err => res.status(400).json('Error ' + err));
})

router.route('/:id', auth).delete((req, res) => {
    Target.findByIdAndDelete(req.params.id)
        .then(() => res.json("Target Deleted"))
        .catch(err => res.status(400).json('Error ' + err));
})

router.route('/update/:id').post((req, res) => {
    Target.findById(req.params.id)
        .then(target => {
            target.username = req.body.username;
            target.description = req.body.description;
            target.priority = req.body.priority;
            target.duration = Number(req.body.duration);
            target.date = Date.parse(req.body.date);

            target.save()
                .then(() => res.json('Target updated'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;
