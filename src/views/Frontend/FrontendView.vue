<script setup>
import { RouterView } from "vue-router";
import NavbarVue from "../../components/Navbar.vue";
import SideMenuVue from "../../components/SideMenu.vue";
import PostOptionVue from "../../components/PostOption.vue";
</script>

<template>
  <NavbarVue class="mb-12" />
  <div class="container mx-auto px-3 sm:px-0">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <RouterView />
      </div>
      <div class="hidden md:block">
        <SideMenuVue
          name="邊緣小杰"
          imgUrl="avatars/user.png"
          userPageUrl="/user"
        />
      </div>
    </div>
  </div>
  <PostOptionVue class="fixed left-1/2 -translate-x-1/2 bottom-12 md:hidden" />
</template>
