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
  - **파일 이름(이미지 제외)**: `kebab-case` 사용 (예: `user-profile.html`)
  - **이미지 파일**: `kebab-case`에 마지막에 `_icon, _img`로 구분 (예: `main-home_icon`)
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
│   ├── css/               # CSS 파일들
│   │   ├── main.css          # 공통 스타일 파일
│   │   └── home.css          # 홈 페이지 전용 스타일 파일
│   ├── js/                # 자바스크립트 파일들
│   │   ├── main.js           # 공통 스크립트 파일
│   │   └── home.js           # 홈 페이지 전용 스크립트 파일
│   ├── images/            # 이미지 파일들
│   │   ├── logo.png
│   │   └── banner.jpg
│   ├── icons/             # 아이콘 파일들
│   │   ├── main-home_icon.png
│   │   └── notice_icon.png
│   └── fonts/             # 폰트 파일들
│       ├── custom-font.ttf
│       └── icon-font.woff
├── index.html             # 홈페이지
├── about.html             # 소개 페이지
└── contact.html           # 연락처 페이지

```

```
project/
├── src/
│   ├── components/         # 컴포넌트 별로 폴더 구성
│   │   ├── Navbar.js
│   │   └── Footer.js
│   └── pages/              # 페이지 별 구성
│       ├── Home.js
│       └── About.js
├── assets/
│   ├── css/                # 공통 CSS
│   ├── js/                 # 공통 JS
│   └── img/                # 공통 이미지
└── index.html
```


## 4. View 설계
- **Material UI**: https://mui.com/material-ui/
- **UI 스타일가이드**: 아래 이미지 참고, 지속적으로 업데이트 중

<img 
  src="UI Style Guide.png"
  width="90%"
  height="90%"
  />

## 5. 협업 규칙(Git)
  ### 브랜치 구조

1. **main 브랜치**
   - 배포 가능한 최종 코드가 저장되는 브랜치
   - 직접 개발하지 않으며, **모든 기능이 검증된 후에만 병합**

2. **develop 브랜치**
   - 개발 중인 코드가 모여있는 브랜치
   - 각 기능(feature) 브랜치에서 작업한 코드를 병합하는 중심 브랜치

3. **feature 브랜치**
   - 새로운 기능 개발 또는 버그 수정을 위한 독립적인 작업 브랜치
   - 기능 개발이 완료되면 **develop 브랜치**에 병합

```
main                  # 최종 배포 브랜치
│
└── develop           # 모든 기능이 병합되는 개발 브랜치
   │         
   ├── feat/login-page        # '로그인 페이지' 기능 개발 브랜치
   │   
   ├── feat/user-profile      # '사용자 프로필' 기능 개발 브랜치
   │   
   └── feat/payment-system    # '결제 시스템' 기능 개발 브랜치

```

  ### 커밋 컨벤션
  1. **영어컨벤션 + 한글 커밋 메시지** 형식으로 작성

  2. **영어컨벤션**은 5개만 사용 (Feat, Add, Modify, Style, Delete)
  - **Feat** : 기능 추가 (브랜치 맨처음 커밋할때, 기능 추가할때)
  - **Add** : 코드 추가 (어떠한 기능 내에 기능을 더 추가할 때)
  - **Modify** : 코드 수정 ( 버그 수정, 코드 지우고, 추가하고, 수정하는 모든 과정들 )
  - **Style** : 컴포넌트 및 UI 구현 (스타일드 컴포넌트)
  - **Delete** : 코드 삭제 (코드만 지우는것)

  3. 제목은 **50글자 이내**

  4. **제목 + 본문(선택)** 으로 구성 / 제목에서 설명하지 못하는 경우 본문에 자세히 작성

  5. 커밋메세지는 무엇을 했는지 파악할 수 있게 **자세히 작성**

  6. 어떻게 보다는 **무엇과 왜**를 설명하기

  7. 제목은 **명령문O, 과거형 X**

  8. 제목의 끝에는 **마침표를 넣지 않기**

  9. 한 개의 커밋에는 한 개의 기능/변경사항만 작성하도록 노력. **1커밋 1기능**

