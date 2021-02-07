import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @font-face {
    font-family: 'Elektra Medium Pro';
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* Read next point */
    src: url('/fonts/elektra/elektra_medium_pro_regular-webfont.woff2') format('woff2'),
         url('/fonts/elektra/elektra_medium_pro_regular-webfont.woff') format('woff');
  }

  html {
    font-size: calc(0.85em + 0.25vw);
  }

  h1, h2, h3 {
    font-family: 'Elektra Medium Pro';
    text-transform: uppercase;
    color: ${props => props.theme.palette.primary} !important;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.25em;
  }

  h4 {
    font-size: 1.125em;
  }

  body {
    background: url('/images/background-image-${props => props.theme.type}.png')
  }

  a.link.link {
    color: ${props => props.theme.palette.link};

    :hover {
      color: ${props => props.theme.palette.link_hover};
    }
  }
`
