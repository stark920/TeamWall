<script setup>
import useVuelidate from '@vuelidate/core';
import IconLoading from '@/components/icons/IconLoading.vue';
import { required, email, helpers } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { apiUser } from '@/utils/apiUser';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const router = useRouter();

const form = ref({
  email: '',
  password: '',
});

const rules = computed(() => ({
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

const isSending = ref(false);
const errorMessage = ref('');
function resetData() {
  form.value.password = '';
  isSending.value = false;
}
const signIn = async () => {
  const valid = await v$.value.$validate();
  if (!valid) return;

  isSending.value = true;
  apiUser
    .signIn(form.value)
    .then((res) => {
      userStore.updateUser(res.data.data);
      localStorage.setItem('metaWall', res.headers.authorization);
      resetData();
      router.push({ name: 'posts' });
    })
    .catch(() => {
      errorMessage.value = '登入失敗，帳號或密碼錯誤';
      resetData();
      setTimeout(() => {
        errorMessage.value = '';
      }, 2000);
    });
};
</script>

<template>
  <ul class="w-full" @keyup.enter.exact="signIn">
    <li class="mb-4 w-full">
      <input
        class="w-full border-2 border-black py-4 px-6 font-azeret"
        type="email"
        placeholder="Email"
        v-model="form.email"
        @blur="v$.email.$touch"
      />
      <div v-if="v$.email.$errors.length > 0" class="font-azeret text-alert">
        {{ v$.email.$errors[0].$message }}
      </div>
    </li>
    <li class="mb-8 w-full">
      <input
        class="w-full border-2 border-black py-4 px-6 font-azeret"
        type="password"
        placeholder="Password"
        v-model="form.password"
        @blur="v$.password.$touch"
      />
      <div v-if="v$.password.$errors.length > 0" class="font-azeret text-alert">
        {{ v$.password.$errors[0].$message }}
      </div>
    </li>
    <li class="mb-2 text-center text-alert">
      <p>{{ errorMessage }}</p>
    </li>
    <li class="mb-4 w-full">
      <button
        class="flex w-full items-center justify-center rounded-lg border-2 border-black bg-primary py-2 text-lg text-white hover:bg-warning hover:text-black disabled:bg-disabled-color"
        @click="signIn"
        :disabled="isSending"
      >
        <span>登入</span>
        <IconLoading
          v-show="isSending"
          class="ml-1 h-4 w-4 animate-spin"
        ></IconLoading>
      </button>
    </li>
    <li class="text-center">
      <router-link to="sign-up">註冊</router-link>
    </li>
  </ul>
</template>
