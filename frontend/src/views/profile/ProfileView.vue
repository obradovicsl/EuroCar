<template>
<div>
  <p>First name: {{user.firstName}}</p>
  <p>Last name: {{user.lastName}}</p>
  <p>Username: {{user.username}}</p>
  <p>Gender: {{user.gender}}</p>
  <p>Birth date: {{user.birthDate}}</p>
  <p v-if="user.role == 'customer'">Points: {{user.points}}</p>
  <p v-if="user.role == 'customer'">Customer type: {{user.customerType}}</p>

  <button @click="updateProfile">Update Profile</button>
</div>
</template>

<script>
export default {
     data(){
        return{
            id: this.$route.params.id,
            user: {}
        }
    },
    async mounted(){
        if(this.$root.userRole == 'customer'){
            this.fetchCustomers();
        }
        if(this.$root.userRole == 'admin'){
            this.fetchAdmins();
        }
        if(this.$root.userRole == 'manager'){
            this.fetchManagers();
        }
        
    },
    methods:{
        async fetchCustomers(){
            const res = await fetch(`http://127.0.0.1:3000/api/v1/customers/${this.id}`);
            const data = await res.json();
            this.user = data.data.customers;
        },
        async fetchAdmins(){
            const res = await fetch(`http://127.0.0.1:3000/api/v1/admins/${this.id}`);
            const data = await res.json();
            this.user = data.data.admins;
        },
        async fetchManagers(){
            const res = await fetch(`http://127.0.0.1:3000/api/v1/managers/${this.id}`);
            const data = await res.json();
            this.user = data.data.managers;
        },
        updateProfile(){
             this.$router.push({name: 'updateProfile', params: {id: this.user.id}});
        }
    }
}
</script>

<style>

</style>