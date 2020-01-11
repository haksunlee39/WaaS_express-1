const express = require('express');
const fs = require('fs-extra');
const router = express.Router();

const postsPath = './posts.json'
router.post('/', (req, res) => {
  let posts = [];
  if (fs.pathExistsSync(postsPath)) {
    posts = fs.readJSONSync(postsPath);
  }
  
  const id = new Date().getTime().toString();

  fs.writeJSONSync(postsPath, [...posts, {id: id, title: /**/'', content: /**/''}]);
  
  res.status(200).json({success: true});
});
router.get('/', (req, res) => {
  let value = [];
  // posts.json 값 읽어서 전달
  if (fs.pathExistsSync(postsPath)) {
    value = fs.readJSONSync(postsPath);
  }
  // 200 {success: true, posts: ~~}
  res.status(200).json({success: true, posts: value})
})
router.delete('/:id', (req, res) => {
  console.log(req.cookies);  //cookies 읽어보려고 함!
  if(req.cookies.auth === 'admin'){  //만약 auth 쿠기가 admin 이라면 들어오기
    let posts = [];
    if (fs.pathExistsSync(postsPath)) {
      posts = fs.readJSONSync(postsPath); //json 파일 읽어오기
    }
    let index = posts.findIndex((value)=> value.id === req.params.id); //그 id 를 가진 값의 index 가져오기
    if(index >= 0) { //못찾았느면 index는 -1 즉 찾았으면 지우기!
      posts.splice(index,1);
      fs.writeJsonSync(postsPath, [...posts]);
    }
    res.status(200).json({success: true});
  } else {
    res.status(403).json({success: false});
  }
  // cookies에 auth 키에 admin이라는 value가 있을 경우
      // posts.json에서 id가 일치하는 부분 삭제하고 저장 & 200 {success: true} 보내기
  // 없을 경우
      // 403 {success: false} 보내기
})

module.exports = router;
