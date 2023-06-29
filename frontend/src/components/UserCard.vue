<template>
  <div class="card mb-4 mb-md-0">
    <ChooseModal v-if="isVisible" @sure="blockUser" @close="closeModal" />

    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
      class="card-img-top"
      alt=""
    />
    <div class="card-body">
      <h5 class="card-title">{{ user.firstName }} {{ user.lastName }}</h5>
      <p class="card-text">{{ user.role }}</p>
      <button
        class="btn btn-danger block-btn"
        v-if="user.role != 'admin' && !user.blocked && user.blocked != true"
        @click="showBlockModal"
      >
        Block
      </button>
      <button
        class="btn btn-success block-btn"
        v-if="user.role != 'admin' && user.blocked == true"
        @click="unblockUser"
      >
        Unblock
      </button>
    </div>
  </div>
</template>

<script>
import ChooseModal from './ChooseModal';

export default {
  props: ['user'],
  data() {
    return {
      isVisible: false,
    };
  },
  components: { ChooseModal },
  methods: {
    showBlockModal() {
      this.isVisible = true;
    },
    closeModal() {
      this.isVisible = false;
    },
    async blockUser() {
      this.isVisible = false;
      let token = localStorage.getItem('user');
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/users/block/${this.user.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      this.user.blocked = data.data.user.blocked;
    },
    async unblockUser() {
      this.isVisible = false;
      let token = localStorage.getItem('user');
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/users/unblock/${this.user.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      this.user.blocked = data.data.user.blocked;
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

.block-btn {
  position: absolute;
  bottom: 3px;
  right: 3px;
  font-size: 14px;
  padding: 2px 4px;
}
</style>
