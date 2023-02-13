<template>
    <transition 
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
      mode="out-in">
        <div class="cart-container" v-if="activado">
            <v-btn color="error" icon @click="setCloseCart">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row>
                <v-col cols="11" class="mx-auto d-flex justify-space-between">
                    <h3 class="pink--text">Carrito de compras</h3> 
                    <v-chip  color="pink" dark>{{ totalProducts }} productos  </v-chip>
                </v-col>
            </v-row>
            <div class="container-items">
                <div class="item-product" v-for="(item,index) of carrito" :key="index">
                    <img src="https://www.shutterstock.com/image-photo/sex-toys-men-artificial-vagina-260nw-2236276529.jpg" alt="">
                    <h5 class="titulo">{{ item.nombre }} </h5>
                    <p class="precio">Precio:${{ item.precio | precio}}.00 </p>
                    <p class="total">Total:${{ item.precio * item.cantidad | precio }}.00 </p>

                    <v-btn icon color="error" class="icon-delete" @click="setDeleteProduct(index)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>

                    <div class="cantidades">
                        <button @click="setDecrement(index)">-</button>
                        <span>{{ item.cantidad }} </span>
                        <button @click="setAument(index)">+</button>
                    </div>
                </div>
            </div>
            <div class="subtotal">
                <h2 >Subtotal:${{ subTotal }}.00 </h2>
                <v-btn class="primary" @click="toPay()">
                    Pagar
                    <v-icon>mdi-</v-icon>
                </v-btn>
            </div>
        </div>
    </transition>
</template>

<script>
import {mapState,mapMutations, mapGetters} from 'vuex'
export default {

    computed:{
        ...mapState('cart',['activado','carrito']),
        ...mapGetters('cart',['totalProducts','subTotal'])
    },

    filters: {
        precio(value) {
            return value.toLocaleString('en');
        }
    },

    methods:{
        ...mapMutations('cart',['setCloseCart','setAument','setDecrement','setDeleteProduct']),

        toPay(){
            this.setCloseCart()
            this.$router.push('/pay');
        }
    }
}
</script>

<style lang="sass">
    .cart-container
        position: fixed
        width: 350px
        height: 100vh
        background: #fff
        right: 0
        top: 0
        z-index: 12
        box-shadow: -7px 0px 15px 1px #5e5c5c
        .subtotal
            width: 100%
            position: absolute
            left: 15px
            bottom: 10px
            display: flex
            justify-content: space-evenly
            h2
                color: #f11066
                font-size: 18px
                margin-top: 10px
        .container-items
            width: 100%
            height: 700px
            margin-top: 10px
            overflow-y: scroll
            &::-webkit-scrollbar 
                display: none
            .item-product
                width: 90%
                height: 85px
                border-radius: 8px
                position: relative
                margin:15px auto
                box-shadow: 0px 1px 18px 3px #d3d3d3
                .titulo
                    color: #f11066
                    position: absolute
                    left: 82px
                    top: 5px
                .precio
                    position: absolute
                    font-size: 13px
                    left: 82px
                    top: 25px
                    color: #8d8a8a
                .total
                    position: absolute
                    left: 82px
                    top: 55px
                    font-weight: bold
                    color: green
                img
                    position: absolute
                    width: 80px
                    height: 70px
                    top: 5px
                .icon-delete
                    position: absolute
                    right: 5px
                    top: 3px
                .cantidades
                    position: absolute
                    width: 80px
                    right: 8px
                    bottom: 2px
                    display: flex
                    justify-content: space-evenly
                    button
                        width: 20px
                        height: 20px
                        border-radius: 50%
                        background-color: #d3d3d3
                        display: flex
                        justify-content: center
                        align-items: center

    .fade-enter-from,.fade-leave-to
        opacity: 0
    
    .fade-enter-active,.fade-leave-active
        transition: opacity 0.1s ease-out

    .v-text-field fieldset, .v-text-field .v-input__control 
        margin-bottom: 0px !important
    
</style>