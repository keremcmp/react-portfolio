// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Apply cursor hiding to everything imaginable */
  *, *::before, *::after,
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video,
  button, input, select, textarea {
    cursor: none !important;
    &:hover, &:active, &:focus {
      cursor: none !important;
    }
  }

  /* Apply to root elements */
  html, body, #root {
    cursor: none !important;
  }

  /* Your existing styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #0f0f0f;
    color: rgba(255, 255, 255, 0.9);
  }

  h1, h2, h3, h4, h5, h6 {
    color: rgba(255, 255, 255, 0.95);
  }

  p, span, div {
    color: rgba(255, 255, 255, 0.85);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #0f0f0f;
  }

  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default GlobalStyles;