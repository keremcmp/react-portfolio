import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Light theme */
    --bg-primary: #ffffff;
    --bg-secondary: rgba(255, 255, 255, 0.95);
    --nav-bg: rgba(255, 255, 255, 0.8);
    --text-primary: rgba(15, 15, 15, 0.9);
    --text-secondary: rgba(15, 15, 15, 0.85);
    --accent: #8b5cf6;
    --scrollbar-bg: #f0f0f0;
    --scrollbar-thumb: #c0c0c0;
  }

  [data-theme='dark'] {
    /* Dark theme - matching your current colors */
    --bg-primary: #0f0f0f;
    --bg-secondary: rgba(15, 15, 15, 0.98);
    --nav-bg: rgba(15, 15, 15, 0.8);
    --text-primary: rgba(255, 255, 255, 0.9);
    --text-secondary: rgba(255, 255, 255, 0.85);
    --accent: #8b5cf6;
    --scrollbar-bg: #0f0f0f;
    --scrollbar-thumb: #333;
  }

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

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
  }

  p, span, div {
    color: var(--text-secondary);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--scrollbar-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 4px;
  }

  a {
    text-decoration: none;
    color: var(--text-primary);
  }
`;

export default GlobalStyles;