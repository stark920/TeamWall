<script setup>
import { ref, onMounted } from 'vue';
import IconChat from './icons/IconChat.vue';
const inputBox = ref(null);

onMounted(() => {
  const keyEvent = new KeyboardEvent('keyup', {
    bubbles: true,
  });
  inputBox.value.dispatchEvent(keyEvent);
  inputBox.value.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      console.log('doSomething');
    }
    console.log('content', e.target.innerText);
  });
});
</script>

<template>
  <div
    class="fixed bottom-0 left-0 flex w-full items-center justify-between bg-slate-700 p-2 md:absolute"
  >
    <div
      class="flex max-h-36 min-h-[32px] w-11/12 items-center overflow-hidden break-all rounded-2xl bg-white px-2 outline-none"
      contenteditable="true"
      id="test"
      role="textbox"
      spellcheck="true"
      tabindex="0"
      ref="inputBox"
    ></div>
    <IconChat class="h-6 w-6 cursor-pointer text-white" />
  </div>
</template>
