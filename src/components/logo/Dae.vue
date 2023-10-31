<template>
  <div class="flip">
    <div class="flip-wrapper">
      <div class="flip-front">
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10.3976 0.284691C7.63999 0.284691 4.99531 1.38015 3.04539 3.33008C1.09546 5.28 0 7.92468 0 10.6823C0 13.4399 1.09546 16.0846 3.04539 18.0345C4.99531 19.9844 7.63999 21.0799 10.3976 21.0799H20.7952V0.284691H10.3976Z"/>
        </svg>
      </div>
      <div class="flip-back blex-bottom">
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10.3976 0.284691C7.63999 0.284691 4.99531 1.38015 3.04539 3.33008C1.09546 5.28 0 7.92468 0 10.6823C0 13.4399 1.09546 16.0846 3.04539 18.0345C4.99531 19.9844 7.63999 21.0799 10.3976 21.0799H20.7952V0.284691H10.3976Z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dae'
}
</script>

<style scoped lang="scss">
.flip::v-deep {
  width: 21px;
  height: 22px;
  perspective: 1000px;
  text-align: center;

  .flip-wrapper {
    position: relative;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;

    .flip-front, .flip-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
    }

    .flip-back {
      transform: rotateY(180deg);

      svg {
        path {
          fill: #2C66DB;
        }
      }
    }

    .flip-front {
      svg {
        path {
          fill: #182354;
          transition: all .1s linear;
        }

        &.on {
          path {
            fill: #2C66DB;
          }
        }
      }
    }
  }

  &:hover {
    .flip-wrapper {
      transform: rotateY(180deg);
    }
  }

  &.on {
    svg {
      path {
        fill: #2C66DB;
      }
    }
  }
}
</style>
