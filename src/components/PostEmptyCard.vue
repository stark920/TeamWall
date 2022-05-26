<template>
  <div class="rounded-lg border-2 border-black bg-white shadow-post">
    <div class="border-b-2 border-black p-4">
      <span class="dot"></span>
    </div>
    <slot></slot>
    <!-- <p class="p-8 text-center text-subtitle">目前尚無動態，新增一則貼文吧！</p> -->
  </div>
</template>

<style scoped>
.dot,
.dot::before,
.dot::after {
  height: 9px;
  width: 9px;
  border-radius: 50%;
  display: inline-block;
}
.dot {
  background-color: #de4b63;
  position: relative;
}

.dot::before {
  content: '';
  background-color: #faa722;
  position: absolute;
  left: 150%;
}

.dot::after {
  content: '';
  background-color: #83c51d;
  position: absolute;
  left: 300%;
}
</style>
