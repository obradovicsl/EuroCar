<template>
  <div class="card pb-3">
    <img
      :src="vehicle.image"
      class="card-img-top card__image"
      alt="Card Image"
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">
        {{ this.vehicle.brand }} {{ this.vehicle.model }}
      </h5>
      <p class="card-text mb-4">
        {{ this.vehicle.transmission }}
        {{ this.vehicle.fuelType }}
      </p>

      <div class="d-grid gap-2 d-md-block">
        <button class="btn btn-primary" @click="updateVehicle" v-if="isOwner">
          Update
        </button>
        <button class="btn btn-danger" @click="deleteVehicle" v-if="isOwner">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vehicle', 'isOwner'],
  methods: {
    updateVehicle(){
      this.$router.push({
        name: 'updateVehicle',
        params: {
            id: this.vehicle.id,
        } 
      });
    }
  }
};
</script>

<style>
.card__image {
  width: 100%;
  height: 15vw;
  object-fit: contain;
}
</style>
