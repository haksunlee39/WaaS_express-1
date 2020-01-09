# WaaS Express 2

## I. 과제 설명
* 과제는 매일 하나씩 나갈 예정이고 미리 올릴 수도 있습니다.
* 과제별로 각각 폴더를 만들어 뼈대 코드를 제공할 예정이니 필요하면 가져다 사용하시면 됩니다.
* 간략한 설명과 공부할 소스를 제공하는 형태로 진행하겠지만 이해가 안되면 언제든지 질문해주세요.
* 제출은 깃 원격 레포지터리를 만들어서 링크를 저에게 공유해주시면 됩니다.
* 검사는 일요일 1/12 오전에 할 예정이니 그 전에만 제출해주시면 됩니다.

## II. 과제
#
### 01/08
참조  
https://expressjs.com/ko/guide/writing-middleware.html  
https://expressjs.com/ko/guide/using-middleware.html  
https://expressjs.com/ko/guide/error-handling.html
### 1. 미들웨어
- 미들웨어의 역할은 req, res를 받아서 원하는 행동을 한 후에 다음 미들웨어 함수 혹은 라우팅 함수에 넘겨주는 것입니다. 직접 response를 보낼 수도 있지만 이 경우에는 다음 미들웨어 함수 혹은 라우팅 함수는 실행되지 않습니다.
- 미들웨어 함수는 라우팅 함수에 next라는 인자가 추가된 형태를 가집니다.
```js
const myMiddleware = (req, res, next) => {
  if (!req.query.a) {
    res.status(400).json({msg: 'wrong parameter'});
  } else if (~~~) {
    next(); // next를 호출하면 다음 미들웨어 혹은 라우팅 함수가 이어 실행됩니다.
  }
}
```
이전에 사용한 cookie-parser와 같은 것들이 대표적인 미들웨어입니다.

### 2. 오류 처리 미들웨어
- 오류 처리 미들웨어는 err이라는 인자를 추가적으로 갖는 미들웨어 함수 입니다. express 내부에서 인자가 4개인 함수를 받으면 오류 처리 미들웨어로 인식해 작동합니다.
```js
const myErrorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({msg: 'server error'});
}
```
오류 처리 미들웨어는 이전에 선언된 미들웨어 혹은 라우팅 함수에서 에러가 발생했거나 미들웨어에서 next가 'router'문자열이 아닌 인자와 함께 호출될 경우 실행됩니다.

```js
app = express();
const myMiddleware1 = (req, res, next) => {
  next('err'); // 이 뒤에 선언된 오류 처리 미들웨어를 찾아 실행합니다.
}
const myErrorHandler = (err, req, res, next) => {
  console.log('err occurs!');
}
app.use(myMiddleware1);
app.use(myErrorHandler) // http 요청이 오면 err occurs!출력

/*
app.use(myErrorHandler) // 이 경우 myErrorHandler는 실행되지 않음
app.use(myMiddleware1);
*/
```

### 3. 과제
0. 위의 참조에 있는 링크에 들어가 문서를 읽고 이해한다.
1. XSS를 막기 위한 필터 미들웨어를 만들려고 한다. \<srcipt> 라는 문자열을 POST나 PUT 메소드의 바디로 받으면 status 400과 함께 응답하는 미들웨어를 만들어 적용하고 테스트하여라.  
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  
이후에 작성되어야 req.body를 사용할 수 있습니다.

2. 오류처리 미들웨어를 만들려고 한다. /err로 요청이 갈 경우 에러가 전달되는데 이를 받아 err.stack을 콘솔에 출력하고 응답으로 {success: false}를 보내는 오류 처리 미들웨어를 작성하고 적용하여라.
#
### 01/09
1. 데이터 전달받기
- express에서 요청(request)으로부터 데이터를 전달 받는 방법에 대표적인 4가지가 있습니다.  
- `req.body`: POST나 PUT Method를 사용할때, Request의 바디는 express.json() 이나 express.urlencoded() 미들웨어에 의해 파싱되어 req.body에 들어가게 됩니다.  
- `req.query`: `/abc/qwer?id=123`과 같이 route에 있는 query string parameter을 가집니다. 여기서는 `req.query.id === 123` 입니다. 주로 GET이나 DELETE 메소드를 사용할때 씁니다.
- `req.params`: express에서 라우팅 경로를 설정할 때, 경로에 인자를 설정할 수 있습니다. 예를 들면 `router.get('/users/:userId', ...);`에서는 userId라는 인자가 있습니다. GET /users/1234 라고 요청을 주면 req.params.userId에 1234라는 값이 들어갑니다.
- `req.cookies`: cookie-parser 미들웨어는 HTTP 요청의 cookies를 파싱해 req.cookies에 넣어줍니다.
- [공식 문서](https://expressjs.com/en/4x/api.html#req)에서 관련 내용을 살펴보시길 바랍니다. 더불어 아래에 [response API](https://expressjs.com/en/4x/api.html#res.json) 부분도 함께 살펴보시길 바랍니다.
2. 과제
- [fs-extra](https://www.npmjs.com/package/fs-extra) 모듈 설명 읽어보기
- 0109 스켈레톤 코드에 routes/post.js에 주석 달린 부분 채우기
#
### 01/10
1. async/await
- [참고자료1](https://victorydntmd.tistory.com/87)  
[참고자료2](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

- 비동기 함수를 처리하기 위해 callback 함수를 사용하는 것은 가독성이 떨어지고 오류를 잡기 힘들어집니다. 그래서 promise라는 것이 생겼습니다.
- 하지만 promise 또한 가독성이 썩 좋진 않아 ES8에서는 promise를 대체할 수 있는 async/await이 생겼고 Nodejs에서는 버전 7부터 지원하고 있습니다.
- 다른 좋은 자료가 많으니 참고자료나 다른 자료를 읽어보시고 이해 안되시는 부분은 질문주세요.
2. express에서 async/await 사용
- [참고자료](https://programmingsummaries.tistory.com/399)
- express에서 async 함수를 사용하면 error를 캐치하지 못합니다.
```js
router.get('/sync', function(req, res, next) {
  throw new Error('qwer');
});
router.get('/async', async function(req, res, next) {
  throw new Error('asdf');
});
router.get('/async-with-try-catch', async function(req, res, next) {
  try {
    throw new Error('asdf');
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({msg: 'error occur!'});
});

/**
 * GET /sync => 500 {msg: 'error occur!'}
 * GET /async => 응답이 오지 않음
 * GET /async-with-try-catch => 500 {msg: 'error occur!'}
 * /
```
- 그래서 [try ... catch 구문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/try...catch)을 사용해 직접 next를 실행해 에러를 넘겨주어야 합니다.

2. 과제
- 5초, 3초, 1초 후에 a, b, c를 각각 출력하는 함수를 만들고 async/await을 이용해 5초, 8초, 9초에 a, b, c가 각각 출력하도록 하는 async 함수를 만들어라.
- 만든 async 함수 내에서 가장 아래에 throw new Error('error')를 추가하고 아래 코드를 사용해 테스트 해보아라. 0109의 routes/index.js에 넣어 확인해볼것
```js
router.get('/async', async function(req, res, next) {
  try {
    // await asyncFnYouMake();
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({msg: 'error occur!'});
});

```
#