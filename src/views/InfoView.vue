<script setup>
import AvatarVue from "../components/Avatar.vue";
import IconButtonVue from "../components/IconButton.vue";
import UserInfoVue from "../components/UserInfo.vue";
import CardTitleVue from "../components/CardTitle.vue";
import IconBellVue from "../components/icons/IconBell.vue";
import IconLoadingVue from "../components/icons/IconLoading.vue";
import IconLoginVue from "../components/icons/IconLogin.vue";
import IconSearchVue from "../components/icons/IconSearch.vue";
import IconThumbsUpVue from "../components/icons/IconThumbsUp.vue";
</script>

<template>
  <div class="p-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="border-2 border-black p-4">
      <h1 class="text-xl font-bold">Tailwind 配置</h1>
      <hr class="my-4" />
      <p class="font-sans">字體：font-sans</p>
      <p class="font-azeret">字體：font-azeret</p>
      <p class="font-paytone">字體：font-paytone</p>
      <p class="font-baloo">字體：font-baloo</p>
      <p class="bg-primary text-white">顏色：primary #03438D</p>
      <p class="bg-secondary">顏色：secondary #EFECE7</p>
      <p class="bg-warning text-white">warning #EEC32A</p>
      <p class="bg-black text-white">black #000400</p>
      <p class="text-subtitle">subtitle #9B9893</p>
    </div>
    <div class="border-2 border-black p-4">
      <h1 class="text-xl font-bold">Tailwind plugin - forms</h1>
      <hr class="my-4" />
      <a
        class="text-primary underline pb-2"
        href="https://tailwindcss-forms.vercel.app/"
        >DEMO 網站</a
      >
      <p>已經把表單樣式統一調整常用的樣式，select可以直接用，不用再手刻了</p>
      <select name="" id="">
        <option value="">DEMO</option>
      </select>
    </div>
    <div class="border-2 border-black p-4">
      <h1 class="text-xl font-bold">Component: 各種ICON</h1>
      <hr class="my-4" />
      <p>尺寸及顏色直接使用tailwind撰寫</p>
      <p>IconBellVue class="w-5 h-5 text-primary"</p>
      <IconBellVue class="w-5 h-5 text-primary" />
      <p>IconLoadingVue class="w-6 h-6 text-black"</p>
      <IconLoadingVue class="w-6 h-6 text-black" />
      <p>IconSearchVue class="w-8 h-8 text-blue-500"</p>
      <IconSearchVue class="w-8 h-8 text-blue-500" />
      <p>IconThumbsUpVue class="w-4 h-4 text-red-800"</p>
      <IconThumbsUpVue class="w-4 h-4 text-red-800" />
      <p>IconLoginVue class="w-[100px] h-[100px] text-warning"</p>
      <IconLoginVue class="w-[100px] h-[100px] text-warning" />
    </div>
    <div class="border-2 border-black p-4">
      <h1 class="text-xl font-bold">Component: IconButton.vue</h1>
      <hr class="my-4" />
      <p>參數1 size 預設40</p>
      <p>Slot 插入ICON 可以不用設定顏色</p>
      <p>DEMO:</p>
      <p>IconButtonVue size="50"</p>
      <p>嵌套 IconBellVue class="w-6 h-6"</p>
      <IconButtonVue size="50">
        <IconBellVue class="w-6 h-6" />
      </IconButtonVue>
    </div>
    <div class="border-2 border-black p-4">
      <h1 class="text-xl font-bold">Component: Avatar.vue</h1>
      <hr class="my-4" />
      <p>參數1 size 預設40</p>
      <p>參數2 imgUrl 本地圖片預設路徑為assets</p>
      <p>DEMO:</p>
      <p>AvatarVue size="60"</p>
      <AvatarVue size="60" />
      <p>AvatarVue size="40" imgUrl="avatars/user.png"</p>
      <AvatarVue size="40" imgUrl="avatars/user.png" />
      <p>AvatarVue size="50" imgUrl="https://picsum.photos/50/50"</p>
      <AvatarVue size="50" imgUrl="https://picsum.photos/50/50" />
    </div>
    <div class="border-2 border-black p-4">
      <h1 class="text-xl font-bold">Component: UserInfo.vue</h1>
      <hr class="my-4" />
      <p>這個配置會經常出現，所以把它整合成模組</p>
      <p>參數1 size 預設40</p>
      <p>參數2 imgUrl 頭像圖片位址 預設"avatars/user_default.png"</p>
      <p>參數3 name 使用者名稱 預設 Unknown</p>
      <p>
        參數4 userPageUrl 使用者名稱本身是超連結，此參數傳入連結網址 預設"#"
      </p>
      <p>參數5 subTitle 灰字副標</p>
      <p>DEMO:</p>
      <p>UserInfoVue (全部預設)</p>
      <UserInfoVue />
      <p>
        UserInfoVue imgUrl="avatars/user3.png" name="DEMO" userPageUrl="#"
        subTitle="test"
      </p>
      <UserInfoVue
        imgUrl="avatars/user3.png"
        name="DEMO"
        userPageUrl="#"
        subTitle="test"
      />
    </div>
    <div class="border-2 border-black p-4">
      <h1 class="text-xl font-bold">Component: CardTitle.vue</h1>
      <hr class="my-4" />
      <p>參數 title</p>
      <p>DEMO:</p>
      <p>CardTitleVue title="Title"</p>
      <CardTitleVue title="Title" />
    </div>

    <router-link to="/post-news" class="bg-warning border-2 border-black h-10 text-xl p-1 text-center">
      張貼動態
    </router-link>
  </div>
</template>
<style>
p {
  margin: 8px 0;
}
</style>
