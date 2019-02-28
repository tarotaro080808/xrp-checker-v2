<template>
  <top-page />
</template>

<script>
const TopPage = () => import(/* webpackChunkName: "toppage" */"@/components/pages/TopPage.vue");

export default {
  head() {
    return {
      title: 'XRP Checker',
      titleTemplate: ''
    }
  },
  components: {
    TopPage
  }
}
</script>

<style lang="scss" scoped>
</style>
