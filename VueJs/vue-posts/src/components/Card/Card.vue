<template>
    <div class='card'>
        <div class='card-content'>
            <p class='card-title'>{{ title }}</p>
            <p class='timestamp grey-text'>{{ createdAt | formatDate }}</p>
            <p>{{ body }}</p>
        </div>
        <div class='card-action'>
            <a @click='editPost(post)' class='pointer'>Edit</a>
            <a @click='deletePost(id)'
                class='delete-btn red-text text-accent-2 pointer'>Delete</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    createdAt: String,
    body: String,
    post: Object,
    id: String,
    editPost: Function,
    deletePost: Function,
  },
  filters: {
    formatDate(date) {
      // eslint-disable-next-line no-param-reassign
      date = new Date(date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
};
</script>

<style scoped lang='scss'>
    .card {
        .card-content {
            .card-title {
                margin-bottom: 0;
            }
            .timestamp {
                margin-bottom: 10px;
            }
        }
        .card-action {
            .pointer {
                cursor: pointer;
            }
        }
    }
</style>
