<template>
  <div class="w-full blex justify-between pl-8 md:pl-16 pt-3">
    <div class="blex">
      <div class="text-2xs lg:text-sm font-normal text-gray pr-3">
        {{ comment.user.email }}
      </div>
      <div class="text-2xs lg:text-sm font-bold text-main"
           v-if="author_id === comment.user.id"
      >
        작성자 <span class="text-danger"
                  v-if="$store.state.auth.user && $store.state.auth.user.id === comment.user.id">나</span>
      </div>
      <div class="text-2xs lg:text-sm font-bold text-danger"
           v-else-if="$store.state.auth.user && $store.state.auth.user.id === comment.user.id"
      >
        나
      </div>
    </div>
    <div class="text-2xs lg:text-sm font-normal text-gray">
      {{ time }}
    </div>
    <div class="blex justify-start w-full text-black text-2xs lg:text-sm font-normal py-2">
      {{ comment.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reply',
  props: {
    comment: {
      type: Object,
      required: true
    },
    author_id: {}
  },
  computed: {
    time () {
      const date = this.$moment(this.comment.created_at)
      if (date.isSame(new Date(), 'day')) {
        return date.format('HH: mm: ss')
      } else {
        return date.format('YYYY - MM -DD')
      }
    }
  }
}
</script>

<style scoped>

</style>
