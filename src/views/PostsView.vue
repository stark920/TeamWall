<template>
  <NavbarVue class="mb-12" />
  <div class="container mx-auto">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <div class="grid md:grid-cols-3 gap-3 mb-4">
          <div>
            <select class="w-full h-11 border-2 border-black" name="category">
              <option value="newest" selected>最新貼文</option>
              <option value="popular">熱門貼文</option>
            </select>
          </div>
          <div class="md:col-span-2">
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
        <ul>
          <li
            v-for="item in posts"
            :key="item.id"
            class="border-2 border-black rounded-lg mb-4 p-6"
          >
            <UserInfoVue
              class="mb-4"
              :imgUrl="item.userPhoto"
              :name="item.userName"
              userPageUrl="#"
              :subTitle="item.createAt"
            />
            <p class="whitespace-pre mb-4">{{ item.content }}</p>
            <img
              class="w-full"
              v-if="item.coverImage"
              :src="getImageUrl(item.coverImage)"
              alt="貼文圖片"
            />
          </li>
        </ul>
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
</template>

<script>
import { ref } from "vue";
import UserInfoVue from "../components/UserInfo.vue";
import IconSearchVue from "../components/icons/IconSearch.vue";
import NavbarVue from "../components/Navbar.vue";
import SideMenuVue from "../components/SideMenu.vue";

export default {
  components: {
    UserInfoVue,
    IconSearchVue,
    NavbarVue,
    SideMenuVue,
  },
  setup() {
    const posts = ref([
      {
        id: 1650284959971,
        userPhoto: "avatars/user.png",
        userName: "邊緣小杰",
        content: "外面看起來就超冷.... \n我決定回被窩繼續睡....>.<",
        coverImage: "images/snow.png",
        createAt: "2022/1/10 12:00",
      },
      {
        id: 1650284959111,
        userPhoto: "avatars/user6.png",
        userName: "波吉",
        content: "我一定要成為很棒棒的國王！",
        createAt: "2022/1/10 12:00",
      },
      {
        id: 1650284959222,
        userPhoto: "avatars/user5.png",
        userName: "阿爾敏",
        content: "各位我有一個作戰計畫",
        createAt: "2022/1/10 12:00",
      },
    ]);

    function getImageUrl(url) {
      if (url.startsWith("http")) return url;
      return new URL(`../assets/${url}`, import.meta.url).href;
    }

    return {
      posts,
      getImageUrl,
    };
  },
};
</script>
