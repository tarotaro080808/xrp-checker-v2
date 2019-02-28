<template>
  <div class="parentx-static">
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss">
.parentx-static {
  overflow: hidden;
  height: 100vh;
  position: relative;
}
.vs-sidebar {
  &.vs-sidebar-parent {
    height: 100vh !important;
  }
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
      margin-left: 10px;
    }
  }
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0,0,0,0) !important;
    border-left: 1px solid rgba(0,0,0,.07) !important;
    border-radius: 0px !important;
  }
}
</style>
