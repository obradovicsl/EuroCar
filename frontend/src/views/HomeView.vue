<template>
  <div class="container p-4">
    <h1>Rent'a Car Objects</h1>
    <div class="search__section">
      <div class="row mb-4">
        <div class="col">
          <label for="name" class="form-label">Store Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="col">
          <label for="vehType" class="form-label">Vehicle Type</label>
          <select class="form-select" id="type" v-model="type">
            <option value="Van">Van</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Car">Car</option>
          </select>
        </div>
        <div class="col">
          <label for="location" class="form-label">Location</label>
          <input type="text" class="form-control" v-model="location" />
        </div>
        <div class="col">
          <label for="rating" class="form-label">Rating</label>
          <input type="text" class="form-control" v-model="rating" />
        </div>
      </div>
      <div class="row mt-2">
        <button class="btn btn-primary" @click="searchObjects">Search</button>
      </div>
    </div>

    <div class="filter__section">
      <div class="row mb-4">
        <div class="col">
          <label for="fuelType" class="form-label">Fuel type</label>
          <select
            class="form-select"
            id="fuelType"
            v-model="fuelFilter"
            @change="filter"
          >
            <option value="None">None</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>
        <div class="col">
          <label for="vehType" class="form-label">Vehicle Type</label>
          <select
            class="form-select"
            id="type"
            v-model="typeFilter"
            @change="filter"
          >
            <option value="None">None</option>
            <option value="Van">Van</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Car">Car</option>
          </select>
        </div>
        <div class="col">
          <label for="vehType" class="form-label">Only open objects</label>
          <select
            class="form-select"
            id="type"
            v-model="openFilter"
            @change="filter"
          >
            <option value="True">True</option>
            <option value="False">False</option>
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
            <option value="Name">Name</option>
            <option value="Address">Address</option>
            <option value="Rating">Rating</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-3 col-sm-6"
        v-for="object in objects"
        :key="object.id"
      >
      <div class="card">
        <RentCarCard :object="object" />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import RentCarCard from './../components/RentCarCard';

export default {
  data() {
    return {
      objects: [],
      name: '',
      type: '',
      location: '',
      rating: 0,
      fuelFilter: '',
      typeFilter: '',
      openFilter: '',
      sortValue: '',
    };
  },
  name: 'HomeView',
  components: {
    RentCarCard,
  },
  async mounted() {
    let response = await fetch('http://127.0.0.1:3000/api/v1/objects/');
    let data = await response.json();
    this.objects = data.data.objects;
    this.objects.sort((a, b) => {
      if (a.open && !b.open) {
        return -1; // a ide prije b
      } else if (!a.open && b.open) {
        return 1; // b ide prije a
      } else {
        return 0; // nema promjene u redoslijedu
      }
    });
  },
  methods: {
    async searchObjects() {
      let response = await fetch(
        `http://127.0.0.1:3000/api/v1/objects/search?name=${this.name}&rating=${this.rating}&address=${this.location}&vehicleType=${this.type}`
      );
      let data = await response.json();
      this.objects = data.data.objects;
    },
    async filter() {
      let response = await fetch(
        `http://127.0.0.1:3000/api/v1/objects/filter?fuelType=${this.fuelFilter}&type=${this.typeFilter}&open=${this.openFilter}`
      );
      let data = await response.json();
      this.objects = data.data.objects;
    },
    async sort() {
      switch (this.sortValue) {
        case 'Name':
          this.objects.sort((a, b) => {
            if (a.name > b.name) {
              return -1; // a ide prije b
            } else if (a.name < b.name) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
        case 'Address':
          this.objects.sort((a, b) => {
            if (a.location.address > b.location.address) {
              return -1; // a ide prije b
            } else if (a.location.address < b.location.address) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
        case 'Rating':
          this.objects.sort((a, b) => {
            if (a.rating > b.rating) {
              return -1; // a ide prije b
            } else if (a.rating < b.rating) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
.search__section {
  width: 60%;
  margin: 100px auto;
}
.home {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
