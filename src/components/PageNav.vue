<docs>
  The page top navigation bar.
</docs>

<template lang="html">
  <nav>
    <div class="nav-col">
      <span class="logo">Bradley Zhou</span>
    </div>
    <div class="nav-col menu">
      <ul>
        <li><router-link :to="{name: 'PostsList'}">Blog</router-link></li>
        <!-- <li><a href="#">Projects</a></li> -->
        <li><router-link :to="{name: 'About'}">About</router-link></li>
        <li v-if="$auth.authenticated">
          <router-link :to="{name: 'Write'}">Write</router-link>
        </li>
        <li v-if="$auth.authenticated">
          <a href='javascript:;' @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'page-nav',
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="css">
nav {
  width: 100%;
  height: 50px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-bottom: 1px solid #D0DAF1;
}

nav .nav-col {
  float: left;
  width: 50%;
  display: flex;
  align-items: center;
}

nav .logo {
  display: inline-block;
  font-family: sans-serif;
  font-size: 1.77em;
  color: #00226A;
  line-height: 25px;
  margin: auto auto auto 40px;
  height: auto;
}

.nav-col.menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

nav ul {
  list-style-type: none;
  height: 100%;
  margin: 0px 40px 0px 0px;
  padding: 0px;
  position: relative;
}

nav ul li {
  display: inline-flex;
  margin: auto;
  height: 100%;
  box-sizing: border-box;
  color: #00226A;
  opacity: 0.75;
  transition: 300ms ease-in-out;
}

nav ul li a {
  height: auto;
  margin: auto;
  font-size: 1.33em;
  color: inherit;
  text-decoration: none;
  padding: 0px 10px;
}

nav ul li:hover{
  opacity: 1.0;
}

</style>
