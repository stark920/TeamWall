<script setup>
import CardTitle from '@/components/CardTitle.vue';
import IconLoading from '@/components/icons/IconLoading.vue';
import { ref, reactive } from 'vue';
import { apiPost } from '@/utils/apiPost';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
const toast = useToast();
const router = useRouter();

const uploadImages = ref();
const isSending = ref(false);

const postValidates = {
  contentLength: 1,
  fileNum: 10,
  fileSize: 1024 * 1024,
  fileType: ['image/jpg', 'image/jpeg', 'image/png'],
};

const postData = reactive({
  content: '',
  images: [],
  previews: [],
  warnHint: [],
});

const checkPostData = {
  content() {
    return postData.content.trim().length < postValidates.contentLength
      ? [`內容至少需要輸入 ${postValidates.contentLength} 個字`]
      : null;
  },
  file(file) {
    const errors = [];
    if (file.size > postValidates.fileSize) {
      errors.push(
        `${file.name}：圖片檔案過大，僅限 ${
          postValidates.fileSize / (1024 * 1024)
        } MB 以下檔案`
      );
    }
    if (postValidates.fileType.indexOf(file.type) < 0) {
      const acceptTypeString = postValidates.fileType
        .map((type) => type.split('/')[1])
        .join('、');
      errors.push(`${file.name}：圖片格式錯誤，僅限 ${acceptTypeString} 圖片`);
    }
    return errors.length > 0 ? errors : null;
  },
};

const handleImageUpload = (e) => {
  if (!uploadImages.value.files) {
    return;
  }

  if (
    uploadImages.value.files.length + postData.images.length >
    postValidates.fileNum
  ) {
    toast.error(`一則貼文最多可以上傳 ${postValidates.fileNum} 張圖片`);
    uploadImages.value = null;
    e.target.value = null;
    return;
  }

  const errorMessage = [];
  for (const file of uploadImages.value.files) {
    const errors = checkPostData.file(file);
    if (errors) {
      errorMessage.push(...errors);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        postData.previews.push(e.target.result);
      };
      reader.readAsDataURL(file);
      postData.images.push(file);
    }
  }

  uploadImages.value = null;
  e.target.value = null;

  if (errorMessage.length > 0) {
    postData.warnHint = errorMessage;
    setTimeout(function () {
      postData.warnHint.length = 0;
    }, 5000);
  }
};

const removeImage = (index) => {
  postData.previews.splice(index, 1);
  postData.images.splice(index, 1);
};

const submitPost = () => {
  if (isSending.value) {
    return;
  }
  const checkContent = checkPostData.content();
  if (checkContent) {
    toast.error(checkContent.toString());
    return;
  }
  isSending.value = true;
  const form = new FormData();
  form.append('content', postData.content);
  postData.images.forEach((image) => {
    form.append('photos', image);
  });

  apiPost
    .upload(form)
    .then((res) => {
      const userId = res.data.data.userId;
      if (userId) {
        router.push(`/profile/${userId}`);
      } else {
        toast.error('新增貼文失敗，請稍後再試');
      }
    })
    .catch(() => {
      toast.error('新增貼文失敗，請稍後再試');
    });
};
</script>

<template>
  <CardTitle title="張貼動態"></CardTitle>

  <div class="rounded-lg border-2 border-black bg-white p-8 shadow-post">
    <p>貼文內容</p>
    <textarea
      rows="10"
      placeholder="輸入您的貼文內容"
      class="mt-1 w-full resize-none border-2 px-4 py-3 focus:border-primary focus:shadow-transparent"
      v-model="postData.content"
    ></textarea>
    <label
      for="customFileInput"
      class="my-4 inline-block cursor-pointer rounded bg-black py-1 px-8 text-white"
      >上傳圖片</label
    >
    <input
      id="customFileInput"
      ref="uploadImages"
      type="file"
      :accept="postValidates.fileType.join(', ')"
      class="hidden"
      @change="handleImageUpload"
      multiple
    />
    <div
      :class="{
        'items-center justify-center py-4': postData.previews.length === 0,
        'grid-cols-2': postData.previews.length > 1,
      }"
      class="mb-4 grid w-full overflow-hidden rounded-lg border-2 border-black"
    >
      <span v-show="postData.previews.length === 0" class="text-gray-500">
        尚未上傳圖片
      </span>
      <template v-if="postData.previews.length > 0">
        <div
          v-for="(image, index) of postData.previews"
          class="relative aspect-video hover:brightness-110"
          :key="index"
        >
          <span
            @click="removeImage(index)"
            class="absolute top-1 right-1 cursor-pointer rounded-md bg-white px-2 opacity-50 hover:opacity-100"
          >
            移除
          </span>
          <img :src="image" />
        </div>
      </template>
    </div>
    <div class="text-center">
      <div
        v-show="postData.warnHint.length > 0"
        class="mb-4 whitespace-pre-wrap text-sm text-alert"
      >
        {{ postData.warnHint.join('\n') }}
      </div>
      <button
        class="mx-auto flex w-8/12 items-center justify-center rounded-lg border-2 border-black bg-subtitle py-3 font-semibold hover:bg-warning lg:w-6/12"
        @click.prevent="submitPost()"
        :disabled="isSending"
      >
        <span>送出貼文</span>
        <IconLoading
          v-show="isSending"
          class="ml-1 h-4 w-4 animate-spin"
        ></IconLoading>
      </button>
    </div>
  </div>
</template>
