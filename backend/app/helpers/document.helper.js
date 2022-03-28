module.exports = {
    wordFrequency: function(doc, word){
        var quantity = 0;
        var wordsDoc = this.stringToWordsArray(doc.content);

        //verifica quantas vezes a palavra existe no array e incrementa a variavel quantity para cada uma delas
        wordsDoc.forEach(wordDoc => {
            if(wordDoc.toLowerCase() == word.toLowerCase())
                quantity++;
        });

        var response = {
            "quantidade" : quantity
        };

        return(response);
    },

    wordSentences: function(doc, word){
        //regex para separa o texto em frases.
        var phrases = doc.content.split(/[.;:\n]/);
        var phrasesWithWord = [];

        //verifica em cada frase atraves do regex a existencia da palvra que esta sendo procurada
        //caso exista a frase é adicionada ao array phrasesWithWord
        phrases.forEach(phrase => {
            if(RegExp('\\b'+ word.toLowerCase() +'\\b').test(phrase.toLowerCase()))
                phrasesWithWord.push(phrase);
        });

        var response = {
            "quantidade" : phrasesWithWord.length,
            "frases" : phrasesWithWord
        };

        return (response);
    },

    topWords: function(doc, count, minWordLength){ 
        //separa todo o texto em um array de palavras
        var words = this.stringToWordsArray(doc.content);
        var wordsLength = [];
        var wordsLengthComplete = [];

        //insere no array wordsLength as palavras que se encontram dentro dos requisitos passados para a busca
        words.forEach(word => {
            if(word.length >= minWordLength)
            wordsLength.push(word);
        });
        
        //insere no array wordsLengthComplete a palavra e quantas vezes ela apreceu no texto
        wordsLength.forEach(word => {
            var quantity = this.howManyTimes(wordsLength,word);
            wordsLengthComplete.push({nome: word, quantidade:quantity});
        });

        //ordena o array
        wordsLengthComplete = this.sortArray(wordsLengthComplete);

        //remove as duplicidades no array atraves do filter
        wordsLengthComplete = wordsLengthComplete.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.nome === value.nome && t.quantidade === value.quantidade
            ))
        );
        
        //retorna a quantidade requisitada de palavras 
        return(wordsLengthComplete.slice(0,count));
    },

    howManyTimes: function(words, wordFind){
        var quantity = 0;

        //verifica quantas vezes a palavra aparece no array e incrementa a variavel quantity para cada uma delas
        words.forEach(word => {
            if(wordFind.toLowerCase() == word.toLowerCase())
                quantity++;
        });

        return (quantity);
    },

    sortArray: function(array){
        //seta a variavel done como true
        //percorre o array inteiro invertendo as posições em que o valor atual é menor do que o valor seguinte
        //caso ocorra alguma inversão a variavel done é setada como false
        //no fim do for o while é feito novamente caso a variavel done seja false
        //se nenhuma inversão foi efetuada é sinal de que o array está ordenado e a variavel done continua como true
        var done = false;
        while (!done) {
          done = true;
          for (var i = 1; i < array.length; i++) {
            if (array[i - 1].quantidade < array[i].quantidade) {
              done = false;
              var tmp = array[i-1];
              array[i-1] = array[i];
              array[i] = tmp;
            }
          }
        };

        return (array);
    },

    stringToWordsArray: function(text) {
        //retorna o texto como um array de strings
        return text.match(/[a-zÀ-ú]+/gmui);
    }
}

