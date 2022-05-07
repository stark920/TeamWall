<script setup>
import { ref, onMounted } from "vue";
import IconChat from "@/icons/IconChat.vue";
const inputBox = ref(null);

onMounted(() => {
  const keyEvent = new KeyboardEvent("keyup", {
    bubbles: true,
  });
  inputBox.value.dispatchEvent(keyEvent);
  inputBox.value.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      console.log("doSomething");
    }
    console.log("content", e.target.innerText);
  });
});
</script>

<template>
  <div
    class="bg-slate-700 w-full p-2 fixed sm:absolute bottom-0 flex justify-between items-center left-0"
  >
    <div
      class="bg-white min-h-[32px] max-h-36 flex items-center rounded-2xl w-11/12 break-all px-2 outline-none overflow-hidden"
      contenteditable="true"
      id="test"
      role="textbox"
      spellcheck="true"
      tabindex="0"
      ref="inputBox"
    ></div>
    <IconChat class="text-white cursor-pointer" />
  </div>
</template>
