<template>
  <div class="flip">
    <div class="flip-wrapper">
      <div class="flip-front">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5965 21.0798L11.1989 13.5884L0.801409 21.08L0.80127 0.284844L21.5963 0.284775L21.5965 21.0798Z"/>
        </svg>
      </div>
      <div class="flip-back blex-bottom">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5965 21.0798L11.1989 13.5884L0.801409 21.08L0.80127 0.284844L21.5963 0.284775L21.5965 21.0798Z"/>
        </svg>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Jun'
}
</script>

<style scoped lang="scss">
.flip::v-deep {
  width: 22px;
  height: 22px;
  perspective: 1000px;
  text-align: center;

  .flip-wrapper {
    position: relative;
    transition: transform 0.8s;
    transition-delay: 0.1s;
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
          fill: #00A0E9;
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
            fill: #00A0E9;
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
        fill: #00A0E9;
      }
    }
  }
}
</style>
