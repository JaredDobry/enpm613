/// <reference types="react-scripts" />

declare module "*.docx" {
  const src: string;
  export default src;
}

declare module "*.pdf" {
  const src: string;
  export default src;
}
