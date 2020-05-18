<template>
    <div>
        ({{ $route.params.species }})
        <h3>Name: {{animal.name}}</h3>
        <h3>Age: {{animal.age}}</h3>
        <h3>Breed: {{animal.breed}}</h3>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Pet',
  data: () => ({
    animal: {}
  }),
  computed: {
    ...mapState([
      'dogs',
      'cats'
    ])
  },
  methods: {
    setPet () {
      const pet = this[this.$route.params.species][this.$route.params.id]
      this.animal = pet
    }
  },
  mounted () {
    this.setPet()
  }
}
</script>
