<template>
  <NavbarVue class="mb-12" />
  <div class="container mx-auto">
    <div class="flex gap-6">
      <div class="basis-2/3">
        <div class="flex gap-3">
          <div class="basis-1/3">
            <select
              class="w-full h-11 border-2 border-black"
              name="category"
              id="categorySelect"
            >
              <option value="newest" selected>最新貼文</option>
              <option value="popular">熱門貼文</option>
            </select>
          </div>
          <div class="basis-2/3">
            <div class="flex h-11 border-2 border-black">
              <input class="w-full" type="text" placeholder="搜尋貼文" />
              <button
                type="button"
                class="bg-primary w-11 flex justify-center items-center border-l-2 border-black"
              >
                <IconSearchVue class="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="basis-1/3">
        <UserInfoVue
          imgUrl="avatars/user3.png"
          name="DEMO"
          userPageUrl="#"
          :subTitle="num"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import UserInfoVue from "../components/UserInfo.vue";
import IconSearchVue from "../components/icons/IconSearch.vue";
import AvatarVue from "../components/Avatar.vue";
import NavbarVue from "../components/Navbar.vue";

export default {
  components: {
    UserInfoVue,
    IconSearchVue,
    AvatarVue,
    NavbarVue,
  },
  setup() {
    const num = ref(12313131);

    return {
      num,
    };
  },
};
</script>
