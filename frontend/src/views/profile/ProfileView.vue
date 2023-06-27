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
                <button type="button" class="btn btn-primary" @click="updateProfile">
                  Update profile
                </button>
                <button type="button" class="btn btn-outline-primary ms-1">
                  Message
                </button>
              </div>
            </div>
          </div>
          <div class="card mb-4 mb-lg-0">
            <div class="card-body p-0">
              <ul class="list-group list-group-flush rounded-3">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3"
                >
                  <i class="fas fa-globe fa-lg text-warning"></i>
                  <p class="mb-0">https://mdbootstrap.com</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3"
                >
                  <i class="fab fa-github fa-lg" style="color: #333333"></i>
                  <p class="mb-0">mdbootstrap</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3"
                >
                  <i class="fab fa-twitter fa-lg" style="color: #55acee"></i>
                  <p class="mb-0">@mdbootstrap</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3"
                >
                  <i class="fab fa-instagram fa-lg" style="color: #ac2bac"></i>
                  <p class="mb-0">mdbootstrap</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3"
                >
                  <i class="fab fa-facebook-f fa-lg" style="color: #3b5998"></i>
                  <p class="mb-0">mdbootstrap</p>
                </li>
              </ul>
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
                  <p class="text-muted mb-0">{{ user.points }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="user.role != 'admin'">
            <h1>Your Rentals</h1>
            <div class="col-md-12 mb-4" v-for="rental in rentals" :key="rental.id">
              <RentalCard :rental="rental" :user="user"/>
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
    };
  },
  async mounted() {
    const token = localStorage.getItem('user');
    this.user = await this.fetchUser(token);
    if (this.user.role == 'customer')
      this.rentals = await this.customerRentals(token);
    if (this.user.role == 'manager')
      this.rentals = await this.managerRentals(token);
  },
  methods: {
    updateProfile() {
      this.$router.push({
        name: 'updateProfile',
      });
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
