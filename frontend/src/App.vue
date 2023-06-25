<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">Objects</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'profile', params: { id: loggedUser.id } }"
                v-if="isLoged"
              >
                My profile
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'viewStore', params: { id: loggedUser.storeId } }"
                v-if="loggedUser.role == 'manager' && isLoged"
              >
                My store
              </router-link>
            </li>
            

            <li
              class="nav-item dropdown"
              v-if="loggedUser.role == 'admin' && isLoged"
            >
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin panel
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'createObject' }"
                  >
                    Create Object
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'createManager' }"
                  >
                    Create Manager
                  </router-link>
                </li>
              </ul>
            </li>

            

            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'login' }"
                v-if="!isLoged"
                >Login</router-link
              >
            </li>

            <button v-if="isLoged" class="btn btn-primary" @click="logout">
              Logout
            </button>
          </ul>
        </div>
      </div>
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
    };
  },

  methods: {
    logout() {
      this.isLoged = false;
      localStorage.removeItem('user');
      this.$router.push({ name: 'home' });
    },
  },
  async mounted() {
    document.title = 'Rent A Car';
    const token = localStorage.getItem('user');
    console.log(token);
    if (!token) return;
    const res = await fetch(`http://127.0.0.1:3000/api/v1/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    this.loggedUser = data.data.user;
    this.isLoged = true;
  },
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

/* nav {
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
} */
</style>
