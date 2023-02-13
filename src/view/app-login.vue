<template>
   <v-container>
      <div class="container-login">
            <div class="form-login neon">      
               <img src="@/assets/logo-fantasy-rabbit.png" alt="" width="220" class="mt-3">
               <v-text-field label="Usuario" type="email" class="mt-8" outlined v-model="loginModel.username" prepend-inner-icon="mdi-account"></v-text-field>
               <v-text-field label="Contraseña" type="password" outlined class="mt-0" v-model="loginModel.password" prepend-inner-icon="mdi-lock"> </v-text-field>
               <v-btn class="btn-form mr-2" color="error" text> Reset</v-btn>
               <v-btn class="btn-form pink" dark @click="loginSession()">Entrar</v-btn>
               <br>
               <br>
               <br>
               <a href="#" class="mt-5">Olvidaste tu contraseña</a>
            </div>
      </div>
   </v-container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
      data:()=>({
            loginModel:{
               username:'',
               password:''
            }
      }),

      methods:{

         ...mapActions('login',['Login']),

         loginSession(){
            this.Login(this.loginModel)
         }
      }
 }
 </script>
 
 <style lang="scss">
    .container-login{
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       position: absolute;
       display: flex;
       justify-content: space-around;
       align-items: center;
          .form-login{
             width: 420px;
             height: 450px;
             background: #f0f3f5fb;
             border-radius: 10px;
             padding: 10px;
             box-sizing: border-box;
             text-align: center;
             //box-shadow: 0px 4px 14px 1px #096085;
             .btn-form{
                width: 47% !important;
             }
       }
    }
    .neon {
      border:5px solid #fff;
      background-color: transparent;
      box-shadow:  0 0 20px 5px #ff039a;
      }
 </style>