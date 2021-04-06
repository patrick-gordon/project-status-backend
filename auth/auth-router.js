const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

const User = require('../users/user-model');


//register endpoint
router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); //hash password  2 ^ n
    user.password = hash;

    User.add(user)
    .then((saved) => {
        const token = generatedToken(saved);
        res.status(201).json({
            user: saved,
            token
        });
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  User.findBy({ username })
    .first()
    .then((user) => {
        if(user && bcrypt.compareSync(password, user.password)){
            // generate JWT
            const token = generateToken(user)
            res.status(200).json({
                message: `welcome ${user.username}!`,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials '});
        }
    })
    .cath((err) => {
        res.status(500).json(err)
    });
});

function generateToken(user){
    const payload = {
        sub: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router