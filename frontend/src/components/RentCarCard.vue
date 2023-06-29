<template>
  <div class="card pb-4">
    <img :src="object.logo" alt="" />
    <div class="card-content">
      <h2>{{ this.object.name }}</h2>
      <p>{{ this.object.location.address }}</p>
      <p>{{ this.object.rating }}</p>
      <button class="btn" @click="viewStore" v-if="$root.isLoged == true">View Store</button>
      <p class="open__badge" v-if="object.open">OPEN</p>
      <p class="closed__badge" v-if="!object.open">CLOSED</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['object'],
  data() {
    return {
      image: '',
      name: '',
      address: '',
      score: '',
    };
  },
  methods: {
    viewStore() {
      this.$router.push({
        name: 'viewStore',
        params: {
            id: this.object.id,
        } 
      });
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 300px;
  box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
  border-radius: 11px;
  overflow: hidden;
  transition: all 0.4s;
  position: relative;
}

.open__badge,
.closed__badge{
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 4px;
  background: green;
  color: white;
} 

.closed__badge{
  background: red;
} 

.card img {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}

.card-content {
  padding: 10px 16px 16px 16px;
  height: 180px;
}
</style>
