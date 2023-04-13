const router = require('express').Router();
const User = require('../../models/users');
const Thought = require('../../models/thoughts');
const Reaction = require('../../models/reactions');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


// GET (FIND) ALL Thoughts.
router.get('/', (req, res) => {
    const errMsg = `{ msg: Nothing found! }`;

    Thought.find({}, (err, result) => {
        if (err) res.status(500).send(err + " " + errMsg);
        res.status(200).json(result);
    });
});


// GET (FIND) a single user.
router.get('/:_id', (req, res) => {
    const id = req.params._id;
    const errMsg = `{ msg: '${id}' - Not found! }`;

    if (id.length == 12 || id.length == 24) {
        Thought.findOne({_id: id }, function(err, user) {
            if (err) res.status(500).json(err + " " + errMsg);            
            res.status(200).json(user);
        });
    } else {
        res.json(errMsg);
    }
});


// POST (ADD) one or more thoughts.
router.post('/', (req, res) => {

    let body = JSON.stringify(req.body);
    let errMsg = `{ msg: Unable to ADD: ${body} }`;
    let thoughts = req.body;
    
    // Determine when more than one is being posted.    
    if (thoughts.length) {
        Thought.insertMany(thoughts)
            .then((result) => {
                UpdateAllUsersThoughts(thoughts);
                res.send(result);
            })
            .catch((err) => res.json(err + " " + errMsg));
    } else {        
        Thought.create(thoughts)
            .then((result) => {
                UpdateAUsersThought(thoughts);
                res.json(result)
            })
            .catch((err) => res.json(err + " " + errMsg));
    }

});


// POST (UPDATE) a reaction in a thought.
router.post('/:thoughtId/reactions', (req, res) => {

    // Define input variables from POST.
    let thoughtId = req.params.thoughtId;
    let reactions = req.body;
    let errMsg = `{ msg: Unable to UPDATE: Thought - ${thoughtId}  w/Reactions - ${JSON.stringify(reactions)} }`;

    // Determine when more than one is being posted.
    if (reactions.length) {
        Reaction.insertMany(reactions)
            .then((result) => {
                UpdateThoughtReactions(thoughtId, result);
                res.send(result);
            })
            .catch((err) => res.json(err + " " + errMsg));
    } else {        
        Reaction.create(reactions)
            .then((result) => {
                UpdateThoughtReactions(thoughtId, result);
                res.json(result)
            })
            .catch((err) => res.json(err + " " + errMsg));
    }

});


/**
 * Update associated thought with reaction id(s).
 * @param {*} thoughtId 
 * @param {*} reactions 
 */
async function UpdateThoughtReactions(thoughtId, reactions) {

    let reactionList = [...reactions];
    for (let reaction in reactionList) {
        
        Thought.findOne({ _id: thoughtId }, async function (err, thought) {

            if (thought) {
                // Check for errors, if none, append to parent.
                if (err) res.json(err + " " + errMsg);

                // Determine when more than one is being posted.
                thought.reactions.push(new ObjectId(reaction._id))
                thought.reactionCount = thought.reactions.length;

                // Update thought with new a reaction.
                await Thought.updateOne({ _id: thoughtId }, { $set: thought });
            }

        });
    }
}


// PUT (UPDATE) thought by its _id.
router.put('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to UPDATE: '${id}' }`;

    Thought.updateOne({ _id: id }, { $set: req.body } )
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
});


// DELETE - thought by _id.
router.delete('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to DELETE: '${id}' }`;

    Thought.deleteOne({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
    
    let users = User.find({ thoughts: id });
    if (users) {
        for (let user in users) {
            let index = user.thoughts.indexOf(id);
            if (index > -1) {
                user.thoughts.slice(index, 1);
                UpdateAllUsersThoughts(user.thoughts);
            }
        }
    }

});


/**
 * Update all associated users thoughts.
 * @param {thoughts}  
 */
async function UpdateAllUsersThoughts(thoughts) {
    // Update all thoughts to all associated users.
    for (let thought in thoughts) {
        await UpdateAUsersThought(thought);
    }
}


/**
 * Update an associated users thought.
 * @param {thought}  
 */
async function UpdateAUsersThought(thought) {
    let userId = thought.userId;

    // Make sure input Id's meet the required length and locate the user.
    User.findOne({_id: userId }, function(err, user) {

        // Check for errors, if none, append to parent.
        if (err) res.json(err + " " + errMsg);            

        // Update user with new a thought.
        User.updateOne({ _id: userId }, { $set: user } )
            .catch((err) => res.json(err + " " + errMsg));

    });

}


/**
 * GET Id.
 * @param {} Table 
 * @param {} Id 
 * @returns 
 */
const getId = function (Table, Id) {

    Table.findOne({_id: Id}, (err, detail) => {        
        if (err) return("[{" + JSON.stringify(err) + "}]");
        return (detail._id)
    });

    return ("");
}           


module.exports = router;