<template>
  <div class="card mb-4 mb-md-0">
    <CarModal :car="car" v-if="isVisible" @close="closeModal" />
    <RejectReason
      v-if="isVisibleReason"
      @reject="rejectReason"
      @close="hideRejectModal"
    />

    <img
      :src="rent.object.logo"
      class="card-img-top"
      alt=""
    />
    <div class="card-body">
      <h5 class="card-title">{{ rent.object.name }}</h5>
      <p class="card-text">
        From: {{ startDate }} | Duration: {{ rent.rentalDuration }} day
      </p>
      <p class="card-text">Price: ${{ rent.price }}</p>
      <p class="card-text">Status: {{ rent.status }} <span v-if="rent.status == 'REJECTED'">| Reason: {{rent.reason}}</span></p>
      <div class="vehicles">
        <h5>Rented vehicles:</h5>
        <button
          class="btn veh-btn"
          v-for="vehicle in rent.vehicles"
          :key="vehicle.id"
          :data-vehId="vehicle.id"
          @click="showCarModal(vehicle)"
        >
          {{ vehicle.brand }} {{ vehicle.model }}
        </button>
      </div>

      <button
        v-if="user.role == 'customer' && rent.status == 'PROCESSING'"
        class="btn btn-primary action"
        @click="cancelRental"
      >
        Cancel
      </button>
      <div
        class="mt-4 action"
        v-if="user.role == 'manager' && rent.status == 'PROCESSING'"
      >
        <button class="btn btn-success" @click="updateRental('APPROVED')">Approve</button>
        <button class="btn btn-danger" @click="showRejectModal">Reject</button>
      </div>
      <button
        v-if="user.role == 'manager' && rent.status == 'APPROVED'"
        class="btn btn-primary action"
        @click="updateRental('POSSESSED')"
      >
        Possess
      </button>
      <button
        v-if="user.role == 'manager' && rent.status == 'POSSESSED'"
        class="btn btn-primary action"
        @click="updateRental('RETURNED')"
      >
        Return
      </button>
    </div>
  </div>
</template>

<script>
import CarModal from './CarModal';
import RejectReason from './RejectReason';
export default {
  props: ['rental', 'user'],
  data() {
    return {
      rent: { object: { name: '' }, vehicles: [] },
      startDate: '',
      isVisible: false,
      isVisibleReason: false,
      car: {},
    };
  },
  components: { CarModal, RejectReason },
  mounted() {
    this.rent = this.rental;
    var options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    this.startDate = new Date(this.rental.startDate);
    this.startDate = this.startDate.toLocaleString('en-US', options);
  },
  methods: {
    showCarModal(car) {
      this.car = car;
      this.isVisible = true;
    },
    closeModal() {
      this.isVisible = false;
    },
    async cancelRental() {
      let token = localStorage.getItem('user');
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/rentals/cancel/${this.rent.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      this.rent = data.data.newRental;
    },
    showRejectModal() {
      this.isVisibleReason = true;
    },
    hideRejectModal() {
      this.isVisibleReason = false;
      console.log('hide');
    },
    async rejectReason(reason){
        let token = localStorage.getItem('user');
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/rentals/${this.rent.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
            body: JSON.stringify({
            newStatus: "REJECTED",
            reason: reason,
          }),
        }
      );
      const data = await res.json();
      this.rent = data.data.newRental;
    },
    async updateRental(status) {
        let token = localStorage.getItem('user');
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/rentals/${this.rent.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
            body: JSON.stringify({
            newStatus: status,
          }),
        }
      );
      const data = await res.json();
      this.rent = data.data.newRental;
      console.log(this.rent);
    },
  },
};
</script>

<style scoped>
.card {
  flex-direction: row;
  position: relative;
}
.card img {
  width: 20%;
  border-radius: 0;
  object-fit: cover;
}

.card-body {
  text-align: left;
}

.card-title {
  font-size: 32px;
  margin-bottom: 20px;
}

.veh-btn {
  background: #3bc9db;
  color: #fff;
  padding: 2px 16px;
  border-radius: 30px;
}

.veh-btn:not(:last-child) {
  margin-right: 10px;
}

.action {
  position: absolute;
  bottom: 3px;
  right: 3px;
}
</style>
