<template>
  <div
      v-if="type === 'birthDay'"
      class="bs-input-wrapper"
      :class="{'focus': active}"
  >
    <vx-tooltip text="필수 항목입니다" color="main" v-if="!isOptional">
      <div
          class="bs-input-label text-base md:text-lg leading-lg pb-1 font-bold required"
      >
        {{ text }}
      </div>
    </vx-tooltip>
    <div
        v-else
        class="bs-input-label text-base md:text-lg leading-lg pb-1 font-bold"
    >
      {{ text }}
    </div>
    <div class="w-full blex">
      <div class="w-1/3 blex">
        <input @keypress="(e) => $emit('keypress', e)" @focusin="active = true" @focusout="active = false"
               class="bs-input text-base md:text-lg px-4 py-2"
               :type="type" :placeholder="placeholder" v-model="year">
        <mdicon :icon-color="iconColor" v-if="icon" :name=icon></mdicon>
        <div v-else>년</div>
      </div>
      <div class="w-1/3 blex">
        <input @keypress="(e) => $emit('keypress', e)" @focusin="active = true" @focusout="active = false"
               class="bs-input text-base md:text-lg px-4 py-2"
               :type="type" :placeholder="placeholder" v-model="month">
        <mdicon :icon-color="iconColor" v-if="icon" :name=icon></mdicon>
        <div v-else>월</div>
      </div>
      <div class="w-1/3 blex">
        <input @keypress="(e) => $emit('keypress', e)" @focusin="active = true" @focusout="active = false"
               class="bs-input text-base md:text-lg px-4 py-2"
               :type="type" :placeholder="placeholder" v-model="day">
        <mdicon :icon-color="iconColor" v-if="icon" :name=icon></mdicon>
        <div v-else>일</div>
      </div>
    </div>
  </div>
  <div v-else class="bs-input-wrapper" :class="{'focus': active}">
    <vx-tooltip text="필수 항목입니다" color="main" v-if="!isOptional">
      <div
          class="bs-input-label text-base md:text-lg leading-lg pb-1 font-bold required"
      >
        {{ text }}
      </div>
    </vx-tooltip>
    <div
        v-else
        class="bs-input-label text-base md:text-lg leading-lg pb-1 font-bold"
    >
      {{ text }}
    </div>
    <input @keypress="(e) => $emit('keypress', e)" @focusin="active = true" @focusout="active = false"
           class="bs-input text-base md:text-lg px-4 py-2"
           :class="icon ? '' : 'w-full'"
           :type="type" :placeholder="placeholder" v-model="localValue">
    <mdicon :icon-color="iconColor" v-if="icon" :name=icon></mdicon>
  </div>
</template>
<script>
export default {
  name: 'BsInput',
  props: {
    text: {},
    placeholder: {},
    type: {
      default: 'text'
    },
    icon: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: null
    },
    isOptional: {
      type: Boolean,
      default: false
    },
    value: {
      default: null
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localValue = val
      }
    },
    localValue: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    }
  },
  computed: {
    year: {
      get () {
        if (this.localValue) {
          const localArray = this.localValue.split('-')
          if (localArray.length > 2) {
            return `000${localArray[0]}`.slice(-4)
          } else {
            return null
          }
        } else {
          return null
        }
      },
      set (val) {
        this.localValue = `${`000${val}`.slice(-4)}-${this.month || '00'}-${this.day || '00'}`
      }
    },
    month: {
      get () {
        if (this.localValue) {
          const localArray = this.localValue.split('-')
          if (localArray.length > 2) {
            return `0${localArray[1]}`.slice(-2)
          } else {
            return null
          }
        } else {
          return null
        }
      },
      set (val) {
        this.localValue = `${this.year || '00'}-${`0${val}`.slice(-2)}-${this.day || '00'}`
      }
    },
    day: {
      get () {
        if (this.localValue) {
          const localArray = this.localValue.split('-')
          if (localArray.length > 2) {
            return `0${localArray[2]}`.slice(-2)
          } else {
            return null
          }
        } else {
          return null
        }
      },
      set (val) {
        this.localValue = `${this.year || '00'}-${this.month || '00'}-${`0${val}`.slice(-2)}`
      }
    }
  },
  data: () => ({
    active: false,
    localValue: null
  })
}
</script>

<style scoped lang="scss">
div.bs-input-wrapper::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  .bs-input-label {
    transition: all .2s linear;
    color: #202020;
    position: relative;

    &.required {
      padding-right: 10px;

      &::after {
        top: 10px;
        position: absolute;
        right: 0;
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #784FEA;
      }
    }
  }

  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #bebebe;
    z-index: 1;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #2C66DB;
    z-index: 2;
    transition: width .2s linear;
  }

  .bs-input {
    border: none;
    width: calc(100% - 24px);

    &::placeholder {
      color: #bebebe;
      font-size: 18px;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
  }


  &.focus {
    .bs-input-label {
      color: #2C66DB;
    }

    &:before {
      width: 100%;
    }

    svg {
      fill: #2C66DB;
    }
  }
}
</style>
