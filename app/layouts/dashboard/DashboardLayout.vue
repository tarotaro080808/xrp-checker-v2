<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="ダッシュボード" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/icons" name="ダッシュボード" icon="tim-icons icon-atom"/>
        <sidebar-link to="/maps" name="ダッシュボード" icon="tim-icons icon-pin"/>
        <sidebar-link to="/notifications" name="ダッシュボード" icon="tim-icons icon-bell-55"/>
        <sidebar-link to="/profile" name="ダッシュボード" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/table-list" name="ダッシュボード" icon="tim-icons icon-puzzle-10"/>
        <sidebar-link to="/typography" name="ダッシュボード" icon="tim-icons icon-align-center"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
