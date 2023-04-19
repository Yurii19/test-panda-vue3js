<template lang="html">
  <div class="header">
    <div class="menu-nav">
      <ul class="nav-list">
        <li>
          <a href="#">Main</a>
        </li>
        <li>
          <a href="#">Selected</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import { Options, Vue } from "vue-class-component";
// @Options({})
export default {};
</script>

<style scoped>
.header {
  background-color: antiquewhite;
}
.nav-list {
  display: flex;
  /* justify-content: space-around; */
  list-style-type: none;
  /* width: 20%; */
}
.nav-list > li {
  margin: 0 20px 0 0;
}
.nav-list > li > a {
  /* border: 1px solid blue; */
  text-decoration: none;
  font-size: 1.2em;
}
</style>
