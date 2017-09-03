<template>
  <div>
    <a :href="url">{{ url }}</a>
  </div>
</template>

<script>
export default {
  props: ['port'],
  computed: {
    url: (component) => `http://localhost:${component.port.HostPort}`,
  }
}
</script>
