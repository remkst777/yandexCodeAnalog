<template>
  <div class="home">
    <HelloWorld msg="Homepage" />

    <div>
      <button @click="createChannel">Create channel</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
  },
  methods: {
    createChannel: async function () {
      await fetch("/channel", {
        method: "post",
        body: JSON.stringify({ whoCreatedChannel: "user1" }),
        headers: { "content-type": "application/json" },
      })
        .then((x) => x.json())
        .then(({ channelId }) => this.$router.push(`/channel/${channelId}`));
    },
  },
};
</script>
