<script setup>
  import { ref, reactive } from 'vue';
  import axios from 'axios';
  import CardTitle from '@/components/CardTitle.vue';
  import { useUserStore } from '@/stores';
  import { API_URL } from '@/global/constant';


  const user = useUserStore();

  const tabName = ref('editNickName');
  const changeTab = (name) => {
    tabName.value = name;
  };

  const token = localStorage.getItem('metaWall');
  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}` ;
  
  // Profile
  const changeUserProfile = reactive({});
  const imageFile = ref(null);
  const updateUserProfile = () => {
    const photos = Array.from(imageFile.value.files);
    const form = new FormData();
    photos.forEach((item) => {
      form.append("photo", item);
    })
    form.append("name", changeUserProfile.name);
    form.append("sex", changeUserProfile.sex);

    axios.patch(`${API_URL}/users/profile`).then((res) => {
       if (res.data.status === 'success') {
        console.log('更新成功');
        user.updateUser(res.data.data);
      } else {
        updateProfileMessage.value = "failed";
      }
    })
  }

  // Password
  const changePassword = reactive({});
  const pwdErrorMessage = ref('');
  const updateUserPwd = () => {
    const {password, passwordConfirm} = changePassword
    if (password === passwordConfirm) {
      axios.patch(`${API_URL}/users/profile/pwd`, changePassword).then((res) => {
        console.log(res.data);
        if (res.data.status) {
          resetPwdForm();
          pwdErrorMessage.value = '';
        }
      }).catch((err) => {
        pwdErrorMessage.value = '請重新設定密碼'
      })
    } else {
      pwdErrorMessage.value = '密碼不一致';
    }
  }
  const resetPwdForm = () => {
    Object.keys(changePassword).forEach((item) => changePassword[item] = '');
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
        class="mb-4 w-24 h-24 rounded-full border-2 border-black"
      />
      <input ref="imageFile"
        type="file"
        name="photos"
        accept="image/png, image/jpeg, image/jpg"
        class="hidden btn btn-dark px-8 py-1 mb-4"
      />
      <input 
        type="button"
        value="上傳大頭照"
        class="mb-4 rounded border-black bg-black px-6 py-1 text-white"
        @click="imageFile.click()">
      <form @submit.prevent="updateUserProfile" action="" class="">
        <div class="mb-4">
          <label for="nickName" class="mb-1 block">暱稱</label>
          <input
            v-model="changeUserProfile.name"
            type="text"
            name=""
            id="nickName"
            placeholder="邊緣小杰"
            class="border-2 border-black"
          />
        </div>
        <div class="mb-8">
          <label for="male" class="mb-1 block">性別</label>
          <input 
            v-model="changeUserProfile.sex"
            type="radio"
            name="sex"
            id="male"
            value="male"
            class="mr-3" />
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
        <input
          type="submit"
          value="送出更新"
          class="w-full rounded border-2 border-black bg-warning py-4 text-center text-black"
        />
      </form>
    </template>
    <template v-else>
      <form @submit.prevent="updateUserPwd" action="" class="flex-col items-center">
        <div class="mb-1">
          <label for="newPassword" class="mb-1 block">輸入新密碼</label>
          <input
            v-model="changePassword.password"
            type="password"
            id="newPassword"
            placeholder="請輸入新密碼"
            class="border-2 border-black"
            required
          />
        </div>
        <p v-if="pwdErrorMessage" class="mb-4 text-warning">{{pwdErrorMessage}}</p>
        <div class="mb-8">
          <label for="checkPassword" class="mb-1 block">再次輸入</label>
          <input
            v-model="changePassword.passwordConfirm"
            type="password"
            id="checkPassword"
            placeholder="再次輸入新密碼"
            class="border-2 border-black"
            required
          />
        </div>
        <input
          type="submit"
          value="重設密碼"
          class="w-full rounded border-2 border-black bg-subtitle py-4 text-white text-black"
        />
      </form>
    </template>
  </div>
</template>
