<script setup>
import { ref } from 'vue';
import CardTitle from '@/components/CardTitle.vue';

const tabName = ref('editNickName');
const changeTab = (name) => {
  tabName.value = name;
};
</script>

<template>
  <CardTitle title="修改個人資料"></CardTitle>
  <ul class="flex flex-wrap pl-6 text-center text-sm font-medium">
    <li>
      <a
        href="#"
        class="inline-block rounded-t-md border-x-2 border-t-2 border-black bg-white py-2 px-6 hover:bg-black hover:text-white"
        :class="tabName === 'editNickName' ? 'bg-black text-white' : ''"
        @click.prevent="changeTab('editNickName')"
      >
        暱稱修改
      </a>
    </li>
    <li>
      <a
        href="#"
        class="inline-block rounded-t-md border-t-2 border-r-2 border-black bg-white py-2 px-6 hover:bg-black hover:text-white"
        :class="tabName === 'resetPassword' ? 'bg-black text-white' : ''"
        @click.prevent="changeTab('resetPassword')"
      >
        重設密碼
      </a>
    </li>
  </ul>
  <div
    class="flex flex-col items-center rounded-xl border-2 border-black bg-white p-8 shadow-post"
  >
    <template v-if="tabName === 'editNickName'">
      <img
        src="https://fakeimg.pl/107x107"
        alt="fakeimg"
        class="mb-4 rounded-full border-2 border-black"
      />
      <input
        type="button"
        value="上傳大頭照"
        class="mb-4 rounded border-black bg-black px-6 py-1 text-white"
      />
      <form action="" class="">
        <div class="mb-4">
          <label for="nickName" class="mb-1 block">暱稱</label>
          <input
            type="text"
            name=""
            id="nickName"
            placeholder="邊緣小杰"
            class="border-2 border-black"
          />
        </div>
        <div class="mb-8">
          <label for="male" class="mb-1 block">性別</label>
          <input type="radio" name="sex" id="male" value="male" class="mr-3" />
          <label for="male" class="mr-7">男性</label>
          <input
            type="radio"
            name="sex"
            id="female"
            value="female"
            class="mr-3"
          />
          <label for="female" class="">女性</label>
        </div>
        <input
          type="button"
          value="送出更新"
          class="w-full rounded border-2 border-black bg-warning py-4 text-center text-black"
        />
      </form>
    </template>
    <template v-else>
      <form action="" class="flex-col items-center">
        <div class="mb-4">
          <label for="newPassword" class="mb-1 block">輸入新密碼</label>
          <input
            type="text"
            id="newPassword"
            placeholder="請輸入新密碼"
            class="border-2 border-black"
          />
        </div>
        <div class="mb-8">
          <label for="checkPassword" class="mb-1 block">再次輸入</label>
          <input
            type="text"
            id="checkPassword"
            placeholder="再次輸入新密碼"
            class="border-2 border-black"
          />
        </div>
        <input
          type="button"
          value="重設密碼"
          class="w-full rounded border-2 border-black bg-subtitle py-4 text-white text-black"
        />
      </form>
    </template>
  </div>
</template>
