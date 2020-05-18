<template>
  <div class='dogs container'>
      <h2>Dogs for Adoption</h2>
    <b-table striped hover :items='dogs'>
       <template v-slot:cell(name)="data">
        <router-link :to="`/pets/dogs/${data.index}`">{{ data.value }}</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Dogs',
  data: () => ({
    // dogs
  }),
  computed: {
    ...mapState([
      'dogs'
    ])
  }
}
</script>
