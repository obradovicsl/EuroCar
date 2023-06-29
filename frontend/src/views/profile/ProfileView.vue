<template>
  <section style="background-color: #eee">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                class="rounded-circle img-fluid"
                style="width: 150px"
              />
              <h5 class="my-3">{{ user.firstName }} {{ user.lastName }}</h5>
              <p class="text-muted mb-1">{{ user.role }}</p>
              <div class="d-flex justify-content-center mb-2">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="updateProfile"
                >
                  Update profile
                </button>
                <button type="button" class="btn btn-outline-primary ms-1">
                  Message
                </button>
              </div>
            </div>
          </div>
          <div class="card mb-4 mb-lg-0">
            <div class="card-body p-4" v-if="user.role != 'admin'">
              <h3>Search</h3>
              <form class="row g-3" @submit.prevent="search">
                <div class="col-12" v-if="$root.loggedUser.role == 'customer'">
                  <input
                    type="text"
                    class="form-control"
                    v-model="storeName"
                    placeholder="Store Name"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    v-model="minPrice"
                    placeholder="Min price"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    v-model="maxPrice"
                    placeholder="Max price"
                  />
                </div>
                <div class="col-md-6">
                  <label for="startDate" class="form-label">Start Date</label>

                  <input
                    type="date"
                    class="form-control"
                    v-model="startDate"
                    placeholder="Start date"
                  />
                </div>
                <div class="col-md-6">
                  <label for="endDate" class="form-label">End Date</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="endDate"
                    placeholder="End date"
                  />
                </div>
                <div>
                  <button class="btn btn-primary">Search</button>
                </div>
              </form>

              <h3 class="mt-4">Sort by</h3>
              <select class="form-select" v-model="sortValue" @change="sort">
                <option value="Name" v-if="$root.loggedUser.role == 'customer'">
                  Name
                </option>
                <option value="Price">Price</option>
                <option value="Date">Date</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">
                    {{ user.firstName }} {{ user.lastName }}
                  </p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Username</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.username }}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Birth Date</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.birthDate }}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Gender</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.gender }}</p>
                </div>
              </div>
              <hr />
              <div class="row" v-if="user.role == 'customer'">
                <div class="col-sm-3">
                  <p class="mb-0">Points</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ Math.trunc(user.points*100) / 100 }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="user.role != 'admin'">
            <h1>Your Rentals</h1>
            <div
              class="col-md-12 mb-4"
              v-for="rental in rentals"
              :key="rental.id"
            >
              <RentalCard
                :rental="rental"
                :user="user"
                @update="updateUser"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RentalCard from '../../components/RentalCard';

export default {
  components: {
    RentalCard,
  },
  data() {
    return {
      id: this.$route.params.id,
      user: {},
      rentals: [],
      storeName: '',
      minPrice: '',
      maxPrice: '',
      startDate: '',
      endDate: '',
      sortValue: '',
    };
  },
  async mounted() {
    await this.fetchRentals();
  },
  methods: {
    updateProfile() {
      this.$router.push({
        name: 'updateProfile',
      });
    },
    async fetchRentals() {
      const token = localStorage.getItem('user');
      this.user = await this.fetchUser(token);
      if (this.user.role == 'customer')
        this.rentals = await this.customerRentals(token);
      if (this.user.role == 'manager')
        this.rentals = await this.managerRentals(token);
    },
    async customerRentals(token) {
      const res = await fetch(
        'http://127.0.0.1:3000/api/v1/rentals/customers',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data.data.rentals;
    },
    async managerRentals(token) {
      const res = await fetch('http://127.0.0.1:3000/api/v1/rentals/managers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data.data.rentals;
    },
    async fetchUser(token) {
      const res = await fetch('http://127.0.0.1:3000/api/v1/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data.data.user;
    },
    async search() {
      let token = localStorage.getItem('user');
      let response = await fetch(
        `http://127.0.0.1:3000/api/v1/rentals/search?storeName=${this.storeName}&minPrice=${this.minPrice}&maxPrice=${this.maxPrice}&startDate=${this.startDate}&endDate=${this.endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await response.json();
      this.rentals = data.data.newRentals;
    },
    async sort() {
      switch (this.sortValue) {
        case 'Name':
          this.rentals.sort((a, b) => {
            if (a.object.name > b.object.name) {
              return -1; // a ide prije b
            } else if (a.object.name < b.object.name) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
        case 'Price':
          this.rentals.sort((a, b) => {
            if (a.price > b.price) {
              return -1; // a ide prije b
            } else if (a.price < b.price) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
        case 'Date':
          this.rentals.sort((a, b) => {
            if (a.startDate > b.startDate) {
              return -1; // a ide prije b
            } else if (a.startDate < b.startDate) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
      }
    },
    updateUser(user) {
      this.user = user;
    },
  },
};
</script>

<style>
.profile {
  text-align: center;
}
.rentals {
  margin: 0 auto;
}
</style>
