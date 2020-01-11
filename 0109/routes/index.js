const express = require('express');
const router = express.Router();
const postRouter = require('./post');

router.get('/', function(req, res, next) {
  res.status(200).send('hello');
});

router.use('/posts', postRouter);
router.use('/err', (req, res, next) => {
  next('error occurs!');
});

//await가 적용되는 함수!
const foo1 = (num, sec) => {
  return new Promise((resolve, reject) => {
    setTimeout( ()=> {
      console.log(num);
      resolve('Promise!!');
    }, sec);
  })
}

//promise를 return 하지 않아서 await 가 적용되지 않는 함수!
const foo2 = (num, sec) => {
  setTimeout( ()=> {
    console.log(num);
  }, sec);
}

async function test1(){
  await foo1('a', 5000);
  await foo1('b', 3000);
  await foo1('c', 1000);
};

async function test2(){
  await foo2('a', 5000);
  await foo2('b', 3000);
  await foo2('c', 1000);
};

router.get('/async', async function(req, res, next) {
  try {
    test1();
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({msg: 'error occur!'});
});

module.exports = router;
