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