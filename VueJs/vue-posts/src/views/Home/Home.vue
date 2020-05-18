<template>
<div>
    <div class='row'>
        <div class='col s6'>
            <PostForm @postCreated='addPost' :editingPost='editingPost'/>
        </div>
    </div>
    <Spinner v-if='loading' />
    <div class='row' v-if='!loading'>
    <div class='col s6' v-for='(post, index) in posts'
        v-bind:item='post'
        v-bind:index='index'
        v-bind:key='post.id'
    >
    <Card
    :title='post.title'
    :createdAt='post.createdAt'
    :body='post.body'
    :id='post.id'
    :editPost='editPost'
    :deletePost='deletePost'
    :post='post'/>
    </div>
</div>
</div>
</template>

<script>
import ApiService from '../../utils/ApiService';
import PostForm from '../../components/PostForm/PostForm.vue';
import Spinner from '../../components/Loader/Loader.vue';
import Card from '../../components/Card/Card.vue';

const apiService = new ApiService();

export default {
  name: 'Home',
  components: {
    PostForm,
    Spinner,
    Card,
  },
  data: () => ({
    posts: [],
    loading: false,
    editingPost: null,
  }),
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      this.loading = true;
      apiService.getData()
        .then((res) => {
          this.posts = res.data;
          this.loading = false;
          console.log(this.posts);
        }).catch((err) => {
          console.error(err);
          this.loading = false;
        });
    },
    addPost(post) {
      if (this.posts.find((p) => p.id === post.id)) {
        const index = this.posts.findIndex((p) => p.id === post.id);
        this.posts.splice(index, 1, post);
      } else {
        this.posts.unshift(post);
      }
    },
    deletePost(id) {
      apiService.deleteData(id).then(() => {
        this.posts = this.posts.filter((item) => item.id !== id);
        console.log('deleted');
      });
    },
    editPost(post) {
      this.editingPost = post;
    },
  },

};

</script>
