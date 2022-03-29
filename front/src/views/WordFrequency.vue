<template>
  <v-app>
    <NavBar/>
    <div id="titulo" class="ml-15 mt-10 mb-10">
      Método 1
    </div>
    
    <v-container>
      <v-row>
        <v-col>
          <p>
            <b>Digite uma palavra</b>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field v-model="word" outlined ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col>
          <v-btn color="primary" @click="wordFrequency()">Verificar</v-btn>
        </v-col>
      </v-row>

      <v-row v-show="returnVisibility">
        <v-col>
          <p>A palavra <b>{{word}}</b> apareceu {{response.quantidade}} vezes no texto.</p>
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
import http from '../urlConfig'
import NavBar from '../components/NavBar.vue'

export default {
  name: 'App',

  components: {
    NavBar
  },

  data: () => ({
    word:'',
    response:'',
    returnVisibility: false
  }),

  methods:{
    wordFrequency(){
      var token = localStorage['token'];

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
        word : this.word
      };

      http.post( 
        '/documents/word-frequency',
        bodyParameters,
        config
      ).then((response) => {
          this.response = response.data;
          this.returnVisibility = true;
      }).catch((error)=> {
          this.$router.push('/');
      });
    }
  },
  watch: {
    word(newWord, oldWord) {
      this.returnVisibility = false;
    }
  }
};
</script>

<style scoped>
  #titulo{
    font-size: 35px;
    font-weight: bold;
  }

  p{
    font-size: 20px;
  }
</style>