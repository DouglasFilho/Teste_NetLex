<template>
    <v-navigation-drawer  app permanent width="150" src='../images/backgroundDrawer.png'>
      <v-list dense nav>

        <v-list-item>
          <v-btn v-if="path == 1" block>Método 1</v-btn>
          <v-btn v-else color="white" block text @click="redirectWordFrequency()">Método 1</v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn v-if="path == 2" block>Método 2</v-btn>
          <v-btn v-else block text color="white" @click="redirectWordSetence()">Método 2</v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn v-if="path == 3" block>Método 3</v-btn>
          <v-btn v-else block text color="white" @click="redirectTopWords()">Método 3</v-btn>
        </v-list-item>
        
      </v-list>
      
    </v-navigation-drawer>
</template>

<script>
  export default{
    name: "NavBar",

    data: () => ({
      path: ''
    }),

    methods:{
      redirectWordFrequency(){
        var path = "/word-frequency";
        this.$router.push(path);
      },
      redirectWordSetence(){
        var path = "/word-setence";
        this.$router.push(path); 
      },
      redirectTopWords(){
        var path = "/top-words";
        this.$router.push(path);
      }
    },
    watch: {
      '$route':{
        immediate: true,
        handler(newValue,oldValue){
          if(newValue.path == "/word-frequency")
            this.path = 1;
          if(newValue.path == "/word-setence")
            this.path = 2;
          if(newValue.path == "/top-words")
            this.path = 3;
        }
      }
    }
}


</script>
