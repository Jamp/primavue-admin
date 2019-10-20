<template>
  <div class="layout-profile">
    <div>
      <img :src="profile.photoURL" alt />
    </div>
    <button class="p-link layout-profile-link" @click="onClick">
      <span class="username">
        {{ profile.displayName }}
      </span>
      <i class="pi pi-fw pi-cog"></i>
    </button>
    <transition name="layout-submenu-wrapper">
      <ul v-show="expanded">
        <li>
          <button class="p-link">
            <i class="pi pi-fw pi-user"></i>
            <span>
              {{ 'routes.profile.name' | translate }}
            </span>
          </button>
        </li>
        <!-- <li>
          <button class="p-link">
            <i class="pi pi-fw pi-inbox"></i>
            <span>Notifications</span>
            <span class="menuitem-badge">2</span>
          </button>
        </li> -->
        <li>
          <button class="p-link" @click="logout()">
            <i class="pi pi-fw pi-power-off"></i>
            <span>
              {{ 'routes.logout' | translate }}
            </span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import { LOGIN_ROUTE } from '@/router/constants'

export default {
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    profile () {
      return this.$auth.getProfile()
    }
  },
  methods: {
    onClick(event) {
      this.expanded = !this.expanded;
      event.preventDefault();
    },
    logout () {
      this.$auth.logout()
      this.$router.replace(LOGIN_ROUTE)
    }
  }
};
</script>

<style scoped>
</style>
