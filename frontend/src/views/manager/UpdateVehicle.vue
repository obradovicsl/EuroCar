<template>
  <div class="container p-4">
    <form @submit="updateVehicle">
      <div class="mb-3">
        <div class="row">
          <div class="col">
            <label for="brand" class="form-label">Brand</label>
            <input
              type="text"
              class="form-control"
              id="brand"
              v-model="vehicle.brand"
              required
            />
          </div>
          <div class="col">
            <label for="model" class="form-label">Model</label>
            <input
              type="text"
              class="form-control"
              id="model"
              v-model="vehicle.model"
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div class="row">
          <div class="col">
            <label for="price" class="form-label">Price</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="vehicle.price"
                required
              />
            </div>
          </div>
          <div class="col">
            <label for="consumption" class="form-label">Consumption</label>
            <div class="input-group">
              <input
                type="number"
                step="0.1"
                class="form-control"
                id="consumption"
                v-model="vehicle.consumption"
                required
              />
              <span class="input-group-text">L/100km</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="type" class="form-label">Type</label>
        <select class="form-select" id="type" v-model="vehicle.type" required>
          <option value="Van">Van</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Car">Car</option>
        </select>
      </div>

      <div class="mb-3">
        <div class="row">
          <div class="col">
            <label for="transmission" class="form-label">Transmission</label>
            <select
              class="form-select"
              id="transmission"
              v-model="vehicle.transmission"
              required
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div class="col">
            <label for="fuelType" class="form-label">Fuel type</label>
            <select
              class="form-select"
              id="fuelType"
              v-model="vehicle.fuelType"
              required
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div class="row">
          <div class="col">
            <label for="doors" class="form-label">Doors</label>
            <input
              type="number"
              class="form-control"
              id="doors"
              v-model="vehicle.doors"
              required
            />
          </div>
          <div class="col">
            <label for="capacity" class="form-label">Capacity</label>
            <input
              type="number"
              class="form-control"
              id="capacity"
              v-model="vehicle.capacity"
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          rows="4"
          v-model="vehicle.description"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Image URL</label>
        <input
          type="text"
          class="form-control"
          id="image"
          v-model="vehicle.image"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      vehicle: {},
    };
  },
  async mounted() {
    console.log(this.id);
    const token = localStorage.getItem('user');
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/vehicles/${this.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    this.vehicle = data.data.vehicle;
  },
  methods: {
    async updateVehicle() {
      try {
        let token = localStorage.getItem('user');
        let response = await fetch(`http://127.0.0.1:3000/api/v1/vehicles/${this.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            brand: this.vehicle.brand,
            model: this.vehicle.model,
            price: this.vehicle.price,
            type: this.vehicle.type,
            transmission: this.vehicle.transmission,
            fuelType: this.vehicle.fuelType,
            consumption: this.vehicle.consumption,
            doors: this.vehicle.doors,
            capacity: this.vehicle.capacity,
            description: this.vehicle.description,
            image: this.vehicle.image,
          }),
        });
        let data = await response.json();
        if (data.status != 'success') {
          this.error = true;
        } else {
          this.$router.push({ name: 'successful' });
        }
      } catch (err) {}
    },
  },
};
</script>

<style>
.error {
  color: red;
}
.btn_signup {
  background: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  color: #0b7285;
}
</style>
