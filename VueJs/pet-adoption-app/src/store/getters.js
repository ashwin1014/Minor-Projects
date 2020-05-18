// doesn't not modify state -> just to compute derived state and display on components
export default {
  animalsCount: (state) => {
    return state.cats.length + state.dogs.length
  },
  getAllCats: (state) => {
    return state.pets.filter((cat) => cat.species === 'cat')
  }
}
