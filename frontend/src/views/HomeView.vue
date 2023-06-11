<template>
<div class="container">
    <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-3"  v-for="object in objects" :key="object.id">
           <RentCarCard :object="object"/>
      </div>
    </div>
  </div>
</template>

<script>
import RentCarCard from './../components/RentCarCard';

export default {
  data(){
    return {
      objects: [],
    }
  },
  name: 'HomeView',
  components: {
    RentCarCard
  },
    async mounted(){
        let response = await fetch('http://127.0.0.1:3000/api/v1/objects/');
        let data = await response.json();
        this.objects = data.data.objects
        this.objects.sort((a,b)=>{
           if (a.open && !b.open) {
              return -1; // a ide prije b
            } else if (!a.open && b.open) {
              return 1; // b ide prije a
            } else {
              return 0; // nema promjene u redoslijedu
            }
        });
    }
}
</script>

<style scoped>
  .home{
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
</style>