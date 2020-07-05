import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle(
  (props) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
    }

    body {
      background: ${(props) => props.theme.colors.primaryDark};
      color: #fff;
      -webkit-font-smoothing: antialiased;
      max-width: 1280px;
      margin: 0 auto;
      padding: 14px;
    }

    body,
    input,
    button {
      font-family: Cabin, serif;
      font-size: 16px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong {
      font-weight: bold;
    }

    button {
      cursor: pointer;
    }
  `,
);
