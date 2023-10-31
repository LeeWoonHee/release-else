<template>
  <div class="flip">
    <div class="flip-wrapper">
      <div class="flip-front">
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.6022 0.284653L0.20459 21.0799H20.9998L10.6022 0.284653Z" fill="#182354"/>
        </svg>
      </div>
      <div class="flip-back blex-bottom">
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.6022 0.284653L0.20459 21.0799H20.9998L10.6022 0.284653Z" fill="#182354"/>
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
          fill: #784FEA;
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
            fill: #784FEA;
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
        fill: #784FEA;
      }
    }
  }
}
</style>
