const express = require('express')
const router = express.Router()
const {checkSSL} = require('../controllers/sslController')

router.post('/check-ssl',checkSSL)

module.exports = router