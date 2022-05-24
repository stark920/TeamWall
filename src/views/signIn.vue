<template>
  <!-- eslint-disable -->
	<div class="flex items-center justify-center h-screen">
		<div class="login-shadow flex items-center border-2 border-black bg-secondary px-12 py-20">
			<div class="px-4">
				<img src="@/assets/images/login-image.svg" alt="" class="w-auto">
			</div>
			<div class="px-4 text-center">
				<img src="/TeamWall/src/assets/images/logo.png" alt="" class="px-10">
				<p class="mb-4 text-2xl">到元宇宙展開全新社交圈</p>
				<div class="w-full">
					<div class="mb-8 space-y-4">
						<div class="form-control">
							<label for="userEmail"></label>
							<input
								v-model="userInfo.email"
								type="mail"
								class="form-input border-2 border-black p-4 w-full"
								placeholder="Email"
								@blur="v$.email.$touch"
							/>
							<div
								v-if="v$.email.$errors.length > 0"
								class="font-secondary text-[#F57375]"
							>
								{{ v$.email.$errors[0].$message }}
							</div>
						</div>
						<div class="form-control">
							<label for="userPassword"></label>
							<input
								v-model="userInfo.password"
								type="password"
								class="form-input border-2 border-black p-4 w-full"
								placeholder="Password"
								@blur="v$.password.$touch"
							/>
							<div
								v-if="v$.password.$errors.length > 0"
								class="font-secondary text-[#F57375]"
							>
								{{ v$.password.$errors[0].$message }}
							</div>
						</div>
					</div>
					<div class="flex flex-col items-center justify-center">
						<button 
							class="cursor-pointer w-full rounded-lg border-2 border-black bg-primary py-2 text-lg text-white hover:bg-warning hover:text-black disabled:bg-disabled-color"
							@click="signIn()"
						>
							登入
						</button>
						<router-link to="/register" class="p-4 text-lg text-decoration-none">註冊帳號</router-link>
					</div>
				</div>
				
			</div>
		</div>
	</div>
  
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { ref, reactive, computed, onMounted, inject } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { API_URL } from '@/global/constant';
import { required, email, helpers } from '@vuelidate/validators';
const axios = inject('axios');
const router = useRouter();
const userInfo = reactive({
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
  },
}));
const v$ = useVuelidate(rules, userInfo);

const signIn = async () => {
  const valid = await v$.value.$validate();
  if (valid) {
    const data = userInfo;
    try {
      const res = await axios.post(`${API_URL}/user/sign-in`, data);
      if (res.data.data) {
        const token = res.headers.authorization.split(' ')[1];
        localStorage.setItem('signInToken', token);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const checkSignIn = async () => {
  const token = localStorage.getItem('signInToken');
  if (token) {
    const apiUrl = `${API_URL}/user/check`;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    try {
      const res = await axios.get(apiUrl);
      if (res.data.status === 'success') {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

onMounted(() => {
  checkSignIn();
});
</script>
