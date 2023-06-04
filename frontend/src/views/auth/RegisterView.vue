<template>
  <div class="register">
    <h1>Register</h1>

    <form class="register" @submit.prevent="register">

    <div class="input__card">
        <label>First name</label>
        <input type="text" required v-model="firstName">
    </div>

    <div class="input__card">
        <label>Last Name</label>
        <input type="text" required v-model="lastName">
    </div>

    <div class="input__card">
        <label>Username</label>
        <input type="text" required v-model="username">
    </div>
    
    <div class="input__card">
        <label>Password</label>
        <input type="password" required v-model="password">
    </div>

     <div class="input__card">
        <label>Confirm password</label>
        <input type="password" required v-model="confirmPassword">
    </div>

     <div class="input__card">
        <label>Gender</label>
        <select v-model="gender">
            <option value="M" selected>M</option>
            <option value="F">F</option>
        </select>
    </div>

    <div class="input__card">
        <label>Birth Date</label>
        <input type="date" v-model="birthDate">
    </div>

    <p v-if="error">Wrong data!</p>

    <button class="btn_login">Register </button>
    </form>
  </div>
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
                let response = await fetch('http://127.0.0.1:3000/api/v1/customers/signup',{
                    method: 'POST',
                    headers: {
                     "Content-Type": "application/json",
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
                console.log(data);
                if(data.status != 'success'){
                    this.error = true;
                }else{
                    this.error = false;
                    localStorage.setItem("user", data.token);
                    this.$root.isLoged = true;
                    this.$root.loggedUser = data.data.user;
                    this.$root.userRole = data.data.user.role;
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
    .register{
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