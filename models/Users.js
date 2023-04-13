// Define mongoose for schema creation.
const mongoose = require('mongoose');
const Thought = require('./thoughts');
const ObjectId = mongoose.Types.ObjectId;
const userModelName = 'User';
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

console.log('Before schema setup (Users)');

// Build User Schema.
const userSchema = new mongoose.Schema({
  username:     { type: String, unique: true, required: true, trim: true},
  email:        { type: String, required: true, unique: true, match: emailRegex},  
  thoughts:     [{type: ObjectId, ref: Thought.modelName, populate: true}],
  friends:      [{type: ObjectId, ref: userModelName, populate: true}],
  friendCount:  { type: Number, default: 0 },
},{
  toObject: { 
    transform: function (doc, ret) {
      delete ret._id;
    }
  },
  toJSON:       { virtuals: true }
});

// Uses mongoose.model() to create model.
const User = mongoose.model(userModelName, userSchema);

console.log('After schema setup (Users)');

// Error handler for seeding data.
const handleError = (err) => console.error(err);
const users = 
[
  { username: 'Brian Zoulko',   email: 'bzoulko@gmail.com' },
  { username: 'Johnny B. Good', email: 'jbg@gmail.com' },
  { username: 'Her She Bar',    email: 'hsb@gmail.com' },
  { username: 'Heath Bar',      email: 'hb@gmail.com' },
  { username: 'Butter Finger',  email: 'bf@gmail.com' },
  { username: 'Snikers',        email: 'sn@gmail.com' },
  { username: 'Steven Blomberg',email: 'sblomberg@gmail.com' }
];

// Only add the seeds if the collection is empty.
User.find({}).exec(async (err, collection) => {

  if (collection.length === 0) {
    // Create JSON entry w/seeds.
    User.create(users, 
      async function (err) {
        return(err ? handleError(err) : console.log('Created new User (Seeds) document'))
      }
    );        
  }
});


module.exports = User;
