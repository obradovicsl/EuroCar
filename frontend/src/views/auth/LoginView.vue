<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="login">
    <div class="input__card">
        <label>Username</label>
        <input type="text" required v-model="username">
    </div>
    
    <div class="input__card">
        <label>Password</label>
        <input type="password" required v-model="password">
    </div>

    <button class="btn_login">Login</button>

    <p v-if="error" class="error">Wrong username or password</p>

    </form>

    <p class="signup_text">Don't have an account?</p>
    <button class="btn_signup" @click="register">Sign Up</button>
  </div>
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
                console.log('ee');
                let response = await fetch('http://127.0.0.1:3000/api/v1/customers/login',{
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
                    this.$root.userRole = data.data.user.role;
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
    .login{
        width: 30vw;
        height: 60vh;
        border-radius: 10px;
        margin: auto;
        padding: 8px 16px;
    }

    .input__card{
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
    }

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