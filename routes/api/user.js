const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/User');

/**
 * @route GET api/users
 */
router.get('/', (req, res) => {
  res.send('User Route');
});

/**
 * @route POSt api/user
 * 
 * Register the user
 */
router.post('/', async (req, res) => {
  
  const { firstName, lastName, email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const _password = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email,
      password: _password
    });

    await user.save();


    res.send('User Registered');
  } catch (ex) {
    console.log(ex);
    res.status(500).send('Server error');
  }


});

module.exports = router;
