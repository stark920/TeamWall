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
							/>
						</div>
						<div class="form-control">
							<label for="userPassword"></label>
							<input
								v-model="userInfo.password"
								type="password"
								class="form-input border-2 border-black p-4 w-full"
								placeholder="Password"
							/>
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
import { ref, reactive, watch, onMounted, inject } from 'vue';
import { RouterLink } from 'vue-router';
import { API_URL } from '@/global/constant';
const axios = inject('axios');

const userInfo = reactive({
  email: '',
  password: '',
});

const signIn = async () => {
  const data = userInfo;
  try {
    const res = await axios.post(`${API_URL}/sign-in`, data);
    if (res.success) {
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
