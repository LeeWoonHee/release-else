<template>
  <!-- 댓글 등록 end -->
  <!-- 댓글 리스트 start -->
  <div class="w-full blex">
    <div class="blex w-full py-6 lg:py-16 justify-end">
      <div class="w-full font-bold text-sm lg:text-xl text-black">
        댓글 {{ total }}개
      </div>
      <textarea
          class="w-full border border-lighten-gray border-solid resize-none text-2xs lg:text-sm text-black font-normal py-3 px-3 my-3 comment-area"
          placeholder="댓글을 작성해 주세요" rows="5" cols="30" v-model="content">
              </textarea>
      <div class="font-normal text-2xs lg:text-lg text-white bg-main py-3 px-5 lg:px-8 blex cursor-pointer"
           @click="store">
        등록하기
      </div>
    </div>
    <!-- 댓글 컴포넌트 start -->
    <comment
        @comment:deleted="remove"
        v-for="comment in comments"
        :key="comment.id"
        :author_id="author_id"
        :comment="comment"
    ></comment>
    <!-- 댓글 컴포넌트 end -->
    <!-- 전체 댓글 더보기 start -->
    <div
        class="w-full blex pt-4 lg:pt-8 pb-10 lg:pb-16 cursor-pointer"
        v-if="page < last_page"
        @click="fetch"
    >
      <div class="text-sm lg:text-lg font-normal text-black pr-1">댓글 더보기</div>
      <img src="@/assets/images/icon/plusGray.svg" alt="">
    </div>
    <!-- 전체 댓글 더보기 end -->
    <!-- '전체 댓글 더보기' 클릭 시 start, 댓글 숨기기로 변경 됩니다-->
    <div
        class="w-full blex pt-4 lg:pt-8 pb-10 lg:pb-16 text-warning"
        v-else
    >
      <div class="text-sm lg:text-lg font-normal text-light-gray">더 이상 댓글이 없습니다</div>
    </div>
    <!-- 전체 댓글 더보기 클릭 시 end-->
  </div>
</template>

<script>
import Comment from './Comment'

export default {
  name: 'Comments',
  props: {
    boardId: {
      type: Number,
      required: true
    },
    author_id: {}
  },
  data: () => ({
    comments: [],
    page: 0,
    total: 0,
    last_page: 1,
    content: null
  }),
  components: {
    Comment
  },
  methods: {
    fetch () {
      if (this.page < this.last_page) {
        this.page += 1
        this.$http.get(`/boards/${this.boardId}/comments`, {
          params: {
            page: this.page
          }
        })
            .then((res) => {
              if (this.page > 1) {
                // this.comments = this.comments.concat(res.data.data)
                this.comments = [...this.comments, ...res.data.data]
              } else {
                this.comments = res.data.data
              }

              this.total = res.data.total
              this.last_page = res.data.last_page
            })
      }
    },
    remove (comment) {
      this.comments = []
      this.page = 0
      this.total = 0
      this.last_page = 1
      this.content = null
      this.fetch()
    },
    store () {
      if (!this.content) {
        this.$vs.notify({
          text: '내용을 작성하여 주세요',
          color: 'danger',
          position: 'bottom-right'
        })
        return
      } else if (this.content.length > 150) {
        this.$vs.notify({
          text: '150자 이내로 작성하여 주세요',
          color: 'danger',
          position: 'bottom-right'
        })
        return
      }

      this.$http.post(`/boards/${this.boardId}/comments`, {
        content: this.content
      })
          .then((res) => {
            if (res.data.id) {

              this.$vs.notify({
                text: '댓글이 작성되었습니다',
                color: 'main',
                position: 'bottom-right'
              })
              this.comments = []
              this.page = 0
              this.total = 0
              this.last_page = 1
              this.content = null
              this.fetch()
            } else {
              this.$vs.notify({
                text: '권한이 없습니다',
                color: 'danger',
                position: 'bottom-right'
              })
            }
          })
          .catch(() => {
            this.$vs.notify({
              text: '권한이 없습니다',
              color: 'danger',
              position: 'bottom-right'
            })
          })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped>

</style>
