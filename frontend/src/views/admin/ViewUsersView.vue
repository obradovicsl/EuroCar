<template>
  <div class="container p-4">
    <h1>Rent'a Car Objects</h1>

    <div class="search__section">
      <h3>Search</h3>
      <div class="row mb-4">
        <div class="col">
          <label for="firstName" class="form-label">First Name</label>
          <input type="text" class="form-control" v-model="firstName" />
        </div>
        <div class="col">
          <label for="lastName" class="form-label">Last Name</label>
          <input type="text" class="form-control" v-model="lastName" />
        </div>
        <div class="col">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="username" />
        </div>
        <div class="col col-btn">
          <button class="btn btn-primary" @click="searchUsers">Search</button>
        </div>
      </div>
    </div>

    <div class="filter__section">
      <div class="row mb-4">
        <div class="col">
          <label for="role" class="form-label">Role</label>
          <select class="form-select" v-model="role" @change="filterUsers">
            <option value="None">None</option>
            <option value="Customer">Customer</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div class="col">
          <label for="role" class="form-label">Suspicious Users</label>
          <select class="form-select" v-model="sus" @change="filterUsers">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div class="col">
          <label for="vehType" class="form-label">Sort</label>
          <select
            class="form-select"
            id="type"
            v-model="sortValue"
            @change="sort"
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="username">Username</option>
            <option value="points" v-if="role == 'Customer' ">Points</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 col-sm-6" v-for="user in users" :key="user.id">
        <UserCard :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from './../../components/UserCard.vue';
export default {
  data() {
    return {
      users: [],
      firstName: '',
      lastName: '',
      username: '',
      role: '',
      sus: '',
    };
  },
  name: 'HomeView',
  components: {
    UserCard,
  },
  async mounted() {
    const token = localStorage.getItem('user');
    let response = await fetch('http://127.0.0.1:3000/api/v1/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await response.json();
    this.users = data.data.users;
  },
  methods: {
    async searchUsers() {
      let token = localStorage.getItem('user');
      let response = await fetch(
        `http://127.0.0.1:3000/api/v1/users/search?firstName=${this.firstName}&lastName=${this.lastName}&username=${this.username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await response.json();
      this.users = data.data.users;
    },
    async filterUsers() {
      let token = localStorage.getItem('user');
      let response = await fetch(
        `http://127.0.0.1:3000/api/v1/users/filter?role=${this.role}&sus=${this.sus}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await response.json();
      this.users = data.data.users;
    },
    sort(){
        switch (this.sortValue) {
        case 'firstName':
          this.users.sort((a, b) => {
            if (a.firstName > b.firstName) {
              return -1; // a ide prije b
            } else if (a.firstName < b.firstName) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
        case 'lastName':
          this.users.sort((a, b) => {
            if (a.lastName > b.lastName) {
              return -1; // a ide prije b
            } else if (a.lastName < b.lastName) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
        case 'username':
          this.users.sort((a, b) => {
            if (a.username > b.username) {
              return -1; // a ide prije b
            } else if (a.username < b.username) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
        case 'points':
          this.users.sort((a, b) => {
            if (a.points > b.points) {
              return -1; // a ide prije b
            } else if (a.points < b.points) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
      }
    }
  },
};
</script>

<style>
.search__section {
  width: 60%;
  margin: 100px auto;
}

.col-btn {
  padding: 0;
}
</style>
