/** Font files are bundled as base64 strings (see `scripts/build.ts`). */
declare module '*.woff2' {
  const base64: string;
  export default base64;
}
