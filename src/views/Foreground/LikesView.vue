<script setup>
import CardTitle from '@/components/CardTitle.vue';
import UserInfo from '@/components/UserInfo.vue';
import IconThumbsUpVue from '@/components/icons/IconThumbsUp.vue';
import IconArrowRightVue from '@/components/icons/IconArrowRight.vue';

import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const axios = inject('axios'); // inject axios
const baseUrl = 'http://127.0.0.1:3000';

const userId = '6289cb654896923f8331bc15'; // 待調整:登入userId
const likes = ref([]);

const getLikes = () => {
  const data = { userId };
  const url = `${baseUrl}/likes`;
  axios
    .post(url, data)
    .then((res) => {
      likes.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const canclePost = (postId) => {
  const data = { userId, posts: postId };
  const url = `${baseUrl}/likes/likePost`;
  axios
    .post(url, data)
    .then(() => {
      getLikes();
    })
    .catch((err) => {
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
    <li
      v-for="(item, index) in likes.posts"
      :key="item._id"
      class="rounded-lg border-2 border-black bg-white py-5 pl-4 pr-10 shadow-post"
      :class="{ 'mb-2': index < likes.posts.length - 1 }"
    >
      <div class="flex justify-between">
        <UserInfo
          :name="item.userId?.name"
          :subTitle="`發文時間：${$filters.dateTime(item.createAt)}`"
          :userPageUrl="`/user/${item.userId?._id}`"
          :imgUrl="item.userId?.photo"
        />
        <ul class="flex gap-10">
          <li>
            <button
              type="button"
              class="flex flex-col items-center justify-center gap-1"
              @click="canclePost(item._id)"
            >
              <IconThumbsUpVue class="h-5 w-5 text-primary" />
              <span>取消</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex flex-col items-center justify-center gap-1"
              @click="router.push(`/post/${item._id}`)"
            >
              <IconArrowRightVue class="h-5 w-5" />
              <span>查看</span>
            </button>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
