const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
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
  
  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({error: ''})
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;

      res.json({ token });
    });
    

  } catch (ex) {
    console.log(ex);
    res.status(500).send('Server error');
  }


});

module.exports = router;
