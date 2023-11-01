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

- 하나의 Component 에 대한 코드와 스타일 정보가 한 파일에 있어서 유지보수하기 손쉬워졌다
- html 와 css 요소에대해서 분리되어 있어 각 기능에 집중할 수 있다.

<br>
<hr>

## 1. 기본사용법

```js
/*
  styled.html태그 `
    css 코드;
  `
*/
const Container = styled.div`
  background-color: white;
`

const Styled_App = () => {
  return (
   <Container>
   </Container>
  )
}
```

- styled commponent 또한 Component 이기 때문에 이름 또한 대문자로 시작해야한다.

<br>
<hr>

## 2. 외부로부터 속성받기

styled commponent 가 외부로부터 값을 전달받아, 값에 따라 스타일을 변경할 수 있도록 만들 수 있다.

예를 들어 첫번째 Box Component 는 배경색이 검은색이고, 두번째 Box Component 는 배경색을 갖도록 스타일을 설정할 수 있다.

이렇게 작성하면 Box Component 들은 배경색 이외에는 같은 스타일을 갖는다.

<br>

    <Component 속성명="속성값" />
    css 속성: ${(props) => props."속성명"}
    
<br>

### 2-1. 배경색만 다른 같은 Component

```js
// 설정변경 가능한 컴포넌트 생성
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const App = () => {
  return(
    <div>
      <Box bgColor="black"></Box>
      <Box bgColor="green"></Box>
    </div>
  )
}
```

- Styled Component 안에 속성을 지정하면 Styled Component 의 props 에 저장된다.
- 전달된 속성은 props."속성명" 에 저장된다.
- Styled Component 안의 스타일 코드에서 ${(props) => props."속성명"}으로 값을 반환받을 수 있다.

<br>

### 2-2. 스위칭되는 배경 스타일

```js
const Container = styled.div`
  background-color: ${(props) => props.darkmode ? "black" : "white"};
`

const Switch = styled.button`
  width: 50px;
  height: 50px;
  color: ${(props) => props.darkmode ? "white" : "black"};
`

const App = () => {
  const [darkmode, setDarkmode] = useState(false);
  const switching = (prev) => setDarkmode(!prev);
  return(
    <Container darkmode={darkmode}>
      <Switch darkmode={darkmode} onClick={switching}>스위칭 버튼</Switch> 
    </Container>
  )
}
```

- useState 를 통해서 같은 Component 의 스타일도 동적으로 변경할 수 있다.

<br>
<hr>

## 2. Styled Component 확장(상속)

Styled Component 는 기존 존재하던 스타일을 받아 확장할 수 있다.

    styled(확장할 Component)

<br>

```js
const Parent = styled.div`
  display: flex;
`

const ChildOne = styled(Parent)`
  flex-direction: row;
`

const ChildTwo = styled(Parent)`
  flex-direction: column;
`

const App = () => {
  return(
    <Parent>

      <ChildOne>
        <span>1<span>
        <span>2<span>
        <span>3<span>
        <span>4<span>
      </ChildOne>

      <ChildTwo>
        <span>1<span>
        <span>2<span>
        <span>3<span>
        <span>4<span>
      </ChildTwo>

    </Parent>
  )
}
```

- ChildOne, ChildTwo 는 Parent 의 스타일을 확장시켰다. 스타일을 상속받는 것처럼 Parent 의 스타일에 영향을 받는다.

<br>
<hr>

## 3. 적용되는 html tag 변경

서로 다른 HTML tag 이지만, 같은 스타일을 적용시키고 싶을 때 사용할 수 있는 방법이다.

<br>

    <Component as="a" />     a tag 로 변경
    <Component as="p" />     p tag 로 변경
    <Component as="div" />   div tag 로 변경

<br>

```js
const Text = styled.span`
  max-width: 200px;
  min-height: 40px;
`

const App = () => {
  return(
    <div>
      <Text as="a"> a tag 로 변경 </Text>
      <Text as="p"> p tag 로 변경 </Text>
      <Text as="div"> div tag 로 변경 </Text>
    </div>
  )
}
```

<br>
<hr>

## 3. Component 의 속성 지정

input 이나 button 의 경우 속성을 지정해야할 때가 있다. 이러한 경우에도 Styled Component 가 기능을 제공한다.

<br>

    styled."html-tag".attrs({속성명1: 속성값, 속성명2: 속성값2})``

<br>

Styled Component 로 input 의 disable, required 속성 지정하기

```js
const Input = styled.input.attrs({disable: true, required: true})`
  width: 100px;
  heightL 40px;
`

const App = () => {
  return (
    <div>
      <Input />
    </div>
  )
}
```

<br>
<hr>

## 4. Animation 지정

Styled Component 에서 keyframes 를 통해서 Component 의 애니메이션 속성을 추가할 수 있다

<br>

    const userAnimation = keyframes`
      애니메이션 속성
    `
    const Component = styled.div`
      animation: ${userAnimation};
    `

<br>

#### 무한회전하는 사각형 애니메이션

```js
import styled, { keyframes } from "styled-components";

const rotationAnimation = keyframes`
  0% {
    border-radius: 0px;
    transform: rotate(0deg);
  }
  50% {
    border-radius: 100px;
    transform: rotate(360deg);
  }
  100%{
    border-radius: 0px;
    transform: rotate(0deg);
  }
`

const Squre = styled.div`
  width: 200px;
  height: 200px;
  background-color: tomato;

  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;
`

const Animation = () => {
  <div>
    <Squre />
  </div>
}
```

<br>
<hr>

## 5. 이외의 편리기능

### 5.1 특정 Component 내의 자식 Component 

특정 Component 내의 자식 Component 에 대해서도 각각 다른 스타일을 지정할 수 있다.

<br>

#### 기존 예시 : flex-container 클래스 안의 span 에 대한 스타일 설정

```css
.flex-container {
  display: flex;
  justify-contents: center;
  align-items: center;
}

.flex-container h2 {
  color: blue;
  text-decoration: underline;
}

.flex-container .child {
  color: red;
  text-align: left;
}

```js
const App = () => {
  return(
    <div className="flex-container">
      <h2>flex container 클래스 내 h2 에서만 적용</h2>
      <span className="child">flex container 클래스 내 child 클래스에서만 적용t</span>
    </div>
  )
}

```

<br>

#### Styled Component : flex-container 클래스 안의 span 에 대한 스타일 설정

- 특정 Component 에 속하는 자식 Component 에 대해서, 한번에 표현할 수 있어 작성하기가 편하다는 장점이 있다.

<br>

```js
const Child = styled.span`
  color: red;
  text-align: left;
`
const FlexContainer = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;

  // FlexContainer 내의 p tag 에만 적용
  p {
    color: red;
    text-align: left;
  }

  // FlexContainer 내의 Child Component 에만 적용
  ${Child} {
    color: red;
    text-align: left;
  }
`

const App = () => {
  return(
    <FlexContainer>
      <h2>flex container 클래스 내 h2 에서만 적용</h2>
      <Child>flex container 클래스 내 child 클래스에서만 적용</Child>
    </FlexContainer>
  )
}
```

<br><br>

### 5.2 pseudo-class 설정

<br>

    & 키워드 사용
    const Component = styled.div`
      &:hover {
      }
      &:active {
      }
      ...
    `

<br>

위와 마찬가지로 다양한 pseudo class 에 대한 설정을 한 코드박스 안에 모두 설정할 수 있다.

한 Component 에 대한 스타일 설정을 한 코드박스안에 넣을 수 있어, 코드가 간결해진다.

#### 기존코드 : flex-container 클래스에 대하여 hover, active 설정

- hover 시 scale: 0.8
- active 시 background-color: gray

```css
.flex-container {
  width: 100px;
  height: 100px;
  display: flex;
}

.flex-container:hover {
  scale: 0.8;
}

.flex-container:active {
  background-color: gray;
}

```

<br>

#### Style Component : FlexContainer 에 대하여 hover, active 설정

```js
const FlexContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  &:hover {
    scale: 0.8;
  }
  &:active {
    background-color: gray;
  }
`

```

