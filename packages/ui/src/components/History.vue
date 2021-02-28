<template>
  <div class="history">
    <input type="range" :value="$parent.historyRanger" min="0" max="100" v-on:input="onChange" />
  </div>
</template>

<script>
import { buildTree } from '@/utils/common';

export default {
  name: 'history',
  methods: {
    onChange: function (e) {
      const value = e ? e.target.value : 100;

      const startDate = this.$parent.prebuiltContent[0][3];
      const endDate = this.$parent.prebuiltContent[this.$parent.prebuiltContent.length - 1][3];

      const divider = startDate + ((endDate - startDate) * value) / 100;

      const slicedTree = this.$parent.prebuiltContent.filter(
        ([_, _1, _2, date]) => date <= divider,
      );

      const nextI = this.$parent.prebuiltContent[slicedTree.length];
      const currI = this.$parent.prebuiltContent[slicedTree.length - 1];
      const prevI = this.$parent.prebuiltContent[slicedTree.length - 2];

      this.$parent.historyRanger = value;
      this.$parent.stepHistory = [prevI, currI, nextI];
      this.$parent.channel.content = buildTree('', slicedTree);
    },
  },
  mounted: function () {
    this.onChange();
  },
};
</script>

<style scoped lang="scss">
.history {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  padding: 30px 40px;
  input[type='range'] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0);
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type='range']::-webkit-slider-thumb {
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffbd54;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: rgba(0, 0, 0, 0);
  }
  input[type='range']::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0);
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type='range']::-moz-range-thumb {
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffbd54;
    cursor: pointer;
  }
  input[type='range']::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type='range']::-ms-fill-lower {
    background: rgba(0, 0, 0, 0);
    border: 0.2px solid #010101;
    border-radius: 2.6px;
  }
  input[type='range']::-ms-fill-upper {
    background: rgba(0, 0, 0, 0);
    border: 0.2px solid #010101;
    border-radius: 2.6px;
  }
  input[type='range']::-ms-thumb {
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffbd54;
    cursor: pointer;
  }
  input[type='range']:focus::-ms-fill-lower {
    background: rgba(0, 0, 0, 0);
  }
  input[type='range']:focus::-ms-fill-upper {
    background: rgba(0, 0, 0, 0);
  }
}
</style>
