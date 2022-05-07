<template>
  <div
    class="flex justify-center items-center font-azeret bg-white text-xl p-5 mb-8 border-2 border-black relative shadow-block z-10 font-extrabold"
  >
    張貼動態
  </div>
  <div class="bg-white border-2 border-black rounded-lg shadow-post p-8">
    <p>貼文內容</p>
    <textarea
      name="postContent"
      rows="6"
      placeholder="輸入您的貼文內容"
      class="w-full border-2 px-4 py-3 rounded-none mt-1 focus:border-black focus:shadow-transparent"
      @focus="isWarnHint = false"
      v-model="postContent"
    ></textarea>
    <div
      class="rounded bg-black text-white w-32 gap-y-8 py-1 px-8 my-4 relative"
    >
      <input
        ref="inputDOM"
        type="file"
        accept="image/*"
        class="opacity-0 w-full absolute left-0 z-10 cursor-pointer"
        @change="previewImage"
      />
      <span>上傳圖片</span>
    </div>
    <div class="w-full border-2 border-black rounded-lg h-40 mb-6">
      <img :src="data.preview" class="h-full" />
    </div>
    <div class="text-center">
      <div v-show="isWarnHint" class="text-sm -mt-2 mb-2 text-red_x mb-1">
        圖片檔案過大，僅限 1mb 以下檔案<br />圖片格式錯誤，僅限 JPG、PNG 圖片
      </div>
      <button
        class="py-3 px-32 border-2 border-black rounded-lg bg-subtitle font-semibold hover:bg-warning hover:text-black hover:shadow-btn"
        @click.prevent="submitPost()"
      >
        送出貼文
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, inject, reactive } from "vue";

const axios = inject("axios");

const postContent = ref("");

const data = reactive({
  isWarnHint: false,
  preview: null,
  image: "",
});

const refData = toRefs(data);
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
    .post("https://teamwork02.herokuapp.com/posts", {
      userName: "aa",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/377.jpg",
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

<style>
.shadow-block::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 2px solid #000040;
  bottom: 2px;
  left: 2px;
  z-index: -1;
  box-sizing: content-box;
}
</style>
