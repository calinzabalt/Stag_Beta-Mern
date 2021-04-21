const router = require('express').Router();
let Member = require("../models/familymember.model");
const auth = require("../middleware/auth");

/*router.route('/').get((req, res) => {
    Familymember.find()
        .then(familymembers => res.json(familymembers))
        .catch(err => res.status(400).json('Error: ' + err));
});*/

router.get("/", auth, async (req, res) => {
    const members = await Member.find({ userId: req.user });
    res.json(members)
});

/*router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newFamilymember = new Familymember({username});

    newFamilymember.save()
        .then(() => res.json('Family member added'))
        .catch(err => res.status(400).json('Error ' + err));
})*/

router.post('/add', auth, async (req, res) => {
    try{
        const username = req.body.username;
        
        const newMember = new Member({
            username,
            userId: req.user,
        });

        const savedMember = await newMember.save();
        res.json(savedMember);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;