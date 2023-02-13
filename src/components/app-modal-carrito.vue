<template>
    <v-dialog v-model="$props.modal" max-width="800">
        <v-card>
            <v-card-title class="pink d-flex justify-space-between">
                <h4 class="white--text">Agregar producto al carrito</h4>
                <v-btn icon @click="close">
                    <v-icon color="white">mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row class="mt-3">
                    <v-col cols="12" sm="7" md="7" lg="7" class="text-center">
                        <!-- <img src="" alt="" width="80" height="250"> -->
                        <!-- <zoom-on-hover img-normal="http://localhost/api-sexshop/imagenes/EL-211-3.jpg" img-zoom="http://localhost/api-sexshop/imagenes/EL-211-3.jpg" :scale="2.0" :disabled="false"
                             @loaded="onload" @resized="onresize"></zoom-on-hover> -->

                             
                            <div class="imagenes">
                                <div class="galeria">
                                    <img src="https://www.shutterstock.com/image-photo/erotic-pleasure-toys-on-black-260nw-1332431357.jpg" alt=""  @mouseenter="selectImagen($event)">
                                    <img src="https://www.shutterstock.com/image-photo/silicone-sex-toys-puffs-smoke-260nw-2236287497.jpg" alt="" @mouseenter="selectImagen($event)">
                                    <img src="https://www.shutterstock.com/image-photo/sex-toys-men-artificial-vagina-260nw-2236276529.jpg" alt="" @mouseenter="selectImagen($event)"> 
                                </div>
                                <div style="width:400px" class="zoom">
                                    <zoom-on-hover :img-normal="imagen"></zoom-on-hover>
                                </div>
                            </div>
                    </v-col>
                    <v-col cols="12" sm="5" md="5" lg="5">
                        <h2 class="nombre_producto"> {{ cardProduct.nombre }}</h2>
                        <p class="codigo">Codigo producto: {{ cardProduct.codigo }} </p>
                        <p class="success--text"><v-icon color="pink">mdi-store-outline</v-icon> Disponibilidad </p>
                        <v-divider class="mb-3"></v-divider>
                        <span class="precioMas">${{ cardProduct.precio | precioMas }} <sup>00</sup> </span>
                        <span class="precio">${{ cardProduct.precio | precio }} <sup>00</sup> </span>
                        <p class="mt-3"><v-icon>mdi-truck-outline</v-icon> Envios a todo el país</p>
                        <div class="agregar mt-8">
                            <button class="btn-menos" @click="disminuirCantidad()">-</button>
                            <input type="number" class="cantidad" placeholder="0" v-model="cantidad" @keypress="soloNumeros($event)">
                            <button class="btn-mas" @click="aumentarCantidad()">+</button>
                        </div>
                        <p class="error--text mt-2">¡Date prisa! Que se agotan</p>
                        <h4 class="total mt-8">TOTAL: ${{ cantidad * parseInt(cardProduct.precio) | precio }}
                            <sup>00</sup>
                        </h4>
                    </v-col>
                    <v-col cols="12">
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h3 class="text-center pink--text">Descripcion</h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <ul>
                                        <li>Producto 100% original, puedes verificarlo con el código PID indicado en la
                                            bomba.</li>
                                        <li>Mejoras comprobadas y duraderas.</li>
                                        <li>Mejores erecciones y resistencia sexual.</li>
                                        <li>El 92% de usuarios completamente satisfechos</li>
                                        <li>Se adapta a penes erectos de 13 a 18cm.</li>
                                        <li>Válvula de cierre de superflujo.</li>
                                    </ul>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>

                <v-col cols="12" class="text-right">
                    <v-btn class="mr-2" text color="error" @click="close">cancelar</v-btn>
                    <v-btn color="pink" dark :disabled="cantidad <= 0" @click="addNew()">AGREGAR <v-icon
                            class="ml-2">mdi-cart-plus</v-icon></v-btn>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        cardProduct: {
            type: Object,
        },
        modal: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        cantidad: 0,
        imagen:'https://www.shutterstock.com/image-photo/three-dildo-form-rabbit-stand-260nw-1678515811.jpg'
    }),

    computed:{
        // imagen(){
        //     return 
        // }
    },

    filters: {
        precio(value) {
            return value.toLocaleString('en');
        },

        precioMas(value) {
            let porcent = value * 20 / 100
            return porcent + value
        }
    },

    methods: {
         //metodo para solo aceptar numeros en campos de texto
        soloNumeros(e){
            var key = window.event ? e.which : e.keyCode;
            if ((key < 48 || key > 57)) {
                e.preventDefault();
            }
        },

        aumentarCantidad() {
            this.cantidad++
        },

        disminuirCantidad() {
            if (this.cantidad <= 0) {
                this.cantidad = 0
            } else {
                this.cantidad--
            }
        },

        addNew(){
            this.$emit('add',this.cantidad)
            this.cantidad = 0

        },

        close(){
            this.cantidad = 0
            this.$emit('close')
        },
        
        selectImagen(e){
           this.imagen =  e.target.src
        }


    }
}
</script>

<style lang="sass">
    .imagenes
        display: flex
        .galeria,.zoom
           // border: 1px solid
        .galeria
            width: 120px
            display: flex
            flex-wrap: wrap
            justify-content: center
            align-items: center
            img
                width: 60px
                height: 60px
                border: 1px solid #d3d3d3
                border-radius: 5px
                cursor: pointer
                transition: all .2s
                opacity: .6
                &:hover
                    border:1px solid #0A8AE8 
                    opacity: 1

</style>