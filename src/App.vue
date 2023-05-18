<template>
  <div>
      <router-view></router-view>
      <!-- <about-view></about-view> -->
  </div>
</template>
<script>
//  import AboutView from "./views/AboutView.vue"

export default({
 components:{
  // HomeView
  // AboutView
 }
})
</script>

<style>
html,
body {
  margin: 0px;
  height: 100%;
}
#app{
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
