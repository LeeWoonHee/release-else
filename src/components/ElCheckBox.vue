<template>
  <div class="bp-checkbox-wrapper"
       :class="disabled ? 'disabled' : ''">
    <div class="flex flex-no-wrap items-center">
      <div v-if="label" class="bp-checkbox-label">{{ label }}</div>
      <div v-if="required" class="required">*</div>
    </div>
    <input class="bp-checkbox"
           :style="{'--content' : `'${vsOption}'`}"
           @input="changeValue"
           :value="localValue"
           :type="type" :required="required" :disabled="disabled"/>
  </div>

</template>

<script>
export default {
  name   : "ElCheckbox",
  props  : {
    label   : {
      type   : String,
      default: null
    },
    type    : {
      type   : String,
      default: 'checkbox'
    },
    required: {
      type   : Boolean,
      default: false
    },
    disabled: {
      type   : Boolean,
      default: false
    },
    value   : {
      type   : [ String, Boolean, Array ],
      default: null
    },
    vsOption: {
      type   : String,
      default: null
    }
  },
  data   : () => ({
    localValue: null
  }),
  watch  : {
    value     : {
      deep     : true,
      immediate: true,
      handler(val) {
        this.localValue = val
      },
    },
    localValue: {
      deep: true,
      handler(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    changeValue(val) {
      if (Array.isArray(this.value)) {
        const valueIndex = this.value.findIndex(x => x === this.vsOption)
        if (valueIndex > -1) {
          this.localValue = this.localValue.splice(valueIndex, 1)
        }
        else {
          this.localValue.unshift(this.vsOption)
        }
      }
      else {
        this.localValue = val
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bp-checkbox-wrapper::v-deep {


  &.disabled {
    opacity: .5;
  }


  .bp-checkbox-label {
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
    color: #EFEFEF;
    padding-bottom: 8px;
    padding-top: 16px;

    @media screen and (max-width: 1024px) {
      font-size: 14px;
      line-height: 17px;
    }
  }


  .bp-checkbox {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    appearance: none;
    width: 180px;
    height: 48px;
    background: #000;
    border: 1px solid #474747;
    transition: all .2s;
    margin-right: 20px;
    margin-top: 12px;

    &:disabled {
      opacity: .5;
    }

    @media screen and (max-width: 1024px) {
      width: 158px;
      height: 40px;
      margin-right: 0;
      margin: 4px;
    }

    &::after {
      content: var(--content);
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-family: 'suit', sans-serif;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      color: #9FA0A0;
    }

    &:hover {
      cursor: pointer;
      color: #000;
      transition: all .2s;
    }

    &:checked {
      background: #000;
      border-color: #b20000;

      &::after {
        color: #b20000;
      }
    }
  }
}

</style>
