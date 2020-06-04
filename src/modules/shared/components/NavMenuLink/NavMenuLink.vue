<template>
  <md-list-item>
    <router-link
      :to="path"
      class="md-list-item-text nav-link">
      <md-icon  :class="[icon, { icon }]" />
      <span class="nav-text">{{ $t(linkText) }}</span>
    </router-link>
  </md-list-item>
</template>

<script>
export default {
  name: 'NavMenuLink',
  props: {
    path: String,
    linkText: String,
    icon: String
  }
};
</script>

<style lang="scss">
  .nav-link {
    color: #fff;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .md-icon {
      display: inline-block;
      line-height: 1;
      width: inherit;
    }

    .nav-text {
      width: inherit;
      display: inline-block;
      margin-left: 10px;
    }
  }
</style>
