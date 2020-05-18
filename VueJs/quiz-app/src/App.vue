<template>
 <div id="app">
   <Header :numTotal='numTotal' :numCorrect='numCorrect' />
   <b-container>
     <b-row>
      <b-col>
        <p v-if='loading'>Loading question...</p>
        <QuestionBox v-if='!loading && questions.length' :currentQuestion='questions[index]' :next='next' :index='index' :increment='increment'/>
      </b-col>
     </b-row>
   </b-container>
  </div>
</template>

<script>

import Header from './components/Header.vue';
import QuestionBox from './components/QuestionBox.vue';

export default {
  name: 'App',
  components: {
    Header,
    QuestionBox,
  },
  data: () => ({
    questions: [],
    index: 0,
    loading: false,
    numCorrect: 0,
    numTotal: 0
  }),
  methods: {
    async getData() {
      this.loading = true;
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=10&category=27&type=multiple');
        const data = await res.json();
        if (!res.ok) {
              throw new Error(res.message || 'Error fetching');
        }
        this.questions = data.results
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false;
      }
    },

    next() {
      if(this.index < 10) {
        this.index++;
      }
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++
      }
      this.numTotal++
    }
  },
  mounted() {
    this.getData()
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
