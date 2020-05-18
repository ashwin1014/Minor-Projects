<template>
  <div class='cats container'>
    <h2>Cats for Adoption</h2>
    <b-table striped hover :items="cats">
      <template v-slot:cell(name)="data">
        <router-link :to="`/pets/cats/${data.index}`">{{ data.value }}</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Cats',
  data: () => ({
    // cats
  }),
  computed: {
    ...mapState([
      'cats'
    ])
  }
}
</script>
