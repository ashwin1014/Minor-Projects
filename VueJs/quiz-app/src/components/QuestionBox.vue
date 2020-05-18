<template>
  <div class='question-box-container'>
    <b-jumbotron>
        <template v-slot:lead>
            {{currentQuestion.question}}
        </template>

        <hr class="my-4">
        <b-list-group>
            <b-list-group-item
                v-for='(answer, i) in answers'
                :key='i'
                @click='selectedAnswer(i)'
                :active='selectedIndex === i'
                :class='[answered && correctIndex === i ? "correct" : answered && selectedIndex === i && correctIndex !== i ? "incorrect" : ""]'
            >
                {{ answer }}
           </b-list-group-item>
        </b-list-group>
        <br />
        <b-button
         variant='primary'
         @click='submitAnswer'
         :disabled='selectedIndex === null || answered'
        >
        Submit
        </b-button> &emsp;
        <b-button variant="success" @click='next()' :disabled='index > 9'>Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
    props: {
        currentQuestion: Object,
        next: Function,
        index: Number,
        increment: Function
    },
    data: () => ({
        selectedIndex: null,
        correctIndex: null,
        shuffledAnswers: [],
        answered: false

    }),
    computed: {
        answers() {
            const answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer];
            return answers;
        }
    },
    methods: {
        selectedAnswer(i) {
            this.selectedIndex = i
        },
        shuffleAnswers() {
           const answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer];
           this.shuffledAnswers = this.shuffleArray(answers);
           this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer);
        },
        shuffleArray(arr) {
            if (arr.length === 0) {
                return [];
            }
            for(let i=arr.length-1; i>0; i--) {
                const rand = Math.floor(Math.random() * (1 + i));
                [arr[i], arr[rand]] = [arr[rand], arr[i]];
            }
            return arr;
        },
        submitAnswer() {
            let isCorrect = false
            if (this.selectedIndex === this.correctIndex) {
                isCorrect = true
            }
            this.answered = true;
            this.increment(isCorrect)
        }
    },
   watch: {
       // below method does not work on initial render
    //    currentQuestion() {
    //        this.selectedIndex = null;
    //        this.shuffleAnswers()
    //    }
    currentQuestion: {
        immediate: true,
        handler() {
            this.selectedIndex = null;
            this.answered = false;
            this.shuffleAnswers()
        }
    }
   }
}
</script>

<style scoped>
 .list-group-item {
     cursor: pointer;
 }
 .btn-primary.disabled {
     cursor: not-allowed;
 }
 .list-group-item:hover:not(.active),
 .list-group-item:hover:not(.correct),
 .list-group-item:hover:not(.incorrect) {
     background: #EEE;
 }
 .correct {
     background: green;
 }
 .incorrect {
     background: red;
 }
</style>