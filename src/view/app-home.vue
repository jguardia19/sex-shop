<template>
  <v-container fluid>


      <app-modal-carrito
      :cardProduct="product"
      :modal="modal_product"
      @close="closeModalProduct"
      @add="addNewProducto"
      ></app-modal-carrito>


      <v-row>
        <v-col cols="10" class="mx-auto">
          <v-row>
            <!-- <v-col cols="2" class="primary">
              lateral
            </v-col> -->
            <v-col cols="12" class="text-center">
              <h2 class="mb-5 primary--text">NUESTROS PRODUCTOS</h2>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="3" class="text-center" v-for="(producto,index) in products" :key="index">
                  <div class="card-product" @click="selectProduct(producto)" >
                      <img src="https://www.shutterstock.com/image-photo/three-dildo-form-rabbit-stand-260nw-1678515811.jpg" alt=""> 
                      <!-- colocar imageb de producto -->
                      <h3 class="nombre_producto_catalogo mt-3">{{ producto.nombre }}</h3> 
                      <p class="codigo_catalogo mb-0">Codigo:  {{ producto.codigo }} </p>
                      <span class="precioMas">${{ producto.precio | precioMas }} <sup>00</sup> </span>
                      <span class="precio">${{ producto.precio | precio }} <sup>00</sup> </span>
                      <div class="container-button">
                          <button class="btn-comprar mt-5" @click="selectProduct(producto)">Agregar al carrito <v-icon>mdi-cart</v-icon> </button>
                      </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  </v-container>
</template>
<script>
import appModalCarrito from '@/components/app-modal-carrito.vue';
import {mapMutations} from 'vuex'
export default {
  components: { appModalCarrito },
  data: () => ({
      product:{
        id:null,nombre:'',codigo:'',descripcion:'',precio:0,stock:0
      },
      products:[
        {id:854742,nombre:"producto n°1 ",codigo:"EL-155",descripcion:"lorem impsu",precio:4500,stock:5},
        {id:6912524,nombre:"producto n°2",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:3547125,nombre:"producto n°3",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:457851,nombre:"producto n°4",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:348559,nombre:"producto n°5",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:748554,nombre:"producto n°6",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:669582,nombre:"producto n°7",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:9859632,nombre:"producto n°8",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:1547822,nombre:"producto n°9",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:4748521,nombre:"producto n°10",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:9658721,nombre:"producto n°11",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:5557458,nombre:"producto n°12",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:3525562,nombre:"producto n°13",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:3354414,nombre:"producto n°14",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:4478541,nombre:"producto n°15",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:9665525,nombre:"producto n°16",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:6554454,nombre:"producto n°17",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
        {id:9854544,nombre:"producto n°18",codigo:"EL-155",descripcion:"lorem impsu",precio:450,stock:5},
      ],

      modal_product:false,
      cantidad:0
  }),

  filters:{
     precio(value){
       return  value.toLocaleString('en');
     },

     precioMas(value){
        let porcent = value*20/100
        return porcent + value
     }
  },

  methods: {

    ...mapMutations('cart',['setAddProducto']),

    selectProduct(item){
      this.product = Object.assign({}, item)
      this.modal_product = true
    },

    closeModalProduct(){
        this.modal_product = false
        this.cantidad = 0
    },  

    addNewProducto(cantidad){
      console.log(cantidad)
        let data = {
          "id":this.product.id,
          "codigo":this.product.codigo,
          "nombre":this.product.nombre,
          "precio":this.product.precio,
          "cantidad":parseInt(cantidad),
          "total":this.product.precio * parseInt(cantidad)
        }

        this.setAddProducto(data)
        this.closeModalProduct()
    }
  }
};
</script>
<style lang="sass" >
    .card-product
      width: 95%
      height: 350px
      background-color: #fff
      border-radius: 8px
      cursor: pointer
      /*box-shadow: 0px 1px 18px 3px #d3d3d3*/
      padding: 8px
      box-sizing: border-box
      transition: all 0.5s
      position: relative
      &:hover
        border: 1px solid #f11066 
      img
        width: 220px
        height: 180px
      .container-button
        width: 100%
        left: 0
        bottom: 15px
        text-align: center
        position: absolute
        .btn-comprar
          width: 220px
          color: #f11066
          padding: 8px
          border-radius: 5px
          transition: all 0.5s
          outline: none
          .v-icon
            color: #f11066
          &:hover
            background-color: #f11066
            color: #fff
            .v-icon
              color: #fff
    .nombre_producto_catalogo
      color:#1B1B1B 
      text-transform: capitalize
      font-size: 16px
    .nombre_producto
      color:#1B1B1B 
      text-transform: capitalize
      font-size: 20px
    .codigo
      font-size: 14px
      margin-top: 3px
    .codigo_catalogo
      font-size: 12px
      margin-top: 1px
      margin-bottom: 1px
      color: #29BB3B
    .precioMas
      color: #EC0F27
      text-decoration: line-through
      margin-right: 5px
      margin-top: 8px
    .precio
      margin-top: 8px
      color: #1b1b1b
      font-size: 18px
    .cantidad
      width: 150px
      height: 40px
      border: 1px solid #d3d3d3
      outline: none
      text-align: center
    .btn-mas,.btn-menos
      width: 50px
      height: 40px
      color: #fff
      font-size: 18px
      margin-top: 3px
    .btn-mas
      background-color:#29BB3B
      border-top-right-radius: 5px
      border-bottom-right-radius: 5px
    .btn-menos
      background-color: #EC0F27
      border-top-left-radius: 5px
      border-bottom-left-radius: 5px
    .total 
      font-weight: 400 !important
      font-size: 18px
      color: #1b1b1b
</style>