<template>
  <div class="card mb-4 mb-md-0">
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" class="card-img-top profile-photo" alt="" />
    <div class="card-body">
      <h5 class="card-title">{{this.review.user.firstName}} {{this.review.user.lastName}}</h5>
      <p class="card-text">Rating: {{this.review.rating}}</p>
      <p class="card-text">Comment: {{this.review.comment}}</p>

      <div
        class="mt-4 action"
        v-if="user.role == 'manager' && isOwner==true && review.status == 'PROCESSING'"
      >
        <button class="btn btn-success" @click="updateReview('APPROVED')">
          Approve
        </button>
        <button class="btn btn-danger" @click="updateReview('REJECTED')">
          Reject
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rev', 'user', 'isOwner'],
  data() {
    return {
      review: { user: {}, object: {} },
    };
  },

  async mounted() {
    this.review = this.rev;
  },
  methods: {
    async updateReview(status) {
      let token = localStorage.getItem('user');
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/objects/${this.review.objectId}/reviews/${this.review.id}`,
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
      this.review = data.data.newReview;
    },
  },
};
</script>

<style scoped>
.profile-photo{
    border-radius: 100px;
}
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
