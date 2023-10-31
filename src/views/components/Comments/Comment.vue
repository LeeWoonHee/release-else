<template>
  <div class="w-full blex py-4 md:py-5 px-0 md:px-5 border-0 border-b border-lighten-gray border-solid">
    <div class="w-full blex justify-between">
      <div class="blex">
        <div class="text-2xs lg:text-sm font-normal text-gray pr-3">
          {{ comment.user.email }}
        </div>
        <!-- 게시글 작성자가 댓글을 달았을 때 '작성자' 텍스트가 나오게 됩니다 -->
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
    </div>
    <div class="blex justify-start w-full text-black text-xs lg:text-sm font-normal py-2">
      {{ comment.content }}
    </div>
    <div class="w-full blex justify-start">
      <div class="blex cursor-pointer pr-2"
           @click="isExpandedInput = true"
      >
        <img src="@/assets/images/icon/comment.svg" alt="">
        <div class="pl-1 text-2xs lg:text-sm font-normal text-gray">
          댓글 달기
        </div>
      </div>
      <!-- 다른 유저 게시글에 본인이 작성한 댓글일 때, 본인이 작성한 게시글에 다른 유저들의 댓글을 볼 때 삭제하기가 나오게 됩니다 -->
      <div class="blex cursor-pointer" @click="destroy"
           v-if="$store.state.auth.user && $store.state.auth.user.id === comment.user.id"
      >
        <img src="@/assets/images/icon/trash.svg" alt="">
        <div class="pl-1 text-2xs lg:text-sm font-normal text-gray">
          삭제하기
        </div>
      </div>
    </div>
    <!-- 대댓글이 있을 시 '~개 댓글 더보기'가 나오게 됩니다-->
    <div class="blex w-full justify-start pt-5 cursor-pointer" v-if="!isExpandedReplies && replyCount > 0"
         @click="isExpandedReplies = true">
      <div class="text-2xs lg:text-sm font-normal text-gray pr-2">{{ replyCount }}개 답글<span> 더보기</span>
      </div>
      <img src="@/assets/images/icon/plusGray.svg" alt="">
    </div>
    <div class="blex w-full justify-start pt-5" v-else-if="replyCount === 0">
      <div class="text-2xs lg:text-sm font-normal text-gray pr-2">답글이 없습니다<span></span>
      </div>
    </div>
    <!--'~개 댓글 더보기' 클릭 시 '댓글 더보기' 텍스트가 '댓글 숨기기'로 바뀌게 됩니다-->
    <div
        @click="isExpandedReplies = false"
        class="blex w-full justify-start pt-5 cursor-pointer" v-else>
      <div class="text-2xs lg:text-sm font-normal text-gray pr-2">댓글 숨기기</div>
      <img src="@/assets/images/icon/minus.svg" alt="">
    </div>
    <div class="w-full">
      <!-- 대댓글 컴포넌트 start-->
      <reply
          v-if="isExpandedReplies"
          v-for="comment in replies"
          :key="comment.id"
          :comment="comment"
          :author_id="author_id"
      ></reply>
      <!-- 대댓글 컴포넌트 end-->
      <div v-if="isExpandedInput"
           class="blex w-full py-5 justify-end border-0 border-b-2 border-lighten-gray border-solid">
                <textarea
                    v-model="content"
                    class="w-full border border-lighten-gray border-solid resize-none text-2xs lg:text-sm text-black font-normal py-3 px-3 my-3 comment-area"
                    placeholder="답글을 작성해 주세요" rows="3" cols="30">
                </textarea>
        <div
            @click="isExpandedInput = false"
            class="font-normal text-2xs lg:text-sm text-black bg-white py-3 px-5 lg:px-8 blex cursor-pointer">
          취소
        </div>
        <div @click="store"
             class="font-normal text-2xs lg:text-sm text-white bg-main py-3 px-5 lg:px-8 blex cursor-pointer">
          등록하기
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Reply from './Reply'

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    },
    author_id: {}
  },
  data: () => ({
    isExpandedInput: false,
    isExpandedReplies: false,
    content: null,
    replies: [],
    replyCount: 0
  }),
  components: {
    Reply
  },
  watch: {
    isExpandedReplies (val) {
      if (val) {
        this.fetch()
      } else {
        this.replies = []
      }
    }
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
  },
  methods: {
    fetch () {
      this.$http.get(`/boards/${this.comment.board_id}/comments/${this.comment.id}`)
          .then((res) => {
            this.replies = res.data
          })
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

      this.$http.post(`/boards/${this.comment.board_id}/comments`, {
        content: this.content,
        comment_id: this.comment.id
      })
          .then((res) => {
            if (res.data.id) {
              if (this.isExpandedReplies) {
                this.fetch()
              } else {
                this.replyCount++
                this.isExpandedReplies = true
              }

              this.$vs.notify({
                text: '답글이 작성되었습니다',
                color: 'main',
                position: 'bottom-right'
              })
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
    },
    destroy () {
      this.$http.delete(`/boards/${this.comment.board_id}/comments/${this.comment.id}`)
          .then((res) => {
            this.$emit('comment:deleted', this.comment)
            this.$vs.notify({
              text: '댓글이 삭제되었습니다',
              color: 'warning',
              position: 'bottom-right'
            })
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
  beforeCreate () {},
  created () {
    this.replyCount = this.comment.children_count
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
