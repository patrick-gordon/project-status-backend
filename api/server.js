const express = require("express")
const cors = require('cors')
const helmet = require('helmet')


const authRouter = require('../auth/auth-router');
const userRouter = require('../users/user-router')
const server = express();

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter);
server.use('/api/user', userRouter);



server.get('/', (req, res) => {
    res.send(`server running`)
})

module.exports = server