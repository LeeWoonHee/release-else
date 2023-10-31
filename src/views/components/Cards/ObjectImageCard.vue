<template>
  <div
      class="oic-wrapper"
      :class="{hoverable: hoverable}"
      :style="{'--text': `${backgroundTitle}`}"
  >
    <div class="oic-img">
      <img src="~@/assets/images/thumbnail.png">
    </div>
    <div class="oic-card">
      <div class="oic-content">
        <h2>Nike Shoes</h2>
        <div class="size">
          <h3>Size :</h3>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <div class="color">
          <h3>Color :</h3>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a href="#">Buy Now</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    backgroundTitle: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  name: 'ObjectImageCard'
}
</script>

<style scoped lang="scss">
div.oic-wrapper::v-deep {
  position: relative;

  .oic-img {
    position: absolute;
    z-index: 10000;
    width: 100%;
    overflow: visible;

    img {
      transition: 0.5s;
      border-radius: 20px;
      overflow: hidden;
      position: absolute;
      top: 220px;
      left: 50%;
      //transform: translate(-50%, -50%) rotate(-25deg);
      transform: translate(-50%, -50%);
      width: 270px;
    }
  }

  .oic-card {
    position: relative;
    width: 320px;
    height: 450px;
    background: #232323;
    border-radius: 20px;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #00a0e7;
      background: radial-gradient(129.1% 117.53% at 49.47% 49.26%, #00a0e7 0%, #006a92 100%);
      clip-path: circle(150px at 80% 20%);
      transition: 0.5s ease-in-out;
    }

    &:after {
      content: var(--text);
      position: absolute;
      top: 80%;
      left: 0;
      font-size: 3em;
      font-weight: 800;
      font-style: normal;
      color: #006a92;
    }


    .oic-content {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100px;
      text-align: center;
      transition: 1s;
      z-index: 10;

      h2 {
        position: relative;
        font-weight: 600;
        letter-spacing: 1px;
        color: #fff;
        margin: 0;
      }

      .size, .color {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 20px;
        transition: 0.5s;
        opacity: 0;
        visibility: hidden;
        padding-top: 0;
        padding-bottom: 0;

        h3 {
          color: #fff;
          font-weight: 300;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-right: 10px;
        }
      }

      .size {
        span {
          width: 26px;
          height: 26px;
          text-align: center;
          line-height: 26px;
          font-size: 14px;
          display: inline-block;
          color: #111;
          background: #fff;
          margin: 0 5px;
          transition: 0.5s;
          color: #111;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background: radial-gradient(129.1% 117.53% at 49.47% 49.26%, #DE0101 0%, #580000 100%);
          }
        }
      }

      .color {
        span {
          width: 20px;
          height: 20px;
          background: #ff0;
          border-radius: 50%;
          margin: 0 5px;
          cursor: pointer;
        }

        span:nth-child(2) {
          background: #9bdc28;
        }

        span:nth-child(3) {
          background: #03a9f4;
        }

        span:nth-child(4) {
          background: #e91e63;
        }
      }

      a {
        display: inline-block;
        padding: 10px 20px;
        background: #fff;
        border-radius: 4px;
        margin-top: 10px;
        text-decoration: none;
        font-weight: 600;
        color: #111;
        opacity: 0;
        transform: translateY(50px);
        transition: 0.5s;
        margin-top: 0;
      }
    }
  }

  &.hoverable:hover, &.active {
    .oic-img {
      position: absolute;

      img {
        top: 50px;
      }
    }

    .oic-card {
      &:before {
        clip-path: circle(300px at 80% -20%);
      }


      .oic-content {
        height: 210px;

        .size {
          opacity: 1;
          visibility: visible;
          transition-delay: 0.5s;
        }

        .color {
          opacity: 1;
          visibility: visible;
          transition-delay: 0.6s;
        }

        a {
          opacity: 1;
          transform: translateY(0px);
          transition-delay: 0.75s;

        }
      }
    }
  }
}
</style>
