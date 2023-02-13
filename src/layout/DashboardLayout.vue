<template>
  <v-app id="inspire">
    <v-app-bar app dark>
      <div class="logo">
        <!-- <a href="/pedidos"> <img src="@/assets/icon-white-supernova.png" alt="" width="60px" style="margin-top:25px"></a> -->
        <!-- <div class="title text-center">
          <h2 class="mt-2">SEX SHOP</h2>
        </div> -->
          <img src="@/assets/logo-fantasy-rabbit-white.png" alt="" width="120" height="50">
      </div>

      <!-- icon para menu mobile -->
      <div class="btn-mobile">
        <img src="@/assets/isotipo-white-fantasy.png" alt="" width="35" class="mt-2">
                <!-- <v-btn icon color="white" @click="menuOpenClose()">
                    <v-icon large>mdi-dots-vertical</v-icon>
                </v-btn> -->
      </div>

      <v-badge color="pink" overlap :content="countProducts" class="cart-icon" v-if="showIcon">
        <v-btn icon @click="setOpenCart()">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
      <v-btn icon class="cart-icon" v-else>
          <v-icon>mdi-cart</v-icon>
      </v-btn>

      <div class="text-center logout-session">
        <v-menu>
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <span>{{ user }} </span>
                <v-btn class="mx-2" fab dark small color="white" v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                  <v-icon dark color="primary">
                    mdi-account
                  </v-icon>
                </v-btn>
              </template>
              <span>Cerrar sesion</span>
            </v-tooltip>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-btn icon color="primary" @click="Logout()">
                    <v-icon>mdi-logout</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn text color="primary" @click="Logout()"> Cerrar Sessión</v-btn>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn color="error" text @click="fav = !fav">
                    Cancelar
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>



    </v-app-bar>

    <v-carousel cycle height="500" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">
              {{ slide }} Slide
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div class="cintillo">
      ¡Pide hoy y te lo llevamos hoy! Envío discreto siempre
    </div>

    <v-main class="mt-3 black">
      <v-container>
        <slot />
      </v-container>

    </v-main>

    <transition enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutLeft" mode="out-in">
      <div class="menu-mobile" v-if="menu_mobile">

        <div class="card-menu light" v-if="menu">
          <v-btn icon color="error" class="btn-close-menu-mobile" @click="menuOpenClose()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-list dense>
            <v-subheader>Importadora Supernova</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in 6" :key="i" to="/ruta" @click="menuOpenClose()">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    modulo
                    <v-chip color="error" v-if="item.ruta === '/pedidos'"> 1</v-chip>
                    <v-chip color="error" v-if="item.ruta === '/creditos'"> 2</v-chip>
                    <v-chip color="error" v-if="item.ruta === '/procesados'"> 3 </v-chip>
                    <v-chip color="error" v-if="item.ruta === '/almacen'"> 4</v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </div>
    </transition>
  </v-app>

</template>
  
<script>
//import axios from 'axios'
import { mapActions, mapGetters,mapMutations } from 'vuex';
export default {
  data() {
    return {
      on_drawer: true,
      menu_mobile: false,
      menu: false,
      selectedItem: 0,
      notification: false,
      pedidos: false,
      pedidosVip: false,
      titulo: '',
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    };
  },



  computed: {
    ...mapGetters('cart', ['countProducts','showIcon']),

    user(){
      return sessionStorage.getItem('user');
    }
  },

  methods: {

    ...mapMutations('cart',['setOpenCart']),
    ...mapActions('login',['Logout']),

    menuOpenClose() {
      this.menu_mobile = !this.menu_mobile
      this.menu = !this.menu
    },
    
  },
};
</script>
  
<style lang="scss">
header {
  background-color: #000 !important;
  /*position: absolute !important;*/
  box-shadow: none !important;
  height: 60px !important;
}

.v-carousel__controls {
  bottom: 10px;
}

.cintillo {
  width: 100%;
  height: 38px;
  text-align: center;
  background-color: #f11066;
  color: #fff;
  margin-top: -12px;
  padding-top: 5px;
  margin-bottom: -12px;
}

.menu-ventas {
  width: 67%;
  display: flex;
  margin: 100px auto !important;
  height: 95px;
  padding-top: 25px;

  @media(max-width:1300px) {
    width: 85%;
  }

  @media(max-width:960px) {
    width: 100%;
  }

  @media(max-width:850px) {
    display: none;
  }

  .v-list-item {
    text-align: center;
    width: 50px !important;
  }
}

.btn-mobile {
  display: none;

  @media(max-width:850px) {
    display: block;
  }
}

.logo {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;

  @media(max-width:1300px) {
    margin-left: 0px;
  }

  @media(max-width:960px) {
    display: none;
  }

  .title {
    height: 50px;

    @media(max-width:1300px) {
      display: none;
    }
  }
  img{
        cursor: pointer;
    }
}

.menu-mobile {
  top: 0;
  left: .0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.671);
  position: fixed;
  z-index: 10;

  .card-menu {
    width: 60%;
    height: 100vh;
    background-color: #fff;

    .btn-close-menu-mobile {
      position: absolute;
      right: 40%;
      top: 5px;
    }
  }
}

.badge {
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  z-index: 2;
  top: 2px;
  right: 3px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-out;
}

.cart-icon {
  position: absolute !important;
  right: 310px;
  top: 10px;
}

.logout-session {
  position: absolute;
  right: 15px;
  top: 12px;
  widows: 200px;
}
</style>