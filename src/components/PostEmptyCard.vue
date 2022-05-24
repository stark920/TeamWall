<template>
  <div class="rounded-lg border-2 border-black bg-white shadow-post">
    <div class="flex border-b-2 border-black p-4">
      <div
        class="mr-1 h-2 w-2 rounded-full border-[1px] border-gray-500 bg-apple-red"
      ></div>
      <div
        class="mr-1 h-2 w-2 rounded-full border-[1px] border-gray-500 bg-apple-yellow"
      ></div>
      <div
        class="h-2 w-2 rounded-full border-[1px] border-gray-500 bg-apple-green"
      ></div>
    </div>
    <slot></slot>
  </div>
</template>
