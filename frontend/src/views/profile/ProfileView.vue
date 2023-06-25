<template>
  <div class="profile">
    <p>First name: {{ user.firstName }}</p>
    <p>Last name: {{ user.lastName }}</p>
    <p>Username: {{ user.username }}</p>
    <p>Gender: {{ user.gender }}</p>
    <p>Birth date: {{ user.birthDate }}</p>
    <p v-if="user.role == 'customer'">Points: {{ user.points }}</p>
    <p v-if="user.role == 'customer'">Customer type: {{ user.customerType }}</p>
    <button class="btn btn-primary" @click="updateProfile">Update Profile</button>

    <div v-if="user.role == 'customer'">
      <h2>Previous rentals:</h2>
      <div class="rentals" v-for="rent in user.rentals" :key="rent.id">
        <RentalCard :rent="rent" />
      </div>
    </div>
  </div>
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
    };
  },
  async mounted() {
    this.user = this.$root.loggedUser;
  },
  methods: {
    updateProfile() {
      this.$router.push({
        name: 'updateProfile',
      });
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
