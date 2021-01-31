const app = Vue.createApp({
  data() {
    return {
      counter: 1,
      name: '',
    };
  },
  methods: {
    addCounter (num) {
      this.counter += num;
    },
    reduceCounter () {
      this.counter--
    },
    nameChange (event, message) {
      this.name = event.target.value;
    },
    handleConfirm () {
      alert('Confirmed')
    },
    resetInput () {
      this.name = ''
    }
  }
});

app.mount('#events');
