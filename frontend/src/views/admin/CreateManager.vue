<template>
 <section class="vh-90 gradient-custom">
    <div class="container py-5 h-90">
      <div class="row d-flex justify-content-center align-items-center h-90">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-3 mt-md-1 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase mb-4">
                  Create Manager
                </h2>

                <form @submit.prevent="register">
                  <div class="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeEmailX"
                      class="form-control form-control-sm"
                      required
                      v-model="firstName"
                    />
                    <label class="form-label" for="typeEmailX"
                      >First Name</label
                    >
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeEmailX"
                      class="form-control form-control-sm"
                      required
                      v-model="lastName"
                    />
                    <label class="form-label" for="typeEmailX">Last Name</label>
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeEmailX"
                      class="form-control form-control-sm"
                      required
                      v-model="username"
                    />
                    <label class="form-label" for="typeEmailX">Username</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-sm"
                      required
                      v-model="password"
                    />
                    <label class="form-label" for="typePasswordX"
                      >Password</label
                    >
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-sm"
                      required
                      v-model="confirmPassword"
                    />
                    <label class="form-label" for="typePasswordX"
                      >Confirm Password</label
                    >
                  </div>

                  <div class="form-outline form-white mb-4">
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      v-model="gender"
                    >
                      <option selected value="M">M</option>
                      <option value="F">F</option>
                    </select>
                    <label class="form-label" for="typePasswordX">Gender</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      type="date"
                      v-model="birthDate"
                      class="form-control form-control-sm"
                    />
                    <label class="form-label" for="typePasswordX"
                      >BirthDate</label
                    >
                  </div>

                  <button
                    class="btn btn-outline-light btn-sm px-5"
                    type="submit"
                  >
                    Create
                  </button>

                  <p v-if="error" class="error">Wrong username or password</p>
                </form>
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
     data(){
        return{
            firstName: '',
            lastName: '',
            gender: 'M',
            birthDate: '',
            username: '',
            password: '',
            confirmPassword: '',
            error: false,
        }
    },
    methods:{
        async register(){
            try{
                let token = localStorage.getItem('user');
                let response = await fetch('http://127.0.0.1:3000/api/v1/users/createManager',{
                    method: 'POST',
                    headers: {
                     "Content-Type": "application/json",
                       "Authorization": `Bearer ${token}`,
                    },
                     body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        gender: this.gender,
                        birthDate: this.birthDate
                    }),
                });
                 let data = await response.json();
                if(data.status != 'success'){
                    this.error = true;
                }else{
                    this.$router.push({name: 'successful'});
                }
            }catch(err)
            {

            }
        }
    }
}
</script>

<style>

    .error{
        color: red;
    }
    .btn_signup{
        background: none;
        border: none;
        text-transform: uppercase;
        cursor: pointer;
        color: #0b7285;
    }
</style>