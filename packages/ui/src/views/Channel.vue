<template>
  <div class="about">
    <h1>This is channel ({{ channelId }}) page</h1>

    <textarea
      @input="changeTextarea(channel.content, $event)"
      :value="channel.content"
      @select="setSelectRange"
      @click="clearSelectRange"
    ></textarea>

    <div>{{ !!selectionStart }}</div>
    <div>{{ !!selectionEnd }}</div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'channel',
  data: function () {
    return {
      channel: {},
      channelId: this.$router.history.current.params.id,
      selectionStart: null,
      selectionEnd: null,
    };
  },
  methods: {
    clearSelectRange: function (e) {
      this.selectionStart = null;
      this.selectionEnd = null;
    },
    setSelectRange: function (e) {
      this.selectionStart = e.target.selectionStart;
      this.selectionEnd = e.target.selectionEnd;
    },
    changeTextarea: _.debounce(function (prevValue, e) {
      const currentValue = e.target.value;
      const currentCursorIndex = e.target.selectionStart || currentValue.length;
      const type = currentValue.length > prevValue.length ? 'ADD' : 'DELETE';

      const changedCharsNumber = Math.abs(prevValue.length - currentValue.length);

      let message;

      if (this.selectionEnd && e.inputType === 'insertFromPaste') {
        message = [
          {
            currentCursorIndex: this.selectionStart || 0,
            type: 'DELETE',
            date: Date.now(),
            difference: prevValue.slice(this.selectionStart || 0, this.selectionEnd),
            initiator: 'admin',
          },
          {
            currentCursorIndex: this.selectionStart || 0,
            type: 'ADD',
            date: Date.now(),
            difference: currentValue.slice(this.selectionStart || 0, currentCursorIndex),
            initiator: 'admin',
          },
        ];

        this.clearSelectRange();
      } else {
        let difference = '';

        if (type === 'ADD') {
          difference = currentValue.slice(
            currentCursorIndex - changedCharsNumber,
            currentCursorIndex,
          );

          message = [
            {
              currentCursorIndex: currentCursorIndex - changedCharsNumber,
              type,
              date: Date.now(),
              difference,
              initiator: 'admin',
            },
          ];
        } else {
          difference = prevValue.slice(currentCursorIndex, currentCursorIndex + changedCharsNumber);

          message = [
            {
              currentCursorIndex,
              type,
              date: Date.now(),
              difference,
              initiator: 'admin',
            },
          ];
        }
      }

      this.$socket.emit('sendMessage', {
        channelId: this.channelId,
        message,
      });
    }, 300),
  },
  mounted: function () {
    fetch(`/channel/${this.channelId}`)
      .then(x => x.json())
      .then(channel => (this.channel = channel));

    this.$socket.emit('joinRoom', this.channelId);
    this.sockets.subscribe('sentMessage', channel => (this.channel = channel));
  },
  destroyed: function () {
    this.$socket.emit('leaveRoom', this.channelId);
  },
};
</script>

<style scoped lang="scss">
textarea {
  width: 100%;
  height: 240px;
}
</style>
