<template>
    <v-container>
        <v-row>
            <v-col cols="9" class="white container-table">
                <v-row class="mb-3">
                    <v-col cols="12">
                        <h3 style="color:#616161">Cantidad de productos en el carrito: <v-chip color="pink" dark>{{ totalProducts }} </v-chip> </h3>
                    </v-col>
                </v-row>
                <v-simple-table fixed-header  height="600px" >
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="pink--text px-0 mx-0 text-center">
                                    PRODUCTO
                                </th>
                                <th class="pink--text px-0 mx-0 text-center">
                                    PRECIO
                                </th>
                                <th class="pink--text px-0 mx-0 text-center">
                                    CANTIDAD
                                </th>
                                <th class="pink--text px-0 mx-0 text-center">
                                    TOTAL
                                </th>
                                <th class="pink--text px-0 mx-0 text-center">
                                    ACCIÓN
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) of carrito" :key="index">
                                <td class="text-center">
                                    <div class="producto">
                                        <img src="https://www.shutterstock.com/image-photo/sex-toys-men-artificial-vagina-260nw-2236276529.jpg" alt="" width="70" height="70" />
                                        <div class="descripcion_producto">
                                            <p class="nombre_pro">{{ item.nombre }}</p>
                                            <p class="codigo_pro">Codigo: {{ item.codigo }} </p>  
                                        </div>
                                    </div>
                                    
                                </td>
                                <td class="text-center">
                                    <p class="precio primary--text">${{ item.precio | precio}}.00</p>
                                </td>
                                <td class="text-center">
                                    <div class="cantidades">
                                        <button @click="setDecrement(index)">-</button> 
                                        <input type="number" class="cantidad_input"  v-model="carrito[index].cantidad" @keypress="soloNumeros($event)">
                                        <!-- <input type="number" class="cantidad_input"  v-model="carrito[index].cantidad" v-if="item.active"> -->
                                        <!-- <span v-else @click="editCantidad(index)">{{ item.cantidad }} </span> -->
                                        <button @click="setAument(index)">+</button>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <p class="total success--text">${{ item.cantidad * item.precio | precio}}.00 </p>
                                </td>
                                <td class="text-center">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon color="error" v-bind="attrs" v-on="on" @click="setDeleteProduct(index)">
                                                <v-icon>mdi-delete-empty</v-icon>
                                            </v-btn>  
                                        </template>
                                        <span>Eliminar</span>
                                    </v-tooltip>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <h2 class="total_cuenta pink--text">Total: ${{ subTotal | precio}}.00 </h2>
            </v-col>
            <v-col cols="3" class="grey lighten-2">
                <h2 class="text-center pink--text">Datos personales</h2>
                <v-row class="mt-5">
                    <v-col cols="10" class="mx-auto">
                        <v-text-field outlined label="Nombre:" v-model="user.nombre"></v-text-field>
                        <v-text-field outlined label="Apellidos:" v-model="user.apellido"></v-text-field>
                        <v-text-field outlined label="Direccion:" v-model="user.direccion"></v-text-field>
                        <v-text-field outlined label="Colonia:" v-model="user.colonia"></v-text-field>
                        <v-text-field outlined label="Ciudad:" v-model="user.ciudad"></v-text-field>
                        <v-text-field outlined label="Estado:" v-model="user.estado"></v-text-field>
                        <v-text-field outlined label="C.P:" v-model="user.codigop"></v-text-field>
                        <v-text-field outlined label="Teléfono:" v-model="user.telefono"></v-text-field>
                        <v-radio-group v-model="envio" row>
                            <v-radio label="Enviar Mercancia" value="Si"></v-radio>
                            <v-radio label="Entrega personal" value="No"></v-radio>
                        </v-radio-group>
                        <v-alert type="info" v-if="envio === 'Si'">
                            <p class="text-center">Datos del Envio</p>  
                            <p>A partir de este año 2022 es necesario que usted nos proporcione su RFC 
                            para poder realizar el envio, ya que las paqueterias nos exigen el RFC del destinatario.</p> 
                            
                        </v-alert>
                        <v-text-field outlined type="text" label="RFC IMPORTANTE!" v-if="envio === 'Si'"></v-text-field>
                        <v-autocomplete  
                        v-if="envio === 'Si'"
                        label="Paqueteria"
                        :items="paqueterias"
                        item-text="nombre_paqueteria"
                        item-value="nombre_paqueteria"
                        outlined></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="text-right">
                        <v-btn class="primary">realizar pedido</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
    data: () => ({
        envio: 'no',
        user:{
            id: null,
            nombre: "",
            apellido: "",
            direccion: "",
            colonia: "",
            ciudad: "",
            estado: "",
            codigop: "",
            telefono: ""
        },
        paqueterias:[]
    }),

    computed: {

        ...mapState('cart', ['carrito']),

        ...mapGetters('cart', ['totalProducts', 'subTotal'])
    },

    mounted(){
        this.getDataUser()
        this.getAllPaqueterias()
    },

    filters: {
        precio(value) {
            return value.toLocaleString('en');
        }
    },

    methods: {
        ...mapMutations('cart', ['setCloseCart', 'setAument', 'setDecrement', 'setDeleteProduct']),

        soloNumeros(e){
            var key = window.event ? e.which : e.keyCode;
            if ((key < 48 || key > 57)) {
                e.preventDefault();
            }
        },

        async getDataUser(){
            try{
                let id = sessionStorage.getItem('id');
                const response = await axios.get(`http://localhost/api-sexshop/Login/?id=${id}`)
                if(response.status == 200){
                    console.log(response.data)
                    this.user = Object.assign({}, response.data)
                }
            }catch(e){
                console.log(e)
            }
        },

        async getAllPaqueterias(){
            try{
                const response = await axios.get(`http://localhost/api-sexshop/Paqueterias/`)
                if(response.status == 200){
                    this.paqueterias = response.data
                }
            }catch(e){
                console.log(e)
            }
        },

        editCantidad(index){
            this.carrito[index].active = true
        }


    }
}
</script>

<style lang="sass">
    .v-input__slot
        background-color: #fff !important
        margin-bottom: -5px !important

    .cantidades
        display: flex
        justify-content: space-evenly
        button
            width: 25px
            height: 25px
            border-radius: 50%
            background-color: #d3d3d3
            display: flex
            justify-content: center
            align-items: center
    .producto
        width: 80%
        margin: auto
        display: flex
        justify-content: space-evenly
        align-items: center
        .descripcion_producto
            width: 50%
            padding: 5px
            box-sizing: border-box
            text-align: left
            .nombre_pro
                font-size: 15px
                text-transform: capitalize
            .codigo_pro
                color: #808080 
                font-size: 12px
                font-weight: bold
    .total,.precio
        font-weight: bold
    .cantidad_input
        width: 20%
        border: 1px solid #d3d3d3
        padding: 4px
        border-radius: 5px
        text-align: center
    .container-table
        position: relative
        .total_cuenta
            position: absolute
            right: 20px
            bottom: 5px
</style>