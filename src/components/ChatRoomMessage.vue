<script setup>
import { defineProps, toRefs, computed } from 'vue';
import { useUserStore } from '../stores';
import { storeToRefs } from 'pinia';
import { formateTime as formateDate } from '../utils/formateTime';
const useStore = useUserStore();
const { user: userInfo } = storeToRefs(useStore);
const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const { content, user, createdAt } = toRefs(props.message);
const isSelf = computed(() => {
  return userInfo.value._id === user.value._id;
});

const formateTime = (time) => {
  return formateDate(time, 'HH:mm');
};
</script>

<template>
  <div class="m-4">
    <!-- <div class="text-sm text-center pb-2">{{ formateTime(createdAt) }}</div> -->
    <div :class="['flex items-end', { 'flex-row-reverse': isSelf }]">
      <div
        :class="[
          'm-h-[20px] inline-flex max-w-[300px] rounded-2xl p-2 text-slate-700',
          isSelf ? 'bg-slate-300' : 'bg-slate-200',
        ]"
      >
        {{ content }}
      </div>
      <span class="px-2 text-xs">{{ formateTime(createdAt) }}</span>
    </div>
  </div>
</template>
