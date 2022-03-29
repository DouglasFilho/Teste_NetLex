<template>
  <v-app>
    <v-row align="center" justify="center" style="height:100vh">
      <v-card width="500" height="500" class="mx-auto">
        
          <v-card-title class="mt-1 ml-3">Login</v-card-title>
          <v-divider class="mt-5 mb-5"/>

          <v-row align="center" justify="center">
            <form @submit.prevent="sendLogin">
              <v-card-text>
                <label for="email">E-mail</label>
                <v-text-field class="mt-5" :error="invalidEmail" outlined v-model="email" @blur="this.validateEmail"></v-text-field>
                <label for="senha">Senha</label>
                <v-text-field class="mt-5" type="password" outlined v-model="password"/>
              </v-card-text>
              <v-card-actions>
                <v-row justify="center">
                <v-btn type="submite" class="mt-5" :disabled="!isActive" width="90%" color="primary" x-large>Entrar</v-btn>
                </v-row>
              </v-card-actions>
            </form>
          </v-row>
      </v-card>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      left
    >
      Falha no Login
    </v-snackbar>
  </v-app>
</template>

<script>
import http from '../urlConfig'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    email:'',
    password:'',
    isActive: false,
    snackbar: false,
    invalidEmail: false,
    timeout: 2000
  }),

  methods:{
    sendLogin(){
      http.post('/users/login', {
        email: this.email,
        password: this.password
      })
      .then((response) => {
        localStorage['token'] = response.data.token;

        var path = "/word-frequency";
        this.$router.push(path);
      })
      .catch((error) =>{
        this.snackbar = true;
      });
    },

    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.isActive = true;
        this.invalidEmail = false;
      }else{
        this.isActive = false;
        this.invalidEmail = true;
      } 
    }
  }
};
</script>

<style scoped>
  div[data-app='true'] {
    background: url('../images/background.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    overflow: hidden;
  }

  label{
    font-size: 20px;
  }

  form{
    width: 80%;
  }
</style>