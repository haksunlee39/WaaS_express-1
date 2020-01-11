const express = require('express');
const router = express.Router();
const postRouter = require('./post');

router.get('/', function(req, res, next) {
  res.status(200).send('hello');
  next();
});

router.use('/posts', postRouter);
router.use('/err', (req, res, next) => {
  next('error occurs!');
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({success: false});
})

module.exports = router;
