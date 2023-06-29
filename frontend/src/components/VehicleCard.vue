<template>
  <div class="card pb-3">
    <CarModal :car="car" v-if="isVisible" @close="closeModal" />
    <ChooseModal v-if="isVisibleDelete" @sure="deleteCar" @close="closeDeleteModal" />

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
        {{ this.vehicle.type }}
        {{ this.vehicle.transmission }}
        {{ this.vehicle.fuelType }}
      </p>
      <p class="card-text">
        <button class="btn" @click="showCarModal">View Car</button>
      </p>

      <div class="d-grid gap-2 d-md-block">
        <button class="btn btn-primary" @click="updateVehicle" v-if="isOwner">
          Update
        </button>
        <button class="btn btn-danger" @click="showDeleteModal" v-if="isOwner">
          Delete
        </button>
        <button class="btn btn-primary" @click="addToCart" v-if="canRent">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CarModal from './CarModal';
import ChooseModal from './ChooseModal.vue';
export default {
  props: ['vehicle', 'isOwner', 'canRent'],
  data() {
    return {
      isVisible: false,
      isVisibleDelete: false,
    };
  },
  components: { CarModal, ChooseModal },
  methods: {
    updateVehicle() {
      this.$router.push({
        name: 'updateVehicle',
        params: {
          id: this.vehicle.id,
        },
      });
    },
    showCarModal() {
      this.car = this.vehicle;
      this.isVisible = true;
    },
    closeModal() {
      this.isVisible = false;
    },
    showDeleteModal() {
      this.isVisibleDelete = true;
    },
    closeDeleteModal() {
      this.isVisibleDelete = false;
    },
    async deleteCar(){
      this.isVisibleDelete = false;
      let token = localStorage.getItem('user');
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/vehicles/${this.vehicle.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.$emit('delete');
    },
    async addToCart() {
      let token = localStorage.getItem('user');
      const res = await fetch(`http://127.0.0.1:3000/api/v1/users/basket/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId: this.vehicle.id,
          daysNum: this.$root.daysNum,
        }),
      });
      const data = await res.json();
      this.$root.loggedUser = data.data.user;
    },
  },
};
</script>

<style>
.card__image {
  width: 100%;
  height: 15vw;
  object-fit: contain;
}
</style>
