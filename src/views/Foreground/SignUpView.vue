<script setup>
import useVuelidate from '@vuelidate/core';
import IconLoading from '@/components/icons/IconLoading.vue';
import { required, minLength, email, helpers } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { apiUser } from '@/utils/apiUser';
import { useRouter } from 'vue-router';
const router = useRouter();
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
const isSending = ref(false);
const errorMessage = ref('');
function resetData() {
  form.value.email = '';
  form.value.password = '';
  isSending.value = false;
}
const signUp = async () => {
  const valid = await v$.value.$validate();
  if (!valid) return;
  isSending.value = true;
  apiUser
    .signUp(form.value)
    .then((res) => {
      resetData();
      alert(res.data.message);
      router.push({ name: 'sign-in' });
    })
    .catch((error) => {
      errorMessage.value = error.message;
      resetData();
      setTimeout(() => {
        errorMessage.value = '';
      }, 2000);
    });
};
</script>

<template>
  <ul class="w-full" @keyup.enter.exact="signUp">
    <li class="mb-4 w-full">
      <input
        class="w-full border-2 border-black py-4 px-6 font-azeret"
        type="text"
        placeholder="暱稱"
        v-model="form.name"
        @blur="v$.name.$touch"
      />
      <div v-if="v$.name.$errors.length > 0" class="font-azeret text-alert">
        {{ v$.name.$errors[0].$message }}
      </div>
    </li>
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
        @click="signUp"
        :disabled="isSending"
      >
        <span>註冊</span>
        <IconLoading
          v-show="isSending"
          class="ml-1 h-4 w-4 animate-spin"
        ></IconLoading>
      </button>
    </li>
    <li class="text-center">
      <router-link to="sign-in">登入</router-link>
    </li>
  </ul>
</template>
