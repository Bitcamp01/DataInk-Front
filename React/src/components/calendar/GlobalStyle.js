import React from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        src: url('./fonts/Pretendard-Regular.woff2') format('woff2'),
            url('./fonts/Pretendard-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'Pretendard', sans-serif;
    }
`;

export default GlobalStyle;
