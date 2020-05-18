<template>
  <div>
      <Spinner v-if='loading' />
      <form v-if='!loading' class='form' @submit.prevent='handleSubmit'>
      <div class='input-field'>
        <label for='title'>Title</label>
        <input type='text' name='title' v-model='title'
        :class='[errors.title ? "invalid" : "validate"]'>
        <span class='helper-text' data-error='Title must not be empty'></span>
      </div>
       <div class='input-field'>
        <label for='body'>Body</label>
        <input type='text' name='body' v-model='body'
        :class='[errors.body ? "invalid" : "validate"]'>
        <span class='helper-text' data-error='Body must not be empty'></span>
      </div>
      <button
      type='submit'
      class='waves-effect btn waves-light'
      :disabled='body === "" || title === ""'>
       {{ id ? 'Update' : 'Add' }}
      </button>
  </form>
  </div>
</template>

<script>
import ApiService from '../../services/api';
import Spinner from '../Loader/Loader.vue';

export default {
  name: 'PostForm',
  props: {
    editingPost: Object,
  },
  components: {
    Spinner,
  },
  data: () => ({
    loading: false,
    title: '',
    body: '',
    errors: {},
    id: null,
  }),
  methods: {
    handleSubmit() {
      this.loading = true;
      if (!this.formIsValid) {
        this.loading = false;
        return;
      }
      if (this.id === null) {
        const post = {
          title: this.title,
          body: this.body,
        };
        ApiService.createData(post)
          .then((res) => {
            this.title = '';
            this.body = '';
            this.$emit('postCreated', res.data);
          }).catch((err) => {
            console.error(err);
          }).finally(() => {
            this.loading = false;
          });
      } else {
        const post = {
          title: this.title,
          body: this.body,
          id: this.id,
        };
        ApiService.updateData(post)
          .then((res) => {
            this.title = '';
            this.body = '';
            this.id = null;
            this.$emit('postCreated', res.data);
          }).catch((err) => {
            console.error(err);
          }).finally(() => {
            this.loading = false;
          });
      }
    },

    formIsValid() {
      this.errors = {};
      if (this.title.trim === '') {
        this.errors.title = 'Title';
      }
      if (this.body.trim === '') {
        this.errors.body = 'body';
      }
      if (Object.keys(this.errors).length > 0) {
        return false;
      } return true;
    },
  },
  watch: {
    editingPost(post) {
      this.title = post.title;
      this.body = post.body;
      this.id = post.id;
    },
  },
};
</script>
<style>
.form {
    margin: 50px;
}
</style>
