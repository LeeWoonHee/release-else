<template>
  <div class="flip">
    <div class="flip-wrapper">
      <div class="flip-front">
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.3977 27.0797L11.0001 19.5882L0.602674 27.0798L0.602539 6.28468L21.3976 6.28461L21.3977 27.0797Z"
                fill="#182354"/>
          <path d="M13.8265 -0.000663757H8.17334V3.72972H13.8265V-0.000663757Z" fill="#182354"/>
        </svg>
      </div>
      <div class="flip-back blex-bottom">
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.3977 27.0797L11.0001 19.5882L0.602674 27.0798L0.602539 6.28468L21.3976 6.28461L21.3977 27.0797Z"
                fill="#182354"/>
          <path d="M13.8265 -0.000663757H8.17334V3.72972H13.8265V-0.000663757Z" fill="#182354"/>
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
  width: 22px;
  height: 28px;
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
          fill: #44C19A;
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
            fill: #44C19A;
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
        fill: #44C19A;
      }
    }
  }
}
</style>
