# @jswf/react

Virtual window component for Vue.js

## １．Contents

### 1.1 Basic explanation

Components for realizing virtual windows with Vue.js
Just enclose with JSWindow and it will become a virtual window

### 1.2 Currently available features

- MoveWindow
- Resize
- Maximize
- Minimize
- Parent-child window
- SplitScreen

## ２．Screen shot

![Screen Shot](https://raw.githubusercontent.com/JavaScript-WindowFramework/vue/screenshot/screenshot.gif)

## ３．links

- Source code
[https://github.com/JavaScript-WindowFramework/vue](https://github.com/JavaScript-WindowFramework/vue)

- Sample Source
[https://github.com/JavaScript-WindowFramework/jswf-vue-sample](https://github.com/JavaScript-WindowFramework/jswf-vue-sample)

- Sample Page
[https://javascript-windowframework.github.io/jswf-vue-sample/][https://javascript-windowframework.github.io/jswf-vue-sample/]

## ４．Sample source

```tsx:index.tsx
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- Add JSWindow-->
    <JSWindow title="Virtual Window">
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </JSWindow>
    <!---------------->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { JSWindow } from "@jswf/vue"; //Add
export default {
  name: "app",
  components: {
    HelloWorld,
    JSWindow //Add
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## ５．Component list

[JSWindow](https://ttis.croud.jp/?uuid=d1808593-1825-4de5-bf53-b9d2109f3604)
SplitView

## ６．license

MIT
