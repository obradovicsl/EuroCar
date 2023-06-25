<template>
  <div class="container pt-4">
    <div class="main">
      <img :src="store.logo" />
      <div class="rating">
        <h1>{{ store.name }}</h1>
        <p>Ocena: {{ store.rating }}</p>
      </div>
    </div>

    <div class="second">
      <p>
        Radno vreme:
        <span>{{ store.workingHours }} - {{ store.workingHours }}</span>
      </p>
      <p v-if="store.open">OTVORENO</p>
      <p v-if="!store.open">ZATVORENO</p>
      <!-- <p>Adresa: {{store.location.address}}</p> -->
    </div>

    <div style="height: 400px; width: 1200px container" class="map__container">
      <l-map
        ref="map"
        :zoom="zoom"
        :center="[44.2440337, 19.7943494]"
        @ready="doSomethingOnReady"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker
          :lat-lng="markerLatLng"
          ref="marker"
          v-if="markerLatLng"
        ></l-marker>
      </l-map>
    </div>

    <h1 class="veh_header">Vehicles</h1>
    <button class="btn btn-primary mb-4" v-if="isOwner" @click="addNewVehicle">
      Add New Vehicle
    </button>

    <div class="row mb-4" v-if="store.vehicles">
      <div
        class="col-sm-6 col-md-4 col-lg-3"
        v-for="vehicle in store.vehicles"
        :key="vehicle.id"
      >
        <VehicleCard :vehicle="vehicle" :isOwner="isOwner" />
      </div>
    </div>

    <div class="row mb-4" v-if="!vehicles.length">
      <p>No vehicles</p>
    </div>

    <h1 class="comment_header">Reviews</h1>
    <!-- <div class="row mb-4">
      <div
        class="col-sm-6 col-md-4 col-lg-3"
        v-for="vehicle in store.vehicles"
        :key="vehicle.id"
      >
        <VehicleCard :vehicle="vehicle" />
      </div>
    </div> -->
  </div>
</template>

<script>
import VehicleCard from './../components/VehicleCard';

export default {
  data() {
    return {
      id: this.$route.params.id,
      latitude: 0,
      longitude: 0,
      markerLatLng: [0, 0],
      zoom: 13,
      store: {},
      isOwner: false,
      vehicles: [],
    };
  },
  components: {
    VehicleCard,
  },
  async mounted() {
    const token = localStorage.getItem('user');
    const res = await fetch(`http://127.0.0.1:3000/api/v1/objects/${this.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    this.store = data.data.object;
    this.latitude = this.store.location.lat;
    this.longitude = this.store.location.lon;
    this.markerLatLng = new Array();
    this.markerLatLng.push(this.latitude);
    this.markerLatLng.push(this.longitude);
    this.vehicles = this.store.vehicles;
    if (this.map) {
      this.doSomethingOnReady();
    }
    if (
      this.$root.loggedUser.role == 'manager' &&
      this.store.id == this.$root.loggedUser.storeId
    )
      this.isOwner = true;
  },
  methods: {
    doSomethingOnReady() {
      this.map = this.$refs.map.leafletObject;
      this.map.panTo([this.latitude, this.longitude]);
    },
    addNewVehicle(){
        this.$router.push({ name: 'createVehicle' });
    }
  },
};
</script>

<style>
.main {
  display: flex;
  margin-bottom: 50px;
  align-items: center;
  gap: 300px;
}

.main img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}

.second {
  text-align: left;
  margin-bottom: 50px;
}

.map__container {
  margin-bottom: 100px;
}

.veh_header {
  margin-bottom: 30px;
}
</style>
