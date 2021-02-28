<template>
  <div class="channel-info">
    <h3>{{ $parent.channel.channelName }}</h3>

    <ul>
      <li
        v-for="[userId, role, name] in ($parent.channel.whoJoined || []).filter((user) => user[2])"
        :key="userId"
      >
        <span :class="{ online: $parent.usersOnline[userId] }">{{ role }} - {{ name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'channel-info',
};
</script>

<style scoped lang="scss">
.channel-info {
  position: absolute;
  height: 100vh;
  width: 400px;
  top: 0;
  right: -375px;
  background: rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  padding: 25px;

  &:hover {
    right: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  h3 {
    font-weight: 700;
    font-size: 35px;
    line-height: 40px;
    text-transform: uppercase;
    margin-bottom: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ffbd54;
  }

  ul li {
    color: #ff4500;
    font-size: 16px;
    line-height: 20px;
    text-transform: lowercase;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .online {
      color: #7cfc00;
    }
  }
}
</style>
