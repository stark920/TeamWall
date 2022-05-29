<script setup>
defineProps({
  displayDialog: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div
    v-show="displayDialog"
    class="fixed top-0 left-0 z-10 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,.5)]"
  >
    <div class="max-w-[500px] border-2 border-black bg-white p-6 shadow-login">
      <h1 class="mb-8 text-8xl">:(</h1>
      <p class="break-words font-azeret text-lg">
        很抱歉，六角學院尚未提供第三方登入服務，但是您可以透過✨
        <a
          href="https://www.hexschool.com/"
          target="_blank"
          class="text-apple-green underline"
        >
          購買課程
        </a>
        ，持續向校長許願，相信在不久的將來
        <em class="text-apple-red">某R助教</em>
        就會實現這個願望！
      </p>
      <hr class="my-4" />
      <div class="flex items-end justify-between">
        <a
          href="https://www.hexschool.com/"
          target="_blank"
          class="block rounded-lg border-2 border-green-700 bg-green-600 p-2 text-white hover:brightness-110"
        >
          立即前往✨六角學院✨購買課程
        </a>
        <button
          @click="$emit('closeDialog')"
          type="button"
          class="text-underline text-sm text-disabled-color"
        >
          [ 關閉視窗 ]
        </button>
      </div>
    </div>
  </div>
</template>
