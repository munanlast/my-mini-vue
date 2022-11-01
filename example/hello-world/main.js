import { createApp } from "../../lib/guide-mini-vue.esm";
import { App } from "./App";

const app = document.getElementById("app");
createApp(App).mounted(app);
