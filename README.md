# HTML 작업 단계 프론트엔드 지침(수정 중)

## 1. HTML 구조 및 명명 규칙
- **시맨틱 태그 사용**: `header`, `nav`, `main`, `section`, `footer` 등을 사용해 페이지 구조를 명확하게 할 것
- **클래스 네이밍 (BEM 방식)**: BEM 방식을 따르며, `block__element--modifier` 형식으로 작성
- **명명 규칙**: HTML 요소, 변수, 함수, 파일 등에 일관된 네이밍 규칙을 적용

  ### 클래스 네이밍 (BEM 방식):
  - **Block**: 컴포넌트의 가장 큰 단위 (예: `header`, `card`)
  - **Element**: 블록의 하위 요소. 두 개의 언더스코어(`__`)로 연결 (예: `header__nav`, `card__title`)
  - **Modifier**: 상태나 스타일 변화를 나타내며, 두 개의 하이픈(`--`)으로 구분 (예: `card__title--highlighted`)

  ### 파일 및 변수 명명 규칙:
  - **파일 이름**: 소문자와 하이픈(`-`)을 사용 (예: `user-profile.html`)
  - **자바스크립트 변수/함수**: `camelCase` 사용 (예: `handleClick`, `userName`)
  - **상수**: `UPPER_SNAKE_CASE` 사용 (예: `MAX_LENGTH`, `DEFAULT_COLOR`)
  - **React 컴포넌트 이름**: `PascalCase` 사용 (예: `UserProfile.jsx`)
  - **테스트 파일 이름**: `.test.js` 또는 `.spec.js`로 끝냄 (예: `UserProfile.test.js`)
  - **CSS 클래스 이름**: `kebab-case` 사용 (예: `user-profile`, `main-header`)
  - **디렉토리 이름**: `kebab-case` 사용 (예: `user-profile/`)

  ### 예시:
  ```html
  <header class="header">
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item"><a href="#">Home</a></li>
      </ul>
    </nav>
  </header>


## 2. 코드 정리 규칙

- **들여쓰기**: 4칸으로 통일
- **주석 사용**: 복잡한 코드나 섹션에 적절한 주석 추가할 것
- **링크와 이미지 관리**: 상대 경로 사용
- **alt 속성**: 모든 이미지에 적절한 alt 속성을 추가
- **ARIA 속성**: 버튼이나 링크의 역할을 명확히 정의해야 할 때, 적절한 ARIA 속성을 사용

## 3. 파일 및 폴더 구조

- **HTML, CSS, JS 파일**: 페이지별로 파일을 분리
- **assets 폴더**: css, fonts, images, scripts 폴더

  ### 파일 구조 예시:

```
project/
├── assets/
│   ├── css/
│   │   └── main.css       # 공통 스타일
│   ├── fonts/             # 폰트 파일
│   ├── images/            # 이미지 파일
│   └── scripts/           # JavaScript 파일
└── index.html             # 공통 페이지

```

## 4. 사용 라이브러리

## 5. 협업 규칙(Git)
