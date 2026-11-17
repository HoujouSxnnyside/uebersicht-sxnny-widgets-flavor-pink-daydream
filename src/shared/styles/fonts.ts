import grechenFuemenBase64 from '../assets/fonts/grechen-fuemen-regular.woff2';
import nunitoBase64 from '../assets/fonts/nunito-latin-wght-normal.woff2';

/**
 * `@font-face` rule for the handwritten "Grechen Fuemen" face.
 *
 * The font file is embedded as base64 at build time, so no network access is needed.
 * Grechen Fuemen is licensed under the SIL Open Font License 1.1 (see `grechen-fuemen-OFL.txt`).
 */
export const grechenFuemenFontFace = `
@font-face {
  font-family: "Grechen Fuemen";
  src: url("data:font/woff2;base64,${grechenFuemenBase64}") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;

/**
 * `@font-face` rule for the self-hosted, variable "Nunito" face (Latin subset, weights 200-1000).
 *
 * The font file is embedded as base64 at build time, so no network access is needed.
 * Nunito is licensed under the SIL Open Font License 1.1 (see `nunito-OFL.txt`).
 */
export const nunitoFontFace = `
@font-face {
  font-family: "Nunito";
  src: url("data:font/woff2;base64,${nunitoBase64}") format("woff2");
  font-weight: 200 1000;
  font-style: normal;
  font-display: swap;
}
`;
