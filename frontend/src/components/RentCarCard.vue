<template>
  <div class="card">
    <img :src="object.logo" alt="">
    <div class="card-content">
    <h2>{{this.object.name}}</h2>
    <p>{{this.object.location}}</p>
    <p>{{this.object.rating}}</p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['object'],
    data(){
        return {
            image: '',
            name: '',
            location: '',
            score: ''
        }
    },
    mounted(){
        console.log(this.object);
    }

}
</script>

<style>
    .card{
        display: flex;
        flex-direction: column;
        width: 300px;
         box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
        border-radius: 11px;
        overflow: hidden;
        transition: all 0.4s;
    }
    .card:hover {
        transform: translateY(-0.4rem);
        box-shadow: 0 3.2rem 6.4rem rgba(0, 0, 0, 0.06);
    }

    .card img{
        width: 100%;
    }

    .card-content{
        padding: 10px 16px 16px 16px;
        height: 180px;
    }

</style>