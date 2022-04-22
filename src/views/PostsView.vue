<template>
  <NavbarVue class="mb-12" />
  <div class="container mx-auto px-3 sm:px-0">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <div class="grid md:grid-cols-3 gap-x-3 gap-y-1.5 mb-4">
          <div>
            <select class="w-full h-11 border-2 border-black" name="category">
              <option value="newest" selected>最新貼文</option>
              <option value="popular">熱門貼文</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <div class="flex h-11 border-2 border-black">
              <input
                class="w-full border-0"
                type="text"
                placeholder="搜尋貼文"
              />
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
              :src="item.coverImage"
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
  <PostOptionVue class="fixed left-1/2 -translate-x-1/2 bottom-12 md:hidden" />
</template>

<script>
import { ref, onMounted } from "vue";
import UserInfoVue from "../components/UserInfo.vue";
import IconSearchVue from "../components/icons/IconSearch.vue";
import NavbarVue from "../components/Navbar.vue";
import SideMenuVue from "../components/SideMenu.vue";
import PostOptionVue from "../components/PostOption.vue";
import axios from "axios";

export default {
  components: {
    UserInfoVue,
    IconSearchVue,
    NavbarVue,
    SideMenuVue,
    PostOptionVue,
  },
  setup() {
    const posts = ref([]);

    function getPosts() {
      axios
        .get("http://localhost:3000/posts")
        .then((res) => {
          posts.value = res.data.posts;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(() => {
      getPosts();
    });

    return {
      posts,
      getPosts,
    };
  },
};
</script>
