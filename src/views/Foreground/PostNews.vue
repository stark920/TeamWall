<script setup>
import { ref, inject, reactive } from 'vue';
import CardTitle from '@/components/CardTitle.vue';
import { API_URL } from '@/global/constant';
const axios = inject('axios');

const postContent = ref('');

const data = reactive({
  isWarnHint: false,
  preview: null,
  image: '',
});

const previewImage = (event) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      data.preview = e.target.result;
    };
    console.log(input.files[0]);
    data.image = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};

const submitPost = () => {
  data.isWarnHint = true;
  axios
    .post(`${API_URL}/posts`, {
      userName: 'aa',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/377.jpg',
      content: postContent.value,
      updateImage: data.preview,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <CardTitle title="張貼動態"></CardTitle>

  <div class="rounded-lg border-2 border-black bg-white p-8 shadow-post">
    <p>貼文內容</p>
    <textarea
      name="postContent"
      rows="6"
      placeholder="輸入您的貼文內容"
      class="mt-1 w-full rounded-none border-2 px-4 py-3 focus:border-black focus:shadow-transparent"
      @focus="isWarnHint = false"
      v-model="postContent"
    ></textarea>
    <div
      class="relative my-4 w-32 gap-y-8 rounded bg-black py-1 px-8 text-white"
    >
      <input
        ref="inputDOM"
        type="file"
        accept="image/*"
        class="absolute left-0 z-10 w-full cursor-pointer opacity-0"
        @change="previewImage"
      />
      <span>上傳圖片</span>
    </div>
    <div class="mb-6 h-40 w-full rounded-lg border-2 border-black">
      <img :src="data.preview" class="h-full" />
    </div>
    <div class="text-center">
      <div v-show="isWarnHint" class="text-red_x -mt-2 mb-2 mb-1 text-sm">
        圖片檔案過大，僅限 1mb 以下檔案<br />圖片格式錯誤，僅限 JPG、PNG 圖片
      </div>
      <button
        class="rounded-lg border-2 border-black bg-subtitle py-3 px-32 font-semibold hover:bg-warning hover:text-black hover:shadow-btn"
        @click.prevent="submitPost()"
      >
        送出貼文
      </button>
    </div>
  </div>
</template>
