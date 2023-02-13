//import axios from 'axios'
// import router from '@/router'

export default {

    namespaced: true,

    state: {
        carrito:[],
        activado:false
    },
    mutations: {

        setAddProducto(state,data){
            let filter = state.carrito.filter(item=> item.id === data.id)
            console.log(filter)
            if(filter.length > 0){
                let index = state.carrito.findIndex(item => item.id === data.id)
                state.carrito[index].cantidad+= data.cantidad
            }else{
                state.carrito.push({
                    "id":data.id,
                    "codigo":data.codigo,
                    "nombre":data.nombre,
                    "precio":data.precio,
                    "cantidad":data.cantidad,
                    "total":data.total,
                    "active":false
                });
            }
        },

        setOpenCart(state){
            state.activado = true
        },

        setCloseCart(state){
            state.activado = false
        },

        setAument(state,index){
            state.carrito[index].cantidad++
        },

        setDecrement(state,index){
            if(state.carrito[index].cantidad <= 1){
                state.carrito[index].cantidad = 1
            }else{
                state.carrito[index].cantidad--
            }
        },
        setDeleteProduct(state,index){
            state.carrito.splice(index,1)
        }
    },
    actions: {



    },
    getters: {
        countProducts(state){
            return state.carrito.length;
        },

        showIcon(state){
            return state.carrito.length > 0 ? true : false
        },

        totalProducts(state){
            const acumular = (acumulador,productos) => acumulador + parseInt(productos.cantidad) 
            return  state.carrito.reduce(acumular,0)
        },

        subTotal(state){
            const acumular = (acumulador,productos) => acumulador + parseInt(productos.cantidad*productos.precio) 
            return  state.carrito.reduce(acumular,0)
        }

    }

}