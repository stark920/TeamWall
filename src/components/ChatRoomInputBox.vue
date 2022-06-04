<script setup>
import { useToast } from 'vue-toastification';
import { ref, onMounted } from 'vue';
import Send from '@/components/icons/IconSend.vue';
const inputBox = ref(null);
const toast = useToast();
const emit = defineEmits(['sendMessage', 'userTyping']);
const sendMessage = () => {
  let value = inputBox.value.innerText;
  value = value.replace(/\n/g, '');
  if (value.length === 0) {
    toast.error('請輸入內容再送出訊息');
    return;
  }
  if (value.length > 100) {
    toast.error('輸入內容長度超過上限');
    return;
  }
  emit('sendMessage', value);
  inputBox.value.innerText = '';
  inputBox.value.focus();
};

onMounted(() => {
  const keyEvent = new KeyboardEvent('keyup', {
    bubbles: true,
  });
  inputBox.value.dispatchEvent(keyEvent);
  inputBox.value.addEventListener('keyup', (e) => {
    emit('userTyping', e.key);
  });
  inputBox.value.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
</script>

<template>
  <div
    class="fixed bottom-0 left-0 flex w-full items-center justify-between bg-slate-700 p-2 md:absolute"
  >
    <div
      class="flex max-h-36 min-h-[32px] w-[90%] items-center overflow-hidden break-all rounded-2xl bg-white px-2 outline-none"
      contenteditable="true"
      id="test"
      role="textbox"
      spellcheck="true"
      tabindex="0"
      ref="inputBox"
    ></div>
    <Send @click="sendMessage" class="cursor-pointer text-white" />
  </div>
</template>
