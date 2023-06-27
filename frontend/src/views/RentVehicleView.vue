<template>
  <div class="container">
    <h1>Pick a date</h1>
    <div class="search__section">
      <form class="form" @submit.prevent="getAvailableVehicles">
        <label for="startDate" class="form-label">Start date:</label>
        <input
          type="date"
          class="form-control date"
          id="startDate"
          name="startDate"
          v-model="start"
        />
        <label for="endDate" class="form-label">End date:</label>
        <input
          type="date"
          class="form-control date"
          id="endDate"
          name="endDate"
          v-model="end"
        />
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </div>

    <div class="row mb-4" v-if="vehicles.length != 0">
      <h1>Available vehicles</h1>
      <div
        class="col-sm-6 col-md-4 col-lg-3"
        v-for="vehicle in vehicles"
        :key="vehicle.id"
      >
        <VehicleCard :vehicle="vehicle" :isOwner="false" :canRent="true" />
      </div>
    </div>

  </div>
</template>

<script>
import VehicleCard from './../components/VehicleCard';
export default {
  data() {
    return {
      vehicles: [],
      start: '',
      end: '',
    };
  },
  components: {
    VehicleCard
  },
  methods: {
     async getAvailableVehicles() {
      let startDate = new Date(this.start);
      let endDate = new Date(this.end);

      this.$root.daysNum =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

      startDate = startDate.toISOString();
      endDate = endDate.toISOString();

      this.$root.startDate = startDate;

      const token = localStorage.getItem('user');

      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/vehicles/available?start=${startDate}&end=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      this.vehicles = data.data.availableVehicles;
    },
  },
};
</script>

<style></style>
