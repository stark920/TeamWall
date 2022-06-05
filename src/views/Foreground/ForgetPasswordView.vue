<script setup>
import useVuelidate from '@vuelidate/core';
import IconLoading from '@/components/icons/IconLoading.vue';
import { required, email, helpers } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { apiUser } from '@/utils/apiUser';
import { useToast } from 'vue-toastification';
const toast = useToast();

const form = ref({ email: '' });
const rules = computed(() => ({
  email: {
    required: helpers.withMessage('email 必填', required),
    email: helpers.withMessage('email 格式錯誤', email),
  },
}));
const v$ = useVuelidate(rules, form.value);
const isSending = ref(false);

function resetData() {
  form.value.email = '';
  isSending.value = false;
}

const sendForgetMail = async () => {
  const valid = await v$.value.$validate();
  if (!valid) return;
  isSending.value = true;
  apiUser
    .sendForgetMail({ email: form.value.email })
    .then((res) => {
      resetData();
      toast.success(res.data.message);
    })
    .catch((error) => {
      resetData();
      toast.error(error.message);
    });
};
</script>

<template>
  <ul class="w-full" @keyup.enter.exact="sendForgetMail">
    <li class="mb-8 w-full text-center text-2xl font-bold">忘記密碼？</li>
    <li class="mb-4 w-full">請輸入您的電子郵件信箱</li>
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
    <li class="mb-4 w-full">
      <button
        class="flex w-full items-center justify-center rounded-lg border-2 border-black bg-primary py-2 text-lg text-white hover:bg-warning hover:text-black disabled:bg-disabled"
        @click="sendForgetMail"
        :disabled="isSending"
      >
        <span>發送確認信</span>
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
