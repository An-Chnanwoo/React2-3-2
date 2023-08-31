# React2-3-2

# 안찬우(201830220)

## 0831(1주차)

## 작성코드
#### 해당 날짜 실습 없음

## 학습내용
### Chapter Next.js
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
