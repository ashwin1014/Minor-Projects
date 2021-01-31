const app = Vue.createApp({
    data () {
        return {
            courseGoalA: 'Finish Course',
            courseGoalB: 'Master Vue',
            courseGoalC: '<h2 style="color: #FFF">Master Vue</h2>',
            vueLink: 'https://vuejs.org'
        }
    },
    methods: {
        outputGoal() {
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
                return this.courseGoalA
            } else {
                return this.courseGoalB
            }
        }
    }
});

app.mount('#user-goal');