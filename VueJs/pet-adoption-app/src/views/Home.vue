<template>
  <div class="home">
    <h1>Adopt a new best friend!</h1><br>
    <p>Number or pets for adoption: {{ animalsCount }}</p> <br>
    <button class='btn btn-primary' @click="toggleshowPetForm">Add New Pet</button>
    <br>
    <div class='container pet-form' v-if="showPetForm">
      <b-form @submit.prevent="handleSubmit">
      <b-form-group id="input-group-2" label="Pet's Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="formData.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Species:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="formData.species"
          :options="['cats', 'dogs']"
          required
        ></b-form-select>
      </b-form-group>

         <b-form-group id="input-group-4" label="Pet's Age:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="formData.age"
          required
          placeholder="Enter age"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled='isDisabled()'>Submit</b-button>
    </b-form>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

const INIT_STATE = {
  name: '',
  age: 0,
  species: null
}

export default {
  name: 'Home',
  data: () => ({
    showPetForm: false,
    formData: INIT_STATE
  }),
  components: {
  },
  methods: {
    ...mapActions([
      'addPet'
    ]),
    toggleshowPetForm () {
      this.showPetForm = !this.showPetForm
    },
    handleSubmit () {
      const payload = {
        species: this.formData.species,
        pet: {
          name: this.formData.name,
          age: this.formData.age
        }
      }
      this.addPet(payload)
      this.formData = {
        name: '',
        age: 0,
        species: null
      }
    },
    isDisabled () {
      if (this.formData.name === '' || this.formData.age === 0 || this.formData.species === null) return true
      else return false
    }
  },
  computed: {
    ...mapGetters([
      'animalsCount'
    ])
  }
}
</script>

<style lang="sass" scoped>
@import './Home.styles.scss'
</style>
