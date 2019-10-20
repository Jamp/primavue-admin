<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>

export default {
  computed: {
    layout () {
      return (
        (this.$route.meta.hasOwnProperty('layout')) ? this.$route.meta.layout : 'default'
      ) + '-layout'
    }
  }
}
</script>
<style lang="sass">
#app
  min-height: 100vh
  min-width: 100vw
</style>
