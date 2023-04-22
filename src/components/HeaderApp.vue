<template lang="html">
  <div class="header">
    <div class="menu-nav">
      <ul class="nav-list">
        <li>
          <router-link to="/">Main</router-link>
        </li>
        <li>
          <router-link to="/favorites">Favorites</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
}
.nav-list {
  display: flex;
  list-style-type: none;
}
.nav-list > li {
  margin: 0 20px 0 0;
}
.nav-list > li > a {
  text-decoration: none;
  font-size: 1.2em;
}
.router-link-active,
.router-link-exact-active {
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}
</style>
