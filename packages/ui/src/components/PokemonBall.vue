<template>
  <div class="box"></div>
</template>

<script>
export default {
  name: 'PokemonBall',
};
</script>

<style scoped lang="scss">
.box {
  width: 200px;
  height: 200px;
  display: inline-block;
  position: relative;
  border: 6px solid #ccc;
  border-radius: 50%;
  background-image: -moz-radial-gradient(
      40% 40%,
      circle,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 1) 100%
    ),
    -moz-linear-gradient(-90deg, #f33 45%, #333 45%, #3f3f3f 50%, #333 55%, #fff 55%);
  background-image: -webkit-radial-gradient(
      40% 40%,
      circle,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 1) 100%
    ),
    -webkit-linear-gradient(-90deg, #f33 45%, #333 45%, #3f3f3f 50%, #333 55%, #fff 55%);
}
.box:before {
  content: '';
  display: block;
  position: absolute;
  z-index: 6;
  width: 20%;
  height: 20%;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #aaa, 0 0 0 10px #fff, 0 0 0 16px #3f3f3f;
  margin: 40%;
}
.box:after {
  content: '';
  display: block;
  position: absolute;
  z-index: 1;
  width: 94%;
  height: 10%;
  background-color: rgba(0, 0, 0, 0);
  margin: 45% 3%;
}
.box:hover {
  -webkit-animation: shak 0.3s infinite;
  -moz-animation: shak 0.3s infinite;
}
@-webkit-keyframes shak {
  0%,
  100% {
    -webkit-transform: rotate(-10deg);
  }
  50% {
    -webkit-transform: rotate(10deg);
  }
}
@-moz-keyframes shak {
  0%,
  100% {
    -moz-transform: rotate(-10deg);
  }
  50% {
    -moz-transform: rotate(10deg);
  }
}
</style>
