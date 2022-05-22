<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="login-shadow flex items-center border-2 border-black bg-secondary px-12 py-20"
    >
      <div class="mr-12">
        <img src="@/assets/images/login-image.svg" alt="login-image" />
      </div>
      <ul class="flex flex-col items-center">
        <li class="mx-10"><img src="@/assets/images/logo.png" alt="logo" /></li>
        <li class="mb-9">
          <h3 class="text-2xl">到元宇宙展開全新社交圈</h3>
        </li>
        <li class="mb-4 w-full">
          <input
            class="font-secondary w-full border-2 border-black py-4 px-6"
            type="text"
            placeholder="暱稱"
            v-model="form.name"
            @blur="v$.name.$touch"
          />
          <div
            v-if="v$.name.$errors.length > 0"
            class="font-secondary text-[#F57375]"
          >
            {{ v$.name.$errors[0].$message }}
          </div>
          <!-- <div v-if="v$.name.minLength.$invalid">暱稱至少 2 個字元以上</div> -->
        </li>
        <li class="mb-4 w-full">
          <input
            class="font-secondary w-full border-2 border-black py-4 px-6"
            type="text"
            placeholder="Email"
            v-model="form.email"
            @blur="v$.email.$touch"
          />
          <div
            v-if="v$.email.$errors.length > 0"
            class="font-secondary text-[#F57375]"
          >
            {{ v$.email.$errors[0].$message }}
          </div>
        </li>
        <li class="mb-8 w-full">
          <input
            class="font-secondary w-full border-2 border-black py-4 px-6"
            type="text"
            placeholder="Password"
            v-model="form.password"
            @blur="v$.password.$touch"
          />
          <div
            v-if="v$.password.$errors.length > 0"
            class="font-secondary text-[#F57375]"
          >
            {{ v$.password.$errors[0].$message }}
          </div>
        </li>
        <li class="mb-4 w-full">
          <button
            class="w-full rounded-lg border-2 border-black bg-primary py-2 text-lg text-white hover:bg-warning hover:text-black disabled:bg-disabled-color"
            @click="register"
          >
            註冊
          </button>
        </li>
        <li>
          <p>登入</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import {
  required,
  minLength,
  email,
  helpers,
  alphaNum,
} from '@vuelidate/validators';
import { ref, computed } from 'vue';

const form = ref({
  name: '',
  email: '',
  password: '',
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('暱稱必填', required),
    minLength: helpers.withMessage('暱稱至少 2 個字元以上', minLength(2)),
  },
  email: {
    required: helpers.withMessage('email 必填', required),
    email: helpers.withMessage('email 格式錯誤', email),
  },
  password: {
    required: helpers.withMessage('密碼必填', required),
    alphaNum: helpers.withMessage(
      '密碼需至少 8 碼以上，並英數混合',
      helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, /\d/)
    ),
  },
}));

const v$ = useVuelidate(rules, form.value);
const register = async () => {
  const valid = await v$.value.$validate();
  if (valid) {
    console.log(form.value, 'valid');
  }
};
</script>

<style>
.login-shadow {
  box-shadow: -8px 8px 0px #00040029;
}
</style>
