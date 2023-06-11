<template>
   <div class="card">
    <div class="card-content">
    <h2>{{this.rent.object}}</h2>
    <h2>{{this.rent.rentalDateTime}}</h2>
    <h3>Rented vehicles: </h3>
    <ul class="card-list" v-for="vehicle in rent.vehicles" :key="vehicle">
        <li>{{vehicle}}</li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
     props: ['rent'],
    data(){
        return {
            image: '',
            name: '',
            location: '',
            score: ''
        }
    },
    mounted(){
        console.log(this.rent);
    }
}
</script>

<style scoped>
    .card{
        margin: 0 auto;
        background: #ccc;
        width: 300px;
         box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
        border-radius: 11px;
        overflow: hidden;
        transition: all 0.4s;
    }

    .card-content{
        padding: 16px;
        height: 180px;
    }

    .card-list{
        list-style: none;
    }
</style>