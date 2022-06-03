<script setup>
import { ref, onMounted } from 'vue';
import CardTitle from '@/components/CardTitle.vue';
import PostEmptyCard from '@/components/PostEmptyCard.vue';
import { apiFollow } from '@/utils/apiFollow';
import { formateTime } from '@/utils/formateTime';

const isLoading = ref(false);
const followList = ref([]);
const today = formateTime(new Date());

const getFollows = () => {
  isLoading.value = true;
  apiFollow
    .getAll()
    .then((res) => {
      if (res.data.data) {
        isLoading.value = false;
        followList.value = res.data.data;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const getDay = (date) => {
  var oDate1 = new Date(today);
  var oDate2 = new Date(date);
  var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
  return iDays;
};

onMounted(() => {
  getFollows();
});
</script>

<template>
  <CardTitle title="追蹤名單"></CardTitle>
  <ul v-if="followList.length > 0">
    <li
      v-for="(item, idx) in followList"
      :key="idx"
      class="mb-4 flex items-end justify-between rounded-lg border-2 border-black bg-white p-4 shadow-post"
    >
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full bg-secondary">
          <img v-if="item.avatar" :src="item.avatar" :alt="item.name" />
        </div>
        <div class="ml-4 cursor-pointer" @click="$emit('change-key', item.key)">
          <p class="hover:text-blue_x font-extrabold hover:underline">
            {{ item.name }}
          </p>
          <p class="text-gray_m text-sm">
            追蹤時間：{{ formateTime(item.createdAt) }}
          </p>
        </div>
      </div>
      <div class="text-sm">
        您已追蹤 {{ getDay(formateTime(item.createdAt)) }} 天！
      </div>
    </li>
  </ul>
  <PostEmptyCard v-else>
    <p class="p-8 text-center text-subtitle">
      目前尚無追蹤名單，追蹤其他人吧！
    </p>
  </PostEmptyCard>
</template>
