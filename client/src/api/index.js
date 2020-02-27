import loadable from "@loadable/component"; //code spliting

export { default as API } from "./API";
export const BASE_URL = loadable(() => import("./BaseURL"));

