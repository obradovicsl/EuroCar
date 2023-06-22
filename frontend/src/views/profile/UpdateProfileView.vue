<template>
  <div class="register">
    <h1>Profile</h1>

    <form class="register" @submit.prevent="updateProfile">
      <div class="input__card">
        <label>First name</label>
        <input type="text" required v-model="user.firstName" />
      </div>

      <div class="input__card">
        <label>Last Name</label>
        <input type="text" required v-model="user.lastName" />
      </div>

      <div class="input__card">
        <label>Username</label>
        <input type="text" required v-model="user.username" />
      </div>

      <div class="input__card">
        <label>Gender</label>
        <select v-model="user.gender">
          <option value="M" selected>M</option>
          <option value="F">F</option>
        </select>
      </div>

      <div class="input__card">
        <label>Birth Date</label>
        <input type="date" v-model="user.birthDate" />
      </div>

      <p v-if="error">{{ errorMessage }}</p>

      <button class="btn_update">Update</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      error: false,
      errorMessage: '',
    };
  },
  async mounted() {
    this.user = this.$root.loggedUser;;
  },
  methods: {
    async updateProfile() {
      try {
        let token = localStorage.getItem('user');
        let response = await fetch(
          `http://127.0.0.1:3000/api/v1/users/updateMe`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              username: this.user.username,
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              gender: this.user.gender,
              birthDate: this.user.birthDate,
            }),
          }
        );
        let data = await response.json();
        if (data.status != 'success') {
          this.error = true;
          this.errorMessage = data.message;
        } else {
          this.$router.push({ name: 'successful' });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.register {
  width: 30vw;
  height: 60vh;
  border-radius: 10px;
  margin: auto;
  padding: 8px 16px;
}

.input__card {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.btn_update {
  width: 120px;
  padding: 6px 10px;
  border-radius: 10px;
  background: #66d9e8;
  color: #fff;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.error {
  color: red;
}
</style>
