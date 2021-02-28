<template>
  <div>
    <textarea
      :disabled="$parent.isTextareaDisabled"
      placeholder="Type here..."
      :id="CHANNEL_TEXTAREA_ID"
      @input="changeTextarea($parent.channel.content, $event)"
      :value="$parent.channel.content"
      @select="setSelectRange"
      @click="clearSelectRange"
    ></textarea>

    <div v-if="typingUsername">{{ typingUsername }} is typing...</div>
  </div>
</template>

<script>
import { TOKEN_METHODS, CHANNEL_TEXTAREA_ID, SOCKET_METHODS } from '@/common/constants';

export default {
  name: 'ChannelTextarea',
  data: function () {
    return {
      selectionStart: null,
      selectionEnd: null,
      CHANNEL_TEXTAREA_ID,
    };
  },
  computed: {
    typingUsername: function () {
      if (!this.$parent.userTyping || this.$parent.userTyping === this.$parent.userId) return null;
      return this.$parent.channel.whoJoined.find((user) => user[0] === this.$parent.userTyping)[2];
    },
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
    changeTextarea: _.debounce(function (prevValue = '', e) {
      const currentValue = e.target.value || '';
      const currentCursorIndex = e.target.selectionStart || currentValue.length;
      const changedCharsNumber = Math.abs(prevValue.length - currentValue.length);

      let message;

      if (this.selectionEnd && e.inputType === 'insertFromPaste') {
        message = [
          [
            this.selectionStart || 0,
            currentCursorIndex,
            TOKEN_METHODS.DELETE,
            Date.now(),
            prevValue.slice(this.selectionStart || 0, this.selectionEnd),
            this.$parent.userId,
          ],
          [
            this.selectionStart || 0,
            currentCursorIndex,
            TOKEN_METHODS.ADD,
            Date.now(),
            currentValue.slice(this.selectionStart || 0, currentCursorIndex),
            this.$parent.userId,
          ],
        ];

        this.clearSelectRange();
      } else {
        message = [
          currentValue.length > prevValue.length
            ? [
                currentCursorIndex - changedCharsNumber,
                currentCursorIndex,
                TOKEN_METHODS.ADD,
                Date.now(),
                currentValue.slice(currentCursorIndex - changedCharsNumber, currentCursorIndex),
                this.$parent.userId,
              ]
            : [
                currentCursorIndex,
                currentCursorIndex,
                TOKEN_METHODS.DELETE,
                Date.now(),
                prevValue.slice(currentCursorIndex, currentCursorIndex + changedCharsNumber),
                this.$parent.userId,
              ],
        ];
      }

      this.$socket.emit(SOCKET_METHODS.SEND_MESSAGE, {
        channelId: this.$parent.channelId,
        userId: this.$parent.userId,
        message,
      });
    }, 300),
  },
};
</script>

<style scoped lang="scss">
textarea {
  font-family: monospace;
  border: 1px solid #000;
  background: transparent;
  border-radius: 0;
  padding: 20px;
  outline: none;
  font-size: 18px;
  min-height: 240px;
  width: 100%;

  &::placeholder {
    color: #000;
  }
}
</style>
