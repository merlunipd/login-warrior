import { JSDOM } from "jsdom"
const dom = new JSDOM("css")
global.document = dom.window.document
global.window = dom.window

