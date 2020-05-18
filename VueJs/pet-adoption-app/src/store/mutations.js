export default {
  APPEND_PET: (state, { species, pet }) => {
    state[species].push(pet)
  }
}
