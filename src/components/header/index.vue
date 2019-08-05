<template>
  <div class="header-title">
    <slot name="title"></slot>
  </div>
</template>

<script>
export default {}
</script>
<style lang='less' scoped>
.header-title {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  padding-left: 20px;
  border-bottom: 1px dashed #ccc;
}
</style>
