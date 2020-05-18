export default {
  addPet: (context, payload) => {
    context.commit('APPEND_PET', payload)
  }
}
