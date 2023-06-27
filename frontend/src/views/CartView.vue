<template>
  <section class="h-100 h-custom" style="background-color: #d2c9ff">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div
            class="card card-registration card-registration-2"
            style="border-radius: 15px"
          >
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div
                      class="d-flex justify-content-between align-items-center mb-5"
                    >
                      <h1 class="fw-bold mb-0 text-black">Cart</h1>
                      <h6 class="mb-0 text-muted">
                        {{ $root.loggedUser.basket.totalQuantity }} items
                      </h6>
                    </div>
                    <hr class="my-4" />

                    <div
                      class="row mb-4 d-flex justify-content-between align-items-center"
                      v-for="vehicle in $root.loggedUser.basket.vehicles"
                      :key="vehicle.vehicle.id"
                    >
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          :src="vehicle.vehicle.image"
                          class="img-fluid rounded-3"
                          :alt="vehicle.vehicle.brand"
                        />
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">Car</h6>
                        <h6 class="text-black mb-0">
                          {{ vehicle.vehicle.brand }}{{ vehicle.vehicle.model }}
                        </h6>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          class="btn px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                        >
                          <i class="fas fa-minus">-</i>
                        </button>

                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          :value="vehicle.quantity"
                          type="number"
                          class="form-control form-control-sm"
                        />

                        <button
                          class="btn px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                          @click="addVehicleToBasket(vehicle.vehicle.id)"
                        >
                          <i class="fas fa-plus">+</i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">€ {{ vehicle.price }}</h6>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-muted"
                          ><i class="fas fa-times"></i
                        ></a>
                      </div>
                    </div>

                    <hr class="my-4" />

                    <div class="pt-5">
                      <h6 class="mb-0">
                        <a href="#!" class="text-body" @click="backToShop"
                          ><i class="fas fa-long-arrow-alt-left me-2"></i>Back
                          to shop</a
                        >
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase">
                        items {{ $root.loggedUser.basket.totalQuantity }}
                      </h5>
                      <h5>€ {{ $root.loggedUser.basket.totalPrice }}</h5>
                    </div>

                    <h5
                      class="text-uppercase mb-3"
                      v-if="$root.loggedUser.customerType != 3"
                    >
                      Discount
                    </h5>

                    <div class="mb-5" v-if="$root.loggedUser.customerType != 3">
                      <div class="form-outline">
                        <label class="form-label" for="form3Examplea2" v-if="$root.loggedUser.customerType == 2"
                          >5%</label
                        >
                        <label class="form-label" for="form3Examplea2" v-if="$root.loggedUser.customerType == 1"
                          >10%</label
                        >
                      </div>
                    </div>

                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-5">
                      <h5 class="text-uppercase">Total price</h5>
                      <h5 v-if="$root.loggedUser.customerType != 3">
                        € {{ $root.loggedUser.basket.discountedPrice }}
                      </h5>
                      <h5 v-if="$root.loggedUser.customerType == 3">
                        € {{ $root.loggedUser.basket.totalPrice }}
                      </h5>
                    </div>

                    <button
                      type="button"
                      class="btn btn-dark btn-block btn-lg"
                      data-mdb-ripple-color="dark"
                      @click="completePurchase"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    async addVehicleToBasket(veh) {
       let token = localStorage.getItem('user');
      console.log(this.$root.loggedUser);
      const res =await fetch(
        `http://127.0.0.1:3000/api/v1/users/basket/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            vehicleId: veh,
          }),
        }
      );
      const data = await res.json();
      this.$root.loggedUser = data.data.user;
    },
    removeVehicleFromBasket(veh) {
      console.log(veh);
    },
    async completePurchase(){
        let token = localStorage.getItem('user');
       const res = await fetch(
        `http://127.0.0.1:3000/api/v1/rentals/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            startDate: this.$root.startDate,
            rentedDays: this.$root.daysNum,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      this.$root.loggedUser = data.data.user;
    },
    backToShop(){

    }
  },
};
</script>

<style>
@media (min-width: 1025px) {
  .h-custom {
    height: 100vh !important;
  }
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: 0.75em;
  padding-right: 0.75em;
}

.card-registration .select-arrow {
  top: 13px;
}

.bg-grey {
  background-color: #eae8e8;
}

@media (min-width: 992px) {
  .card-registration-2 .bg-grey {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}

@media (max-width: 991px) {
  .card-registration-2 .bg-grey {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
</style>
