<template>
  <div class="bp-textarea-wrapper">
    <div class="flex flex-nowrap">
      <div class="bp-textarea-label">{{ label }}</div>
      <div v-if="required" class="required">*</div>
    </div>
    <textarea v-model="localValue"
              class="bp-textarea"
              :placeholder="placeholder" :rows="row" :cols="cols" :required="required"/>
  </div>

</template>

<script>
export default {
  name : "ElTextArea",
  props: {
    label      : {
      type   : String,
      default: null
    },
    placeholder: {
      type   : String,
      default: null
    },
    row        : {
      type   : Number,
      default: 5
    },
    cols       : {
      type   : Number,
      default: 33
    },
    required   : {
      type   : Boolean,
      default: false
    },
    value      : {
      type   : String,
      default: null
    }
  },
  data : () => ({
    localValue: null
  }),
  watch: {
    value(val) {
      this.localValue = val
    },
    localValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="scss">
.bp-textarea-wrapper::v-deep {
  padding-top: 40px;

  textarea::placeholder {
    font-family: 'suit', sans-serif;
    font-weight: 600;
    font-size: 14px;
  }

  @media screen and (max-width: 1024px) {
    padding-top: 30px;
    textarea::placeholder {
      font-size: 14px;
    }
  }

  .bp-textarea {
    width: 100%;
    font-weight: 500;
    background: #000;
    border: 1px solid #474747;
    color: #fff;
    padding: 12px 20px;
    transition: all .2s;

    &:hover {
      transition: all .2s;
      border-color: #b20000;
    }

    &:focus {
      border-color: #b20000;
    }
  }

  .required {
    color: #fff;
    padding-left: 6px;
  }

  .bp-textarea-label {
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
    color: #EFEFEF;
    padding-bottom: 20px;

    @media screen and (max-width: 1024px) {
      font-size: 14px;
      line-height: 17px;
      padding-bottom: 10px;
    }

  }
}

</style>
