const express = require('express');
const router = express.Router();
const email = require('../queues/emailQueue');


router.post('/all', async (req,res) => {
    await email.job(req.body);
    res.status(200).json({message : 'Request Submitted Successfully'});
});

module.exports = router;
