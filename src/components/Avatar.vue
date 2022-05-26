<script setup>
defineProps({
  imgUrl: {
    type: String,
    default: 'avatars/user_default.png',
  },
  size: {
    type: String,
    default: '40',
  },
});

function getImageUrl(url) {
  if (url.startsWith('http') || url.includes('base64')) return url;
  return new URL(`../assets/${url}`, import.meta.url).href;
}
</script>

<template>
  <div
    class="overflow-hidden rounded-full border-2 border-black"
    :style="`width: ${size}px; height: ${size}px;`"
  >
    <img
      class="w-full object-cover"
      :src="getImageUrl(imgUrl)"
      alt="user's avatar"
    />
  </div>
</template>
