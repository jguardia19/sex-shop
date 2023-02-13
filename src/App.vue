<template>
    <v-app>

    <app-cart></app-cart>

    <component :is="layout">
        <router-view :layout.sync="layout"/>
    </component>
 
    </v-app>
   </template> 

<script>
import appCart from './components/app-cart.vue';
const defaultLayout = 'dashboard-layout'
export default {
  components: { appCart },
  name: 'App',

  data: () => ({
    //
  }),

  computed: {
        layout (){
          return (this.$route.meta.layout || defaultLayout)  
        }
  }

};
</script>
<style>

</style>
