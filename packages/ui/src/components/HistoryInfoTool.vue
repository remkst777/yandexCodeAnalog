<template>
  <div class="history-info-tool">
    <div>
      <div v-if="$parent.stepHistory[0]" @click="goToStep($parent.stepHistory[0][3])">
        <div>←</div>
        <div>
          {{ this.getUserName($parent.stepHistory[0][5]) }}
        </div>
        <div>
          {{ this.getFormattedDate($parent.stepHistory[0][3]) }}
        </div>
      </div>
    </div>

    <div>
      <div v-if="$parent.stepHistory[2]" @click="goToStep($parent.stepHistory[2][3])">
        <div>→</div>
        <div>
          {{ this.getUserName($parent.stepHistory[2][5]) }}
        </div>
        <div>
          {{ this.getFormattedDate($parent.stepHistory[2][3]) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { buildTree } from '@/utils/common';

export default {
  name: 'history-info-tool',
  methods: {
    getFormattedDate: function (dateMs) {
      return new Date(dateMs).toISOString().split('.')[0];
    },
    getUserName: function (userId) {
      return this.$parent.channel.whoJoined.find((user) => user[0] === userId)[2];
    },
    goToStep: function (divider) {
      const startDate = this.$parent.prebuiltContent[0][3];
      const endDate = this.$parent.prebuiltContent[this.$parent.prebuiltContent.length - 1][3];

      const slicedTree = this.$parent.prebuiltContent.filter(
        ([_, _1, _2, date]) => date <= divider,
      );

      const nextI = this.$parent.prebuiltContent[slicedTree.length];
      const currI = this.$parent.prebuiltContent[slicedTree.length - 1];
      const prevI = this.$parent.prebuiltContent[slicedTree.length - 2];

      this.$parent.historyRanger = ((divider - startDate) / (endDate - startDate)) * 100;
      this.$parent.stepHistory = [prevI, currI, nextI];
      this.$parent.channel.content = buildTree('', slicedTree);
    },
  },
};
</script>

<style scoped lang="scss">
.history-info-tool {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  opacity: 0.75;

  > div > div > div:first-child {
    font-size: 20px;
  }

  > div > div > div:not(:first-child) {
    font-size: 12px;
    margin-bottom: 2px;
  }

  > div:nth-child(1) {
    text-align: left;
    cursor: pointer;
  }

  > div:nth-child(2) {
    text-align: right;
    cursor: pointer;
  }
}
</style>
