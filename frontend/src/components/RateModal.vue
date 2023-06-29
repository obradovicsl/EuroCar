<template>
  <div class="wrapper">
    <div class="modall">
      <h1>Rate {{}}</h1>
      <label class="form-label" for="">Comment</label>
      <input
        class="form-control mb-4"
        type="text"
        v-model="review.comment"
        required
      />
      <label class="form-label" for="">Rating</label>
      <input
        class="form-control mb-4 rating"
        type="number"
        v-model="review.rating"
      />
      <button class="btn btn-danger mb-4" @click="rate">Rate</button>
      <p class="error" v-if="error">Rating must be between 1-5</p>
      <p class="error" v-if="errorComment">Comment is required</p>
    </div>
    <div class="overlay" @click="closeBackdrop"></div>
  </div>
</template>

<script>
export default {
  props: ['car'],
  data() {
    return {
      review: { comment: '', rating: 0 },
      error: false,
      errorComment: false,
    };
  },
  methods: {
    closeBackdrop() {
      this.$emit('close');
    },
    rate() {
      if (this.review.rating > 5 || this.review.rating < 1) {
        this.error = true;
      } else if (this.review.comment == '') {
        this.error = false;
        this.errorComment = true;
      } else {
        this.error = false;
        this.errorComment = false;
        this.$emit('rate', this.review);
      }
    },
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

.modall img {
  width: 80%;
}

.rating {
  width: 30%;
  margin: 0 auto;
}
</style>
