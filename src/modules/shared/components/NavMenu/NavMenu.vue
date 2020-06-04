<template>
  <div class="nav">
    <md-app class="nav-md-app">
      <md-app-drawer class="nav-menu" :md-active.sync="menuVisible" md-persistent="mini">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon class="icon icon-logo" />
        </md-button>
        <md-toolbar class="md-transparent" md-elevation="0">
          <md-icon class="icon icon-logo" />

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon class="nav-icon">menu</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <nav-menu-link
            path="/"
            linkText="home"
            icon="icon-structure"
          />

          <nav-menu-link
            path="/about"
            linkText="about"
            icon="icon-profile"
          />
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import NavMenuLink from '../NavMenuLink/NavMenuLink';

export default {
  name: 'NavMenu',
  components: {
    NavMenuLink,
  },

  data: () => ({
    menuVisible: false
  }),

  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }
};
</script>

<style lang="scss">
  .nav-icon {
    color: #fff;
  }

  .md-icon-button {
   margin: 15px 6px 15px;
  }
  .md-drawer.md-persistent-mini:not(.md-active) {
    transform: translate3D(0,0,0);
  }
  .nav, .nav-md-app {
    min-height: 100vh;
  }

  .nav-menu {
    background: linear-gradient(57.14deg, #5ECDF8 -1.13%, #5667DE 45.91%);
    box-shadow: 0 1px 4px rgba(168, 195, 234, 0.8);
    width: 190px;
    border: none;
  }

  .md-list-item-container:hover {
    background: #4B5EDA;
  }

  .md-drawer.md-persistent-mini.md-left {
    border-right: none;
  }

  .md-drawer.md-persistent-mini:not(.md-active) {
    width: 55px !important;

    .md-list-item-content {
      padding: 0 15px;
    }
  }
</style>
