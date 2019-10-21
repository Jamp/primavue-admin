<template>
  <div class="layout-wrapper" :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />

    <div class="layout-sidebar layout-sidebar-dark" @click="onSidebarClick">
      <div class="layout-logo">
        <router-link to="/">
          <img alt="Logo" src="../assets/logo.png" />
        </router-link>
      </div>

      <AppProfile />
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main">
      <router-view />
    </div>

    <AppFooter />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import AppTopBar from './partials/top-bar'
import AppProfile from './partials/profile'
import AppMenu from './partials/menu'
import AppFooter from './partials/footer'

export default {
  data () {
    return {
      layoutMode: 'static',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false
    }
  },
  methods: {
    onWrapperClick () {
      if (!this.menuClick) {
        this.overlayMenuActive = false
        this.mobileMenuActive = false
      }
      this.menuClick = false
    },
    onMenuToggle () {
      this.menuClick = true
      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          this.overlayMenuActive = !this.overlayMenuActive
        } else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive
      }
      event.preventDefault()
    },
    onSidebarClick () {
      this.menuClick = true
    },
    onMenuItemClick (event) {
      if (event.item && !event.item.children) {
        this.overlayMenuActive = false
        this.mobileMenuActive = false
      }
    },
    addClass (element, className) {
      if (element.classList) element.classList.add(className)
      else element.className += ' ' + className
    },
    removeClass (element, className) {
      if (element.classList) element.classList.remove(className)
      else {
        element.className = element.className.replace(
          new RegExp(
            '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
            'gi'
          ),
          ' '
        )
      }
    },
    isDesktop () {
      return window.innerWidth > 1024
    }
  },
  computed: {
    ...mapGetters({
      menu: 'getItems'
    }),
    containerClass () {
      return [
        'layout-wrapper',
        {
          'layout-overlay': this.layoutMode === 'overlay',
          'layout-static': this.layoutMode === 'static',
          'layout-static-sidebar-inactive':
            this.staticMenuInactive && this.layoutMode === 'static',
          'layout-overlay-sidebar-active':
            this.overlayMenuActive && this.layoutMode === 'overlay',
          'layout-mobile-sidebar-active': this.mobileMenuActive
        }
      ]
    }
  },
  beforeUpdate () {
    if (this.mobileMenuActive) this.addClass(document.body, 'body-overflow-hidden')
    else this.removeClass(document.body, 'body-overflow-hidden')
  },
  components: {
    AppTopBar,
    AppProfile,
    AppMenu,
    AppFooter
  }
}
</script>
<style lang="sass">
.layout-logo
  a
    img
      max-height: 5rem
</style>
