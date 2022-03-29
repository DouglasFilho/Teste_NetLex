<template>
  <v-app>
    <NavBar/>
    <div id="titulo" class="ml-15 mt-10 mb-10">
      Método 2
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
          <v-btn color="primary" @click="wordSentence()">Verificar</v-btn>
        </v-col>
      </v-row>

      <v-row v-show="returnVisibility">
        <v-col>
          <p>A palavra <b>{{word}}</b> foi encontrada em {{response.quantidade}} frase(s) no texto.</p>
        </v-col>
      </v-row>

      <v-row v-show="returnVisibility" v-for="(frase, index) in response.frases" :key="frase">
        <v-col>
          <p>{{index + 1}} - <span v-html="frase"></span></p>
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
    wordSentence(){
      var token = localStorage['token'];

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
        word : this.word
      };

      http.post( 
        '/documents/word-sentences',
        bodyParameters,
        config
      ).then((response) => {
          this.response = response.data;
          this.returnVisibility = true;
          this.boldPhrase();
      }).catch((error)=> {
          this.$router.push('/');
      });
    },
    boldPhrase(){
      var boldPhrases = [];
      this.response.frases.forEach(element => {
        var find = '\\b'+ this.word +'\\b';
        var re = new RegExp(find, 'gi');

        boldPhrases.push(element.replace(re,`<b>${this.word}</b>`));

      });

      this.response.frases = boldPhrases;
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