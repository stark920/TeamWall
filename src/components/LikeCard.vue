<template>
  <div
    class="flex justify-between rounded-lg border-2 border-black bg-white py-5 pl-4 pr-10 shadow-post"
    :class="{ 'animate-pulse': isLoading }"
  >
    <UserInfo
      :name="item.userId?.name"
      :subTitle="`發文時間：${$filters.dateTime(item.createdAt)}`"
      :userPageUrl="`/profile/${item.userId?._id}`"
      :imgUrl="item.userId?.avatar?.url"
    />
    <ul class="flex gap-10">
      <li>
        <button
          type="button"
          class="flex flex-col items-center justify-center gap-1"
          @click="cancelLikePost(item._id)"
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
</template>

<script setup>
import { ref } from 'vue';
import UserInfo from '@/components/UserInfo.vue';
import IconThumbsUpVue from '@/components/icons/IconThumbsUp.vue';
import IconArrowRightVue from '@/components/icons/IconArrowRight.vue';
import { apiLike } from '@/utils/apiLike';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoading = ref(false);

defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emit = defineEmits(['get-likes']);

const cancelLikePost = (postId) => {
  const data = { posts: postId };
  isLoading.value = true;
  apiLike
    .toggle(data)
    .then(() => {
      isLoading.value = false;
      emit('get-likes');
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
};
</script>
