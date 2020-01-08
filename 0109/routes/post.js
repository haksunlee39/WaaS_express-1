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
  // posts.json 값 읽어서 전달
  // 200 {success: true, posts: ~~}
})
router.delete('/:id', (req, res) => {
  // cookies에 auth 키에 admin이라는 value가 있을 경우
      // posts.json에서 id가 일치하는 부분 삭제하고 저장 & 200 {success: true} 보내기
  // 없을 경우
      // 403 {success: false} 보내기
})

module.exports = router;
