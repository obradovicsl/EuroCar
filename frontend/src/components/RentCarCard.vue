<template>
  <div class="card pb-4">
    <img :src="object.logo" alt="" />
    <div class="card-content">
      <h2>{{ this.object.name }}</h2>
      <p>{{ this.object.location.address }}</p>
      <p>{{ this.object.rating }}</p>
      <button class="btn" @click="viewStore">View Store</button>
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
  mounted() {
    console.log(this.object);
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
}

.card img {
  width: 100%;
}

.card-content {
  padding: 10px 16px 16px 16px;
  height: 180px;
}
</style>
