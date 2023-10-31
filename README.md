## React Styled Component 사용법을 정리한 저장소입니다.

[npm - styled component](https://www.npmjs.com/package/styled-components)

<img alt="styled-components" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" height="150px" style="max-width: 100%;">

**Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress 💅**

<br>

React 환경에서 Component 에 스타일을 적용하는데 있어 inline style 을 적용하거나, css 를 import 하여 스타일을 적용하는 방식에는 많은 어려움이 있었다. 이러한 어려움을 최소화하기 위해서 Styled Component 가 등장하였다.

<br>

## 기존 방식의 불편함

### inline 방식

```js
const General_App = () => {
  return (
    <div style={{display: "flex"}}>
        <div style={{backgroundColor: "teal", width: 100, height: 100}}></div>
          <span style={{color: "white"}}>Hello, I'm TEXT</span>
        <div style={{backgroundColor: "tomato", width: 100, height: 100}}></div>
    </div>
  )
}
```

- inline 방식은 html 태그 안에 작성되므로 html tag 가 길어지게 된다. 이는 유지보수 측면에서 나쁘고 공통된 스타일을 적용하는데 있어서, 같은 코드를 작성해야 되기 때문에 매우 비효율적이므로 지양한다.

### css import 방식

```css
.flex-container {
  display: flex;
}

.box-one {
  background-color: teal;
  width: 100px;
  height: 100px;
}

.box-two {
  background-color: tomato;
  width: 100px;
  height: 100px;
}

.text {
  color: white;
}
```

```js
import "./style.css"
const General_App = () => {
  return (
    <div className="flex-container">
        <div className="box-one"></div>
          <span className="text">Hello, I'm TEXT</span>
        <div className="box-two"></div>
    </div>
  )
}
```

- css 를 import 하는 방식은 유지보수를 위하여 2개의 파일을 관리해야한다. 또한 자동트래킹을 할 수가 없어 특정 Component 를 수정하기 위해서는 className 및 id 를 확인하여 직접 css 파일에서 찾아 수정해야되기 때문에 불편하다.

- css 를 import 하는 방식은 해당 파일에 작성된 Component 뿐만 아니라 전체 Component 들에 스타일이 적용되기 때문에, 여전히 식별자의 이름을 중복되지 않게 고려해야하는 불편함이 있다.

<br><br>

## Styled Component 의 적용

위에서 발생한 여러움들을 최소화 하기 위하여 Styled Component 가 나타났다.

```js
const FlexContainer = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
`;

const Styled_App = () => {
  return (
    <FlexContainer>
        <BoxOne>
          <Text>Hello, I'm TEXT</Text>
        </BoxOne>
        <BoxTwo />
    </FlexContainer>
  )
}
```
