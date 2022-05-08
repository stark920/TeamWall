<template>
  <CardTitle title="我按讚的貼文" />
  <ul>
    <li
      v-for="(item, index) in likes"
      :key="item._id"
      class="border-2 border-black rounded-lg pl-4 pr-10 py-5 shadow-post"
      :class="{ 'mb-2': index < likes.length - 1 }"
    >
      <div class="flex justify-between">
        <UserInfo :name="item.user?.name" :subTitle="item.createAt" />
        <ul class="flex gap-10">
          <li>
            <button
              type="button"
              class="flex flex-col justify-center items-center gap-1"
            >
              <IconThumbsUpVue class="w-5 h-5 text-primary" />
              <span>取消</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex flex-col justify-center items-center gap-1"
            >
              <IconArrowRightVue class="w-5 h-5" />
              <span>查看</span>
            </button>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CardTitle from "../components/CardTitle.vue";
import UserInfo from "../components/UserInfo.vue";
import IconThumbsUpVue from "../components/icons/IconThumbsUp.vue";
import IconArrowRightVue from "../components/icons/IconArrowRight.vue";

const data = [
  {
    _id: "asdflkjhasdflkjh",
    user: {
      name: "愛爾敏",
    },
    createAt: "發文時間：2022/2/22 12:00",
  },
  {
    _id: "askdhjfksdhfk",
    user: {
      name: "米卡莎",
    },
    createAt: "發文時間：2022/2/21 20:00",
  },
];

const likes = ref();
const getLikes = () => {
  likes.value = data;
};
onMounted(() => {
  getLikes();
});
</script>
