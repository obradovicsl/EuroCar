<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link :to="{ name: 'login' }" v-if="!isLoged">Login</router-link>
      <router-link
        :to="{ name: 'profile', params: { id: loggedUser.id } }"
        v-if="isLoged"
      >
        My profile
      </router-link>
      <button v-if="isLoged" class="btn_logout" @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoged: false,
      loggedUser: {},
      userRole: '',
    };
  },

  methods: {
    logout() {
      this.isLoged = false;
      localStorage.removeItem('user');
       this.$router.push({name: 'home'});
    },
  },
  mounted(){
    document.title = 'Rent A Car';
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.btn_logout {
  background: none;
  border: none;
  color: #2c3e50;
  font-weight: bold;
  cursor: pointer;
}
</style>
