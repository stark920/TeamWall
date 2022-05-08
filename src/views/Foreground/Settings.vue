<script setup>
import { ref } from 'vue';
import CardTitle from '@/components/CardTitle.vue';

const tabName = ref("editNickName");
const changeTab = (name) => {
  tabName.value = name
}
</script>


<template>
  <CardTitle title="修改個人資料"></CardTitle>
  <ul class="flex flex-wrap text-sm font-medium text-center pl-6">
    <li>
      <a href="#"
        class="inline-block py-2 px-6 border-t-2 border-x-2 border-black rounded-t-md bg-white hover:text-white hover:bg-black"
        :class="tabName === 'editNickName' ? 'text-white bg-black' : ''"
        @click.prevent="changeTab('editNickName')">
        暱稱修改
      </a>
    </li>
    <li>
      <a href="#"
        class="inline-block py-2 px-6 border-t-2 border-r-2 border-black rounded-t-md bg-white hover:text-white hover:bg-black"
        :class="tabName === 'resetPassword' ? 'text-white bg-black' : ''"
        @click.prevent="changeTab('resetPassword')">
        重設密碼
      </a>
    </li>
  </ul>
  <div class="p-8 border-2 border-black bg-white flex flex-col items-center shadow-post rounded-xl">
    <template v-if="tabName === 'editNickName'">
      <img src="https://fakeimg.pl/107x107" alt="fakeimg" class="rounded-full border-2 border-black mb-4">
      <input type="button" value="上傳大頭照" class="border-black bg-black px-6 py-1 text-white rounded mb-4">
      <form action="" class="">
        <div class="mb-4">
          <label for="nickName" class="block mb-1">暱稱</label>
          <input type="text" name="" id="nickName" placeholder="邊緣小杰" class="border-2 border-black">
        </div>
        <div class="mb-8">
          <label for="male" class="block mb-1">性別</label>
          <input type="radio" name="sex" id="male" value="male" class="mr-3">
          <label for="male" class="mr-7">男性</label>
          <input type="radio" name="sex" id="female" value="female" class="mr-3">
          <label for="female" class="">女性</label>
        </div>
        <input type="button" value="送出更新" class="border-2 border-black bg-warning text-center py-4 text-black rounded w-full">
      </form>
    </template>
    <template v-else>
      <form action="" class="flex-col items-center">
        <div class="mb-4">
          <label for="newPassword" class="block mb-1">輸入新密碼</label>
          <input type="text" id="newPassword" placeholder="請輸入新密碼" class="border-2 border-black">
        </div>
        <div class="mb-8">
          <label for="checkPassword" class="block mb-1">再次輸入</label>
          <input type="text" id="checkPassword" placeholder="再次輸入新密碼" class="border-2 border-black">
        </div>
        <input type="button" value="重設密碼" class="border-2 border-black bg-subtitle text-white py-4 text-black rounded w-full">
      </form>
    </template>
  </div>
</template>
