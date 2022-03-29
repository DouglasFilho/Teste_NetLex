<template>
  <v-app>
    <NavBar/>
    <div id="titulo" class="ml-15 mt-10 mb-10">
      Método 3
    </div>
    
    <v-container>
      <v-row>
        <v-col>
          <p class="pr-4">
           <b>Count</b> 
          </p>
        </v-col>
        <v-col>
          <p class="pl-4">
           <b>Minimum Word Length</b> 
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field v-model="count" type="number" outlined ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="minWordLength" type="number" outlined></v-text-field>
        </v-col>

      </v-row>


      <v-row class="mt-0">
        <v-col>
          <v-btn color="primary" @click="topWords()">Verificar</v-btn>
        </v-col>
      </v-row>

      <v-row v-show="returnVisibility" v-for="(word, index) in response" :key="index">
        <v-col>
          <p>{{word.nome}} - <b>{{word.quantidade}}</b> ocorrências no texto.</p>
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
    response: '',
    count: '',
    minWordLength: '',
    returnVisibility: false
  }),

  methods:{
    topWords(){
      var token = localStorage['token'];

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
        count: this.count,
        minWordLength: this.minWordLength
      };

      http.post( 
        '/documents/top-words',
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