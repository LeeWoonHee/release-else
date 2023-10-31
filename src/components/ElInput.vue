<template>
  <div class="bp-input-wrapper"
       :class="disabled ? 'disabled' : ''">
    <div class="flex flex-no-wrap items-center">
      <div v-if="label" class="bp-input-label">{{ label }}</div>
      <div v-if="required" class="required">*</div>
    </div>
    <input class="bp-input"
           v-model="localValue"
           :type="type" :required="required" :disabled="disabled" :placeholder="placeholder"/>
  </div>

</template>

<script>
export default {
  name : "ElInput",
  props: {
    label      : {
      type   : String,
      default: null
    },
    type       : {
      type   : String,
      default: null
    },
    required   : {
      type   : Boolean,
      default: false
    },
    disabled   : {
      type   : Boolean,
      default: false
    },
    placeholder: {
      type   : String,
      default: null
    },
    value      : {
      type   : [ String, Number ],
      default: null
    },
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
  },
}
</script>

<style scoped lang="scss">
.bp-input-wrapper::v-deep {
  width: 50%;
  margin-top: 40px;

  @media screen and (max-width: 1024px) {
    margin-top: 30px;
    width: 100%;
  }


  &.disabled {
    opacity: .5;
    pointer-events: none;
  }


  .bp-input-label {
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
    color: #EFEFEF;

    @media screen and (max-width: 1024px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  input::placeholder {
    font-weight: 600;
    font-family: 'suit', sans-serif;
  }

  @media screen and (max-width: 1024px) {
    input::placeholder {
      font-size: 14px;
    }
  }

  .required {
    color: #fff;
    padding-left: 6px;
  }


  .bp-input {
    width: 100%;
    font-weight: 500;
    height: 40px;
    background: #000;
    border: 1px solid #474747;
    color: #fff;
    padding: 12px 20px;
    transition: all .2s;
    margin-top: 20px;

    @media screen and (max-width: 1024px) {
      margin-top: 10px;
      padding: 10px 16px;
    }

    &:hover {
      border-color: #b20000;
      transition: all .2s;
    }

    &:focus {
      border-color: #b20000;
    }
  }

}

</style>
