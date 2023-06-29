<template>
  <div class="wrapper">
    <div class="modall">
        <h1>Are you sure?</h1>
      <button class='btn btn-danger' @click="sure">sure</button>
    </div>
    <div class="overlay" @click="closeBackdrop"></div>
  </div>
</template>

<script>
export default {
  methods: {
    closeBackdrop() {
      this.$emit('close');
    },
    sure(){
      this.$emit('sure');
    }
  },
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  z-index: 100000;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  transition: all 0.5s;
}

.modall {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 60rem;
  background-color: #f3f3f3;
  padding: 2rem 3.5rem;
  width: 30%;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.5s;
}
</style>
