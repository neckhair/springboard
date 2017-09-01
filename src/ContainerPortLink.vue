<template>
  <a :href="url">{{ url }}</a>
</template>

<script>
export default {
  props: ['port'],
  computed: {
    url: (component) => `http://localhost:${component.port.HostPort}`,
  }
}
</script>
