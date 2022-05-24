<script setup>
import { toRefs, computed } from 'vue';
import dayjs from 'dayjs';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
const useStore = useUserStore();
const { user: userInfo } = storeToRefs(useStore);
const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const { message: content, sender, createdAt } = toRefs(props.message);
const isSelf = computed(() => {
  return userInfo?.value._id === sender.value;
});

const formateTime = (time) => {
  return dayjs(time).format('HH:mm');
};
</script>

<template>
  <div class="m-4">
    <div :class="['flex items-end', { 'flex-row-reverse': isSelf }]">
      <div
        :class="[
          'm-h-[20px] inline-flex max-w-[300px] rounded-2xl border-2 p-2',
          isSelf ? 'bg-slate-300' : 'bg-slate-200',
        ]"
      >
        {{ content }}
      </div>
      <span class="px-2 text-xs">{{ formateTime(createdAt) }}</span>
    </div>
  </div>
</template>
