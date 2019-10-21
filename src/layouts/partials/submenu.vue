<template>
  <ul v-if="items">
    <template v-for="(item, i) of items">
      <li :key="i" :class="[{'active-menuitem': activeIndex === i && !item.path}]" v-if="!item.meta.notMenu">
        <div v-if="item.items && root===true" class="arrow"></div>
        <router-link
          v-if="item.path"
          :to="item.path"
          :class="[{'active-route': activeIndex === i}]"
          @click.native="onMenuItemClick($event,item,i)"
          :target="item.target"
          exact>
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title | translate }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
            <span v-if="item.badge" class="menuitem-badge">{{item.badge}}</span>
        </router-link>
        <a
          v-if="!item.path"
          :href="item.meta.url"
          @click="onMenuItemClick($event,item,i)"
          target="item.target">
            <i :class="item.meta.icon"></i>
            <span> {{ item.meta.title | translate }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
            <span v-if="item.badge" class="menuitem-badge">{{item.badge}}</span>
        </a>
        <transition name="layout-submenu-wrapper">
          <AppSubmenu
            v-show="activeIndex === i"
            :items="item.children"
            @menuitem-click="$emit('menuitem-click', {originalEvent: $event, item: item})" />
        </transition>
      </li>
    </template>
  </ul>
</template>
<script>
export default {
  name: 'AppSubmenu',
  props: {
    items: Array,
    root: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeIndex: null
    }
  },
  methods: {
    onMenuItemClick (event, item, index) {
      if (item.disabled) {
        event.preventDefault()
        return
      }

      // execute command
      if (item.command) {
        item.command({ originalEvent: event, item: item })
        event.preventDefault()
      }

      this.activeIndex = index === this.activeIndex ? null : index

      this.$emit('menuitem-click', {
        originalEvent: event,
        item: item
      })
    }
  },
  components: {
    AppSubmenu: this
  }
}
</script>
