# React2-3-2

# 안찬우(201830220)

## 1123(13주차)

## 작성코드

#### boilerplate 프로젝트 생성


#### addSign.js
```js
import { gql } from '@apollo/client';

const ADD_SIGN = gql`
  mutation InsertNewSign($nickname: String!, $content: String!, $country: String) {
    insert_sign(objects: { nickname: $nickname, country: $country, content: $content }) {
      returning {
        uuid
      }
    }
  }
`;

export default ADD_SIGN;
```

#### new-sign.js
```js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import ADD_SIGN from '../lib/apollo/queries/addSign';

function NewSign() {
  const router = useRouter();
  const [formState, setFormState] = useState({});
  const [addSign] = useMutation(ADD_SIGN, {
    onCompleted() {
      router.push('/');
    },
  });

  const handleInput = ({ e, name }) => {
    setFormState({
      ...formState,
      [name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center flex-col mt-20">
      <h1 className="text-3xl mb-10">Sign the Real-World Next.js signbook!</h1>
      <div className="max-w-7xl shadow-xl bg-purple-50 p-7 mb-10 grid grid-rows-1 gap-4 rounded-md border-2 border-purple-800">
        <div>
          <label htmlFor="nickname" className="text-purple-900 mb-2">
            Nickname
          </label>
          <input
            id="nickname"
            type="text"
            onChange={(e) => handleInput({ e, name: 'nickname' })}
            placeholder="Your name"
            className="p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label htmlFor="content" className="text-purple-900 mb-2">
            Leave a message!
          </label>
          <textarea
            id="content"
            placeholder="Leave a message here!"
            onChange={(e) => handleInput({ e, name: 'content' })}
            className="p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label htmlFor="country" className="text-purple-900 mb-2">
            If you want, write your country name and its emoji flag
          </label>
          <input
            id="country"
            type="text"
            onChange={(e) => handleInput({ e, name: 'country' })}
            placeholder="Country"
            className="p-2 rounded-lg w-full"
          />

          <button
            className="bg-purple-600 p-4 rounded-lg text-gray-50 m-auto mt-4"
            onClick={() => addSign({ variables: formState })}>
            Submit
          </button>
        </div>
      </div>
      <Link href="/" passHref className="mt-5 underline">
        Back to the homepage
      </Link>
    </div>
  );
}

export default NewSign;

```

## 학습내용

#### 콘텍스트 API
  - 특정 콘텍스트 내의 모든 컴포넌트 간에 데이터를 공유할 수 있음

#### 5.2 전역 상태 관리
  - 여러 컴포넌트가 공유하는 상태
  - 접근 및 수정이 가능한 상태
  - 데이터 흐름이 단반향
    1. 오류 발생 가능성 줄여줌
    2. 디버깅 하기 쉬움
  - 앱 개발이 더 복잡해짐

#### 5.1 지역 상태 관리
  - 앱의 상태는 컴포넌트 스코프 상태를 의미
  - Increment버튼 클릭시 현재 count 값에 1을 더하고,
  - Decrement버튼 클릭시 현재 값에서 1을 뺀다.

### Chapter5 지역 및 전역 상태 관리
  - 상태는 동적 정보의 일종
    1. 높은 수준의 상호 작용이 가능한 UI를 구현하거나
    2. 더 뛰어난 UX 개발 위한 필수 요소
  - 최신 웹앱에서는 UI가 상태를 사용하고 관리하는 경우가 있음
    1. 밝은 테마에서 어두운 테마로 변경하거나,
    2. 배송 주소를 바꿈으로서 폼의 상태를 변경
    3. 버튼 클릭 만으로 앱의 상태를 바꿀 수 있음
  - 앱의 복잡도는 증가
  - 리액트 16.8 이후 부터는 useState 훅을 포함한 리액트 훅을 제공


## 1116(12주차)

## 작성코드

#### npm install graphql-type-json

#### npm install apollo-server-micro

#### signbook 프로젝트 생성
  -  의존성 패키지 추가 npm i @apollo/client graphql isomorphic-unfetch

#### Sign.js
```js
export default function Sign({ content, nickname, country }) {
    return (
      <div className="max-w-7xl rounded-md border-2 border-purple-800 shadow-xl bg-purple-50 p-7 mb-10">
        <p className="text-gray-700"> {content} </p>
        <hr className="mt-3 mb-3 border-t-0 border-b-2 border-purple-800" />
        <div>
          <div className="text-purple-900">
            Written by <b>{nickname}</b>
            {country && <span> from {country}</span>}
          </div>
        </div>
      </div>
    );
}
```

#### Loading.js
```js
export default function Loading() {
    return (
      <div className="min-h-screen w-screen flex justify-center	 items-center">
        Loading signs from Hasura...
      </div>
    );
}
```

#### getLatestSigns.js
```js
import { gql } from '@apollo/client';

const GET_LATEST_SIGNS = gql`
  query GetLatestSigns($limit: Int! = 10, $skip: Int! = 0) {
    sign(offset: $skip, limit: $limit, order_by: { created_at: desc }) {
      uuid
      created_at
      content
      nickname
      country
    }
  }
`;

export default GET_LATEST_SIGNS;

```

#### _app.js
```js
import '@/styles/globals.css'
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState || {});
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
```

#### index.js
```js
import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let uri = '/api/graphql';
let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({uri}),
    cache: new InMemoryCache(),
  });
}

export function initApollo(initialState = null) {
  const client = apolloClient || createApolloClient();

  if (initialState) {
    const existingCache = client.extract();
    client.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') {
    return client;
  }

  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function useApollo(initialState) {
  return useMemo(() => initApollo(initialState), [initialState]);
}
```

## 학습내용

#### GraphQL API
  - 새로운 관점으로 API데이터를 다룸
  - 필요한 데이터만 불러오고 저장
  - 여러 곳의 데이터를 불러옴
  - 정적이면서도 강력한 타입을 정함

## 1109(11주차)

## 작성코드

#### csr-rest-api 프로젝트 생성

#### singleUser.js
```js
import axios from 'axios';

export default async function handler(req, res) {
  if (!req.query.username) {
    res.status(403).json({
      error: 'Missing "username" query parameter',
    });
    return;
  }

  const username = req.query.username;
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const API_TOKEN = process.env.API_TOKEN;

  const userReq = await axios.get(`${API_ENDPOINT}/api/04/users/${username}`, {
    headers: { authorization: API_TOKEN },
  });

  res.status(200).json(userReq.data);
}
```

#### user.json
  - https://github.com/hanbit/practical-next.js

#### .env
```js
API_TOKEN=realworldextjs
API_ENDPOINT=http://localhost:3000
```

## 학습내용

#### csr-rest-api 프로젝트의 문제점
  1. 교차 출처 리소스 공유 는 브라우저에서 제공하는 보안 기능으로 클라이언트->서버의 경우 문제 발생
  2. 클라이언트에 인증 토큰을 노출

#### 클라이언트에서 REST API 사용하기
  - 클라이언트는 주로 두 가지 시점에 데이터를 불러옴
  1. 컴포넌트가 마운트된 후
  2. 특정 이벤트가 발행한 후

#### 클라이언트가 데이터 불러오기
  - 서버가 데이터를 불러오는 것이 더 안전
  - API엔드포인트 주소, 매개변수 값, HTTP 헤더, 인증 토큰 값 등 중요한 정보가 노출이 안됨

#### process.env.API_TOKEN을 사용했을까
  - 권장하지 않는 이유
  1. 비밀 정보로 간주해야 함
  2. 로컬에서 실행하면 테스트 토큰을 사용, 배포한 후는 다른 토큰 사용, 즉 2개의 토큰 사용
  3. 토큰 값이 바뀌면 환경 변수나 설정 파일의 값을 바꾸는 것으로 쉽게 적용

#### 4.2.3 서버에서 REST API 사용하기
  - public API를 호출할 것인지 private API를 호출할 것인지 먼저 확인
  - Public API는 인증이나 권한 없이 호출 가능

#### 4.2.2 서버가 데이터 불러오기
  - 서버에서는 두 가지 방법으로 HTTP 요청을 만들고 처리 가능
    - 1. Node의 내장 HTTP 라이브러리를 사용 가능
    - 2. HTTP클라이언트 라이브러리 사용 가능

## 1102(10주차)

## 작성코드

#### ssr-rest-api 프로젝트 생성

#### index.js
```js
export async function getServerSideProps(){
  // const {data} = await axios.get(`${process.env.API_ENDPOINT}/api/04/users`);
  const usersReq = await axios.get('https://api.rwnjs.com/01/users');

  return{
    props: {
      users: usersReq.data,
    },
  };
}

export default function HomePage({users}) {
  return (
    <ul>s
      {users.map((user) => (
        <li key={user.id}>
          <link href={`/users/${user.username}`} passHref>
            {user.username}
          </link>
        </li>
      ))}
    </ul>
  );
}

```
## 학습내용

#### 4.2 데이터 불러오기
  - 정적 페이지 만들 시 getStaticProps 함수를 사용해 빌드 시점에 데이터를 불러옴
  - 서버가 렌더링할 때 getServerSideProps를 통해 실행 도중 데이터를 불러옴

#### 4.1.4 정적 자원 구성
  - 이미지
  - 컴파일한 자바스크립트 파일
  - 컴파일한 CSS 파일
  - 아이콘(favicon 및 웹 앱 아이콘)
  - manifest.json.robot.txt등의 정적 파일

#### 4.1.3 유틸리티 구성
  - 컴포넌트를 만들지 않는 코드파일을 유틸리티 스크립트
  - 다양한 목적으로 사용 가능

#### 4.1.2 컴포넌트 구성
  - atoms
    - 코드에서 사용되는 가장 기본적인 컴포넌트
  - molecules
    - atoms에 속한 컴포넌트 여러 개를 조합하여 복잡한 구조를 만드는 컴포넌트
  - organisms
    - molecules와 atoms를 섞어 더욱 복잡한 구조를 만드는 컴포넌트
  - templates
    - 일종의 페이지 스켈레톤으로 organisms, molecules, atoms를 배치할지 결정해 사용자가 접근하는 페이지 만듬

#### 4.1 디렉토리 구조 구성
```js
next-js-app
  - node_modules/
  - package.json
  - pages/
  - public/
  - styles/
```

## 1026(9주차)

## 작성코드

#### _app.js
```js
import Navbar from './components/Navbar'
import '@/styles/globals.css'
import ThemeContext from './components/themeContext'
import { useState } from 'react';

const themes = {
  dark: {
    background: 'black',
    color: 'white'
  },
  light: {
    background: 'white',
    color: 'dark'
  }
};

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  };

  return (
    <>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            ...themes[theme]
          }}>
          <Navbar/>
          <Component {...pageProps}/>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
```

#### themeContext.js
```js
import { createContext } from "react";

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => null
});

export default ThemeContext;
```

#### Widget.js
```js
const { useState } = require("react");
import Head from "next/head";


function Widget({pageName}){
    const [active, setActive] = useState(false);

    if(active){
        return(
            <>
                <Head>
                    <title>이 페이지 타이틀은 "{pageName}" 입니다.</title>
                </Head>
                <div>
                    <button onClick={() =>setActive(false)}>
                        original title
                    </button>
                    Take a look at the title!
                </div>
            </>
        );
    }
    return(
        <>
            <button onClick={() =>setActive(true)}>
                Change page title
            </button>
        </>
    );
}

export default Widget;
```

#### about.js
```js
import Navbar from "./components/Navbar";
import Head from "next/head";
import Widget from "./components/Widget";


export default function Home(){
    return(
        <>
            <Head>
                <title>about 페이지</title>
            </Head>
            <div>
                about.js
            </div>
            <Navbar/>
            <div>
                <Widget pageName='about'/>
            </div>
        </>
    )
}
```

#### index.js
```js
export default function Home() {
  return (
    <>
      <Head>
        <title>Head 컴포넌트에서 타이틀 추가</title>
        
      </Head>
      <div>index.js</div>
      <Navbar/>

      <div>
        <Widget pageName='index'/>
      </div>
    </>
  )
}
```

## 학습내용

#### Dark mode와 Light mode를 _app.js에 적용하기
  - p78~80 code 참조

#### 3.4 _app.js와 _document.js 페이지 커스터마이징
  - 특정작업을 처리해야 하는 경우 pages/ 디렉토리 안에 있는 app.js와 document.js를 이용
  - [_app.js 페이지]
    - 해당 컴포넌트와 pageProps를 반환
    - Navbar컴포넌트 추가 시 index, about, contact페이지에 Navbar 추가 안해도 됨
    - pages내에 모든 페이지 적용 가능

  - [_document.js 페이지]
    - p81 code 및 설명 참조


#### 공통 메타 태그
  - 복수의 페이지나 컴포넌트에서 사용하는 공통 메타 태그는 전용 컴포넌트를 만들어 관리하는 것이 좋음

#### 3.3 메타 데이터
  - Next.js에서는 내장 Head 컴포넌트를 제공하여 메타 데이터를 쉽게 다룰 수 있음
  - 어떤 컴포넌트에서든 HTML페이지의 <Head> 내부 데이터를 변경, 추가, 삭제 가능

## 1012(7주차)

## 작성코드

#### ImagePage.js
```js
export default function ImagePage(){
    return(
        <>
            <div
                style={{
                    width: 500,
                    height: 200,
                    position: 'relative'
                }}   
            >
                <Image
                    src='https://cdn.pixabay.com/photo/2023/08/16/13/06/mantis-8194123_640.jpg'
                    layout='fill'
                    objectFit='cover'
                    alt='A beautiful English Setter'
                />
            </div>
        </>
    );
}
```

#### Param.js
```js
import { useRouter } from "next/router";

export default function Param(){
    const {query} = useRouter();
    console.log(query);
    return(
        <>
            <h1>Hello {query.name}!</h1>
        </>
    )
}
```

#### [name].js
```js
import Param from "@/components/Param";


export default function Greet(){
    return(
        <Param/>
    )
}
```

#### [contents].js
```js
export async function getServerSideProps({params}){
    const {contents} = params;
    return {
        props: {
            contents,
        },
    }
}

export default function Greet(props){
    return(
        <h1>Hello, {props.contents}!</h1>
    );
}
```

## 학습내용

#### 자동 이미지 최적화
  - Image 컴포넌트를 사용해 자동으로 최적화 가능
  - WebP와 같은 최신 이미지 포맷으로 제공 가능
  - png나 jpeg와 같은 예전 이미지 포맷도 제공
  - 필요시 이미지 크기 조정 가능
  - Unplash나 Pexel과 같은 외부 이미지

#### 3.2 정적 자원 제공
  - 정적 자원은 이미지, 폰트, 아이콘, 컴파일한 css, js등 /public 디렉토리 안에 저장
  - 정적 자원 중 이미지 파일은 SEO에 많은 영향
  - 볼러오는데 시간 많이 걸림, 이미지 주변의 레이아웃이 변경되는 등 UX관점에서 부정적
  - 누적 레이아웃 이동(CLS: Cumulative Layout Shift)라고 함
  - Image 컴포넌트룰 사용해 CLS문제 해결

#### router.pusg 메서드
  - Link 컴포넌트 대신 useRouter Hook을 사용해 다른 페이지 이동
  - 로그인한 사용자만 접근할 수 있는 페이지를 위한 useAuth라는 훅이 있다고 가정
  - 사용자가 로그인 하지 않았다면 useRouter 훅을 사용해서 로그인 페이지 이동
  - router.push 메서드를 사용해 로그인 페이지 이동

#### 클라이언트에서의 내비게이션(p55)
  - Link 컴포넌트를 사용해 페이지 간의 이동을 최적화
  - Link와 연결된 페이지는 이미 클라이언트에 다운로드 된 상태
  - 화면 전환 속도가 빠른 이유
  - 만일 미리 불러오는 기능을 사용하지 않는다면 preload={false} 속성을 전달하여 비활성화

#### 컴포넌트에서 경로 매개변수 사용하기(p54)
  - pages 밖에서는 getServerSideProps나 getStaticProps 함수를 사용하지 못함
  - useRouter Hook을 이용하면 컴포넌트 안에서 경로 매개변수 사용가능
  - useRouter는 next/router에서 가져올 수 있음
  - useRouter Hook을 사용해 query매개변수를 가져옴
  - greet/Mitch?foo=true로 접속하여 log 확인

## 1005(6주차)

## 작성코드

## 학습내용

#### 동적 라우팅
  - /pages/post/[slug].js 파일 생성 후 useRouter를 사용하면 파라메터 사용가능
  - 대괄호는 반드시 사용, slug는 pid, category등 원하는 것을 넣음
  - useRouter 훅을 통해 router 정보를 불러오거나, router.query내에 설정한 변수와 변수 값 확인 가능

#### 기본 라우팅
  //일반적인 경로
  - pages/index.js 
    - localhost:3000/
  - pages/blog/index.js
    - localhost:3000/blog
  
  //중첩라우팅
  - pages/blog/first-post.js
    - localhost:3000/blog/first-post

### Chapter 3 기초와 내장 컴포넌트

#### 3.1 라우팅 시스템
  - 클라이언트 라우팅만 구형
  - Next는 파일시스템 기반 페이지와 라우팅
  - 페이지는 /pages 디렉토리 안의 *.js , *.jsx , *.ts , *.tsx 파일에서 export한 React컴포넌트

#### 2.3 정적 사이트 생성(SSG: Static Site Generation)
  - SSG는 일부, 전체 페이지를 빌드시점에 미리 렌더링
  - SSR 및 CSR과 비교했을 때 다음과 같은 장점이 있음
  #### 1. 쉬운 확장
    - CDN을 통해 파일제공, 캐시에 저장하기 쉬움
  #### 2. 뛰어난 성능
    - 페이지를 요청해도 클라이언트나 서버가 무언가를 처리할 필요 없음
  #### 3. 더 안전한 API 요청
    - 외부 API를 호출하거나, 데이터베이스에 접근하거나 보호해야할 데이터에 접근할 일 없음
    - 필요한 모든 정보가 빌드 시점에 미리 페이지로 렌더링 됨
  
  - 프런트엔드 애플리케이션에 가장 좋은 방법
  - 문제점: 다음 배포 전까지 내용이 변하지 않음
  - 문제 해결 방법: 증분 정적 재생성(ISR: Incremental Static Regeneration)
  - 콘텐츠 데이터를 로딩하는데 시간이 오래 걸린다면, SSG와 ISR을 함께 사용하여 문제 해결
  - 데이터가 변하지 않을시 SSG와 ISR을 사용해 데이터를 10분동안 캐싱

#### 동적 컴포넌트 로딩 - dynamic
  - 앞서 React.useEffect 훅을 사용하여 코드를 실행하는 경우에만 컴포넌트를 렌더링
  - dynamic 함수로도 똑같이 동작
  - Highlight

## 0921(4주차)

## 작성코드

#### Highlight.js
```js
const { default: Head } = require("next/head");
const { useRouter } = require("next/router");
const { useEffect } = require("react");

function Highlight({code, laguge = 'js'}){
    const {asPath} = useRouter();

    useEffect(() => {
        hljs.registerLanguage('javascript', javascript);
        hljs.initHighlighting();
    }, [asPath]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="@highlight.css"/>
            </Head>
            <pre>
                <code className={laguge}></code>
            </pre>
        </>
    );
}

export default Highlight;
```

#### getServerSideProps.js
```js
export async function getServerSideProps() {
    const userRequest = await fetch('https:example.com/api/user');
    const userData = await userRequest.json();

    return {
        props:{
            user: userData,
        },
    };
}

function IndexPage(props){
    return <div>Welcome, {props.user.name}!</div>;
}

export default IndexPage;
```


## 학습내용

### Chapter2 렌더링 전략

#### process.browser
  - process.browser값에 따라서 스크립트와 컴포넌트를 조건별로 실행
  - 코드를 클라이언트에서 실행하면 true, 서버에서는 false 값을 가짐

#### React.useEffect Hook
  - 최근 리액트는 life cycle함수 대신 Hook사용
  - DOM조작이나 데이터 불러오기 등 사이드 이펙트 기능 구현할 시 useEffect함수를 사용해 마운트 된 후 실행

#### 2.2.2 CSR을 사용할 때의 이점
  - 네이티브 앱처럼 느껴지는 웹 앱
  - 쉬운 페이지 전환
  - 지연된 로딩과 성능
  - 서버 부하 감소

#### 2.2.1 클라이언트 사이드 렌더링(CSR)
  - React 앱을 실행하면 렌더링 시작전 빈 화면 유지
  - 이는 서버에서 스크립트를 사용하기 위한 것

#### getServerSideProps
  1. getServerSideProps라는 비동기 함수를 export
  2. getServerSideProps 함수는 props라는 속성값을 갖는 객체를 변환
  3. IndexPage 함수를 수정해서 props의 모든 내용을 갖음

  ### * componets안에 index파일 없이 실행 불가능 - pages안에서는 실행가능

#### [SSR이 최적의 렌더링 전략이 아닌 경우]
  - 클라이언트가 페이지를 요청할 때마다 페이지를 다시 렌더링할 수 있는 서버가 필요
  - 다른 방식에 비해 SSR이 더 많은 자원 소모, 더 많은 부하로 인해 유지 보수 비용 증가
  - 페이지 요청 처리 시간 증가
  - 페이지가 외부 API나 데이터 소스에 접근할 시, 해당 페이지를 렌더링할 때마다 다시 요청
  - 페이지 간의 이동은 CSR에 비해 느림

#### [SSR의 장점]
  - 더 안전한 웹 애플리케이션
  - 더 뛰어난 웹 사이트 호환성
  - 더 뛰어난 SEO

## 0914(3주차)

## 작성코드

### components -> navbar.js
```js
import styles from '@/styles/Home.module.css'

function navbar(){
    <div className={styles.navbar}>
        <a href='./'>Home</a> | 
        <a href='./Chapter2_1'>Chapter2_1</a> | 
        <a href='./Chapter2_2'>Chapter2_2</a> | 
    </div>
}

export default navbar;
```

### index.js

```js
  <div className={styles.navbar}>
    <a href='./'>Home</a> | 
    <a href='./Chapter2_1'>Chapter2_1</a> | 
    <a href='./Chapter2_2'>Chapter2_2</a> | 
  </div>
  // Home, Chapter2_1, Chapter2_2 추가
```

### Home.module.css
```js 
.navbar {
  position: relative;
  margin: 0;
  padding: 1rem;
  background-color: rgba(var(--callout-rgb), 0.5);
  border: 1px solid rgba(var(--callout-border-rgb), 0.3);
  border-radius: var(--border-radius);
  width: 50%;
}
// navbar라는 모듈함수 추가
```

## 학습내용

### Chapter2 렌더링 전략

#### 2.1.2 렌더링 전략
  - 웹 페이지 또는 웹 애플리케이션을 웹 브라우저에 제공하는 방법
  - 정적 페이지 제작에는 Gatby 추천
  - 서버 사이드 렌더링 전략시 다른 프레임워크 추천
  - 빌드 시점에 정적으로 생성하거나, 실행 지점에 동적으로 생설할지 쉽게 결정 가능
  - 클라이언트에서 렌더링 해야 할 컴포넌트도 지정할 수 있어 개발이 쉬움

#### 2.1 서버 사이드 렌더링(SSR)
  - 웹 페이지를 제공하는 가장 흔한 방법
  - APM을 이용하는 일반적인 웹 페이지 생성
  - 자바스크립트 코드가 적재되면 동적으로 렌더링
  - 웹 페이지를 동적으로 처리하는 방법을 하이드레이션
  - 새로 고침 없이 사용자와 웹 페이지간 상호 작용을 가능하게 함

#### SWC 프로젝트 적용법
  - npx create-next-app@latest my-app

#### 왜 SWC(Speedy Web Compiler)를 사용해야 하는가?
[Babel의 단점]
  - Babel로 변환된 코드를 이해하기 어렵다.
  - 원 코드에 비해 변환 코드의 길이가 늘어난다.
  - 변환에 시간이 많이 걸린다.

[SWC의 장점]
  - Next12이후 별도의 설정 없이 SWC를 사용 가능(Next.js에 내장)
  - Rust의 WASW(WebAssembly) 지원으로 다양한 플랫폼에서도 Next JS개발 가능
  - 변환 시간 빠름
  - 커뮤니티의 성장으로 도움 받기 쉬움

### Transpile
  - TypeScript를 이전 버전의 코드로 변환시켜주는 도구
  - 개발자가 작성한 코드 -> Parse -> Transform -> Generate -> 이전 버전의 코드
  - Babel의 parser는 Abstract SyntaxTree(AST)로 변환하는 역할
  - Babel의 traverse모듈은 전체 트리 상태(AST)를 유지하며 노드 교체, 제거, 추가 담당
  - 마지막 generator가 수정된 AST를 일반 코드로 변환

## 0907(2주차)

## 작성코드

### .babelrc
```js
  {
    "presets":["next/babel"]
    
  }
```

### tsconfig.json 자동추가
  - REACT2-3-2 -> test2 -> tsconfig.json추가

## 학습내용

#### 바벨과 웹팩 커스터마이징
  - 바벨은 자바스크립트 트랜스컴파일러이며, 자바스크립트 코드를 하위 호환성을 보장
  - 하위 호환성이 보장되면 어떤 웹 브라우저에서든 자바스크립트 코드 실행 가능
  - Node.js에서 실행하면 오류, 바벨을 사용하면 실행가능한 ECMAScript 코드로 변환
  - 바벨 설정을 커스터마이징 하려면, 프로젝트 Root에 .babelrc 파일 생성
  - 설정 파일을 비워 두면 오류 발생 - "presets":["next/babel"] 추가


#### 타입스크립트 지원
  - Next.js는 고품질의 type definition 지원
  - 설정 임의 변경 주의사항 p28

#### 프로젝트 기본 구조
  - Next.js눈 react-router와 다른 라이브러리인 page/ 디렉토리 사용
  - pasges/ 디렉토리 안의 모든 js파일은 public 페이지
  - 프로젝트 실행 http://localhost:3000 접속 확인
  - public/ 디렉토리에는 퍼블릭 페이지와 정적 콘텐츠가 있음 (이미지, css, js등)
  - styles/ 디렉토리에는 앱에서 사용하는 스타일시트 넣는다(반드시 필요한 것은 아님)
  - .next, node_modules 지우면 안됨, 단 상황에 따라 styles 디렉토리는 삭제 가능
  - 정해진 용도 디렉토리는 pages와 public

#### 그 외 설정
  - 타입스크립트로 개발 시 타입스크립트 전용 플러그인 설치 후 설정 수정
  - 웹팩은 라이브러리, 페이지, 기능에 대해 컴파일된 코드를 포함하는 번들을 만듬
  - 여러 개의 컴포넌트로 구성된 페이지 개발 시 하나의 번들로 합침
  - 만일 SASS나 LESS같은 CSS 전처리기를 사용해서 개발 하면 웹팩 설정을 수정
  - SASS > LESS (SASS메인)
  
프로젝트 생성
  - npx create-next-app<app-name>

프로젝트 실행
  - npm run dev

## 0831(1주차)

## 작성코드
#### 1주차 실습 없음

## 학습내용
### Chapter1 Next.js
- 코드 분할(Splitting): 페이지를 로딩 할 때 번들을 여러 조각으로 나누어 필요한 부분만 전송하는 방식
- 서버 사이트 렌더링
- 파일 기반 라우팅
- 경로 기반 프리패칭

#### 1.3 Next.js와 비슷한 프레임워크   
[Gatsby]   
  - 정적 웹 사이트를 만들 수 있는 프레임워크
  - 정적 사이트 생성만 지원
  - 클라이언트 사이드 렌더링만 지원
  - 동적으로 변하는 복잡한 웹 사이트는 만들 수 없음

[Razzle]   
  - 서버 사이드 렌더링이 가능한 자바스크립트 애플리케이션 개발 가능
  - CRA와 유사하게 프로젝트를 구성 가능(create-razzle-app)
  - React, Preact, Reason-React, Angular 및 Vue와 함께 사용 가능

[Nuxt.js]
  - Vue를 사용한 웹 애플리케이션 개발에서 리액트의 Next.js에 해당하는 프레임워크

[Angular Universal]
  - 정적 사이트 생성과 서버 사이드 렌더링을 지원
  - Nuxt나 Next와는 달리 대기업인 구글에서 만듬
  - Angular로 개발하는 경우 Angular Universal을 사용함
 
#### 1.4 왜 Next.js일까?
  - React에서 제공하지 않는 여러 기능 지원
  - 설정이나 개발 옵션 등 다양한 부분에서 유용한 기능 제공
  - 활동적인 커뮤니티가 있어 개발 단계별로 많은 지원을 받을 수 있음

#### 1.5 리액트에서 Next.js로
  - Next.js의 기본 철학은 React와 거의 같음
  - "설정보다 관습"이라는 리액트의 철학 계승
  - "Convention over configuration"은 결정의 수를 줄여주면서도 유연성은 잃지 않도록 하는 설계 패러다임
  - 설정 파일 없이 서버 사이드 렌더링을 작용하고 정적 페이지 생성을 적용할지 지정 가능
  - Next.js는 fetch, window, document와 같은 웹 브라우저에서 제공하는 전역 객체, canvas 같은 HTML요소에 접근 불가능
  - 전역 객체나 HTML요소를 반드시 사용해야 하는 컴포넌트를 별도로 제공
  - 어떠한 방식으로 지원하는지는 각 페이지가 어떤 렌더링 방식을 사용하는가에 따라 결정
  - 클라이언트 사이드 앱, 프로그레시브 웹 앱, 오프라인 웹앱도 쉽게 만들 수 있음
  - 많은 내장 컴포넌트, 최적화 기능 사용가능
  - Progressive Web Apps(PWA)은 웹 앱과 네이티브 앱 장점 모두 제공

#### 1.6 Next.js 시작하기
  - 새로운 앱을 만들고 웹팩과 바벨의 기본 설정을 커스터마이징
  - Next.js 앱을 만들 때 기본 언어로 타입스크립트를 사용하는 방법
  - Node.js와 npm만 설치
  - Node.js만 설치하면 npm은 함께 설치됨
  - 설치 node 버전 확인 ( node -v )
  - 설치 npm 버전 확인 ( npm -v )

NVM으로 NODE의 버전 관리
  - NVM(Node.js version manager)은 Node의 version을 관리해 주는 틀

nvm의 주요 명령어
  - list or ls (설치되어 있는 node리스트 확인)
  - nvm install 16.16.0 // 16.16.0 버전 설치
  - nvm install latest // latest currn\ent version 설치
  - nvm install lts    // LTS version 설치
  - Uninstall          // node 삭제
  - use                // 사용할 node 버전 선택
  - current            // 사용중인 버전 확인


