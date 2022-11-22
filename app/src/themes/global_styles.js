import React from 'react'
import { normalize } from 'polished'
import { Global, css } from '@emotion/react'

const GlobalStyles = () => <Global styles={css`
  ${normalize()}

  * {
    box-sizing: border-box;
  }

  html, body {
    overflow-x: auto;
    background-color: #F6F6F6;
    height: 100%;
  }

  html {
    font-size: 62.5%;
    line-height: 1.25;
    scroll-behavior: smooth;
  }

  body {
    font-size: 1.4rem;
    color: #333;
    font-family: 'Roboto';
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6,
  button,
  nav {
    font-weight: 700;
  }

  h1 {
    font-size: 3.2rem;
  }
  h2 {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 1.8rem;
  }
  h4 {
    font-size: 1.6rem;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  svg {
    margin-right: 1rem;
  }
`} />

export default GlobalStyles
