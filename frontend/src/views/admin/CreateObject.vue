<template>
<div class="container">

    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="name">
      </div>

      <div class="mb-3">
        <label for="workingHours" class="form-label">Working hours</label>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="Open at" v-model="openAt">
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Closed at" v-model="closedAt">
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="location" class="form-label">Location</label>
        <input type="text" class="form-control mb-4" id="location" v-model="address">

        <div style="height:400px; width:1200px container">
          <l-map ref="map" :zoom="zoom" :center="[47.41322, -1.219482]" @ready="doSomethingOnReady">
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
      </div>

      <div class="mb-3">
        <label for="manager" class="form-label">Manager</label>
        <select class="form-select" id="manager" v-model="selectedManager" v-if="availableManagers.length != 0">
          <option v-for="manager in availableManagers" :key="manager.id" :value="manager.id">{{ manager.firstName }}</option>
        </select>
        <div v-if="availableManagers.length == 0">
        <p>THERE IS NO AWAILABLE MANAGERS!</p>
        <button @click="createManagerHandle">CREATE ONE</button>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
</template>

<script>

export default {

  data() {
    return {
      zoom: 13,
      latitude: null,
      longitude: null,
      address: '',
      markerLatLng: [12, 13],
      availableManagers: [],
      selectedManager: {},
    };
  },
  methods:{
    getCurrentCoordinates() {
    return new Promise(function(resolve, reject) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        }, function(error) {
          reject(error);
        });
      } else {
        reject(new Error("Geolokacija nije podržana u browseru."));
      }
    });
   },
    doSomethingOnReady() {
        this.map = this.$refs.map.leafletObject;
        this.map.panTo([this.latitude, this.longitude]);

        this.map.on('click', async function(e) {
        var clickedLatLng = e.latlng;
        this.markerLatLng = clickedLatLng;

        var apiUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + clickedLatLng.lat + '&lon=' + clickedLatLng.lng;

        const data = await fetch(apiUrl);
        const res = await data.json();
        console.log(res.address);
        this.address = `${res.address.road} ${res.address.house_number || ''} ${res.address.city}`;
      });
    },
    mapClickHandler(event){
      console.log(event);
    },
    createManagerHandle(){
      this.$router.push({name: 'createManager'});
    }
  },
  async mounted(){
    const res = await this.getCurrentCoordinates();
    this.latitude = res.latitude;
    this.longitude = res.longitude;

    let token = localStorage.getItem('user');
    const response = await fetch('http://127.0.0.1:3000/api/v1/managers/available', {
                    method: 'GET',
                    headers: {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`,
                    }
                  });
      const data = await response.json();
      this.availableManagers = data.data.availableManagers;
  }
    
}
</script>

<style>
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>