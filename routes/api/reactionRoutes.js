const router = require('express').Router();
const Reaction = require('../../models/reactions');
const Thought = require('../../models/thoughts');

// GET (FIND) ALL Reactions.
router.get('/', (req, res) => {
    const errMsg = `{ msg: Nothing found! }`;

    Reaction.find({}, (err, result) => {
        if (err) res.status(500).send(err + " " + errMsg);
        res.status(200).json(result);
    });
});


// POST (ADD) one or more reactions.
router.post('/', (req, res) => {

    let body = JSON.stringify(req.body);
    let errMsg = `{ msg: Unable to ADD: ${body} }`;
    let reactions = JSON.parse(body);
    
    // Determine when more than one is being posted.
    if (reactions.length) {
        Reaction.insertMany(reactions)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => res.json(err + " " + errMsg));
    } else {        
        Reaction.create(reactions)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json(err + " " + errMsg));
    }

});


// DELETE - reaction by _id.
router.delete('/:_id', async (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to DELETE: '${id}' }`;

    // Remove any reaction id referrenced in thoughts.
    Thought.find({ reactions: id }, async (req, thoughts) => {
        if (thoughts) {
            for (let thought in thoughts) {
                if (thought && thought.length) {
                    if (thought.reactions) {
                        let index = thought.reactions.indexOf(id);
                        if (index > -1) {
                            thought.reactions.slice(index, 1);
                            thought.reactionCount = thought.reactions.length;
                            Thought.updateOne({ _id: thought._id }, { $set: thought });
                        }
                    }
                }
            }
        }
    });

    // Remove reaction.
    await Reaction.deleteOne({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));    

});

module.exports = router;