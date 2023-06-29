<template>
  <section class="vh-90 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Please enter your login and password!</p>

              <form @submit.prevent="login">
              <div class="form-outline form-white mb-4">
                <input type="text" id="typeEmailX" class="form-control form-control-lg" required v-model="username"/>
                <label class="form-label" for="typeEmailX">Username</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" class="form-control form-control-lg" required v-model="password"/>
                <label class="form-label" for="typePasswordX">Password</label>
              </div>

              <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

              <p v-if="error" class="error">Wrong username or password</p>


               </form>

            </div>

            <div>
              <p class="mb-0">Don't have an account? 
             <button class="btn_signup" @click="register">Sign Up</button>
              </p>
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
            username: '',
            password: '',
            error: false,
            isLogged: this.$route.params.isLogged
        }
    },
    methods:{
        register(){
            this.$router.push({name: 'register'});
        },
        async login(){
            try{
                let response = await fetch('http://127.0.0.1:3000/api/v1/users/login',{
                    method: 'POST',
                    headers: {
                     "Content-Type": "application/json",
                    },
                     body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });
                let data = await response.json();
                if(data.status != 'success'){
                    this.error = true;
                }else{
                    this.error = false;
                    localStorage.setItem("user", data.token);
                    this.$root.isLoged = true;
                    this.$root.loggedUser = data.data.user;
                    this.$router.push({name: 'home'});
                }
            }catch(err)
            {

            }
        }
    }
}
</script>

<style>
    .btn_login{
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