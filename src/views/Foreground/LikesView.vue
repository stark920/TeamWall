<script setup>
import CardTitle from '@/components/CardTitle.vue';
import UserInfo from '@/components/UserInfo.vue';
import IconThumbsUpVue from '@/components/icons/IconThumbsUp.vue';
import IconArrowRightVue from '@/components/icons/IconArrowRight.vue';

import { ref, onMounted, inject } from 'vue';
const axios = inject('axios'); // inject axios

const userInfo = "62808a1b0e634d4c5982976c"; // 目前登入的使用者ID
const likes = ref([]);

const getLikes = () => {
  const data = { userInfo };
  const url = `http://localhost:3011/likes`;
  axios.post(url, data).then((res) => {
    likes.value = res.data.data;
  }).catch((err) => {
    console.log(err);
  });
};
onMounted(() => {
  getLikes();
});
</script>

<template>
  <CardTitle title="我按讚的貼文" />
  <ul>
    <li v-for="(item, index) in likes.posts" :key="item._id"
      class="rounded-lg border-2 border-black bg-white py-5 pl-4 pr-10 shadow-post"
      :class="{ 'mb-2': index < likes.posts.length - 1 }">
      <div class="flex justify-between">
        <UserInfo :name="item.UserInfo" :subTitle="$filters.dateTime(item.createAt)" />
        <ul class="flex gap-10">
          <li>
            <button type="button" class="flex flex-col items-center justify-center gap-1">
              <IconThumbsUpVue class="h-5 w-5 text-primary" />
              <span>取消</span>
            </button>
          </li>
          <li>
            <button type="button" class="flex flex-col items-center justify-center gap-1">
              <IconArrowRightVue class="h-5 w-5" />
              <span>查看</span>
            </button>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
