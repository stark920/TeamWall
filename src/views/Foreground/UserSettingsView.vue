<script setup>
import { ref, reactive, computed } from 'vue';
import CardTitle from '@/components/CardTitle.vue';
import IconLoading from '@/components/icons/IconLoading.vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers, sameAs } from '@vuelidate/validators';
import { useUserStore } from '@/stores';
import { apiUser } from '@/utils/apiUser';

const userStore = useUserStore();
const isSending = ref(false);
const nameRules = computed(() => ({
  name: {
    required: helpers.withMessage('暱稱必填', required),
    minLength: helpers.withMessage('暱稱至少 2 個字元以上', minLength(2)),
  },
}));
const passwordRules = computed(() => ({
  password: {
    required: helpers.withMessage('密碼必填', required),
    alphaNum: helpers.withMessage(
      '密碼需至少 8 碼以上，並英數混合',
      helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, /\d/)
    ),
  },
  passwordConfirm: {
    required: helpers.withMessage('密碼必填', required),
    sameAsPassword: helpers.withMessage('密碼不一致', sameAs(changePassword.password))
  }
}));

// Change tab
const tabName = ref('editNickName');
const changeTab = (name) => {
  tabName.value = name;
};

// Profile
const changeUserProfile = reactive({...userStore.user});
const vProfile$ = useVuelidate(nameRules, changeUserProfile);
const imageFile = ref(null);
const updateUserProfile = () => {
  const photos = Array.from(imageFile.value.files);
  const form = new FormData();
  isSending.value = true;
  photos.forEach((item) => {
    form.append('avatar', item);
  });
  form.append('name', changeUserProfile.name.trim());
  form.append('sex', changeUserProfile.sex);

  apiUser.updateProfile(form)
    .then((res) => {
      if (res.data.status) {
        isSending.value = false;
        userStore.updateUser(res.data.data);
        changeUserProfile.name = res.data.data.name;
        changeUserProfile.avatar = res.data.data.avatar;
        changeUserProfile.sex = res.data.data.sex;
      } else {
        isSending.value = false;
        console.log('更新失敗，請洽系統管理員');
      }
    })
    .catch(() => {
      isSending.value = false;
      console.log('更新失敗，請洽系統管理員');
    });
};

// Password
const changePassword = reactive({});
const vPassword$ = useVuelidate(passwordRules, changePassword);
const updateUserPwd = async ($event) => {
  isSending.value = true;
  await apiUser.updatePassword(changePassword)
    .then((res) => {
      if (res.data.status) {
        isSending.value = false;
      } else {
        isSending.value = false;
        console.log('更新失敗，請洽系統管理員');
      }
    })
    .catch(() => {
      console.log('更新失敗，請洽系統管理員');
      isSending.value = false;
    });
  $event.target.reset();
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
        :src="changeUserProfile.avatar.url"
        alt="fakeimg"
        class="mb-4 h-24 w-24 rounded-full border-2 border-black"
      />
      <input
        ref="imageFile"
        type="file"
        name="photos"
        accept="image/png, image/jpeg, image/jpg"
        class="btn btn-dark mb-4 hidden px-8 py-1"
      />
      <input
        type="button"
        value="上傳大頭照"
        class="mb-4 rounded border-black bg-black px-6 py-1 text-white"
        @click="imageFile.click()"
      />
      <form @submit.prevent="updateUserProfile" action="" class="">
        <div class="mb-1">
          <label for="nickName" class="mb-1 block">暱稱</label>
          <input
            v-model="changeUserProfile.name"
            type="text"
            name=""
            id="nickName"
            placeholder="請輸入暱稱"
            class="border-2 border-black"
            @blur="vProfile$.name.$touch"
          />
        </div>
        <div v-if="vProfile$.name.$errors.length > 0" class="font-azeret text-alert">
          {{ vProfile$.name.$errors[0].$message }}
        </div>
        <div class="mt-4 mb-8">
          <label for="male" class="mb-1 block">性別</label>
          <input
            v-model="changeUserProfile.sex"
            type="radio"
            name="sex"
            id="male"
            value="male"
            class="mr-3"
          />
          <label for="male" class="mr-7">男性</label>
          <input
            v-model="changeUserProfile.sex"
            type="radio"
            name="sex"
            id="female"
            value="female"
            class="mr-3"
          />
          <label for="female" class="">女性</label>
        </div>
        <button
          type="submit"
          class="flex w-full items-center justify-center rounded border-2 border-black bg-warning py-4 text-black disabled:opacity-50"
          :disabled="vProfile$.name.$errors.length > 0"
        >
          <span v-show="!isSending">送出更新</span>
          <IconLoading
            v-show="isSending"
            class="ml-1 h-4 w-4 animate-spin my-1"
          ></IconLoading>
        </button>
      </form>
    </template>
    <template v-else>
      <form
        @submit.prevent="updateUserPwd"
        action=""
        class="flex-col items-center"
      >
        <div class="mb-1">
          <label for="newPassword" class="mb-1 block">輸入新密碼</label>
          <input
            v-model="changePassword.password"
            type="password"
            id="newPassword"
            placeholder="請輸入新密碼"
            class="border-2 border-black w-full"
            @blur="vPassword$.password.$touch"
            required
          />
        </div>
        <div v-if="vPassword$.password.$errors.length > 0" class="font-azeret text-alert">
          {{ vPassword$.password.$errors[0].$message }}
        </div>
        <div class="mb-1">
          <label for="checkPassword" class="mb-1 block">再次輸入</label>
          <input
            v-model="changePassword.passwordConfirm"
            type="password"
            id="checkPassword"
            placeholder="再次輸入新密碼"
            class="border-2 border-black w-full"
            @blur="vPassword$.passwordConfirm.$touch"
            required
          />
        </div>
        <div v-if="vPassword$.passwordConfirm.$errors.length > 0" class="font-azeret text-alert">
          {{ vPassword$.passwordConfirm.$errors[0].$message }}
        </div>
        <button
          type="submit"
          class="flex w-full items-center justify-center rounded border-2 border-black bg-subtitle py-4 mt-8 text-black disabled:opacity-50"
          :disabled="vPassword$.password.$errors.length > 0 || vPassword$.passwordConfirm.$errors.length > 0 || changePassword.password === undefined"
        >
          <span v-show="!isSending">重設密碼</span>
          <IconLoading
            v-show="isSending"
            class="ml-1 h-4 w-4 animate-spin my-1"
          ></IconLoading>
        </button>
      </form>
    </template>
  </div>
</template>
