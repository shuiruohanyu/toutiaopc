<template>
  <div class="publish">
    <content-header>
      <template slot="title">发布文章</template>
    </content-header>
    <div class="publish-content">
      <el-form>
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="articleForm.title" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="120px">
          <quill-editor
            style="width:70%;height:300px;margin-bottom:100px"
            v-model="articleForm.content"
            ref="myQuillEditor"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="封面" label-width="120px">
          <el-radio v-model="articleForm.cover" label="1">单图</el-radio>
          <el-radio v-model="articleForm.cover" label="3">三图</el-radio>
          <el-radio v-model="articleForm.cover" label="0">无图</el-radio>
          <el-radio v-model="articleForm.cover" label="-1">自动</el-radio>
        </el-form-item>
        <el-form-item label="频道" label-width="120px">
          <el-select v-model="articleForm.channel_id">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="120px" style="margin-top:50px">
          <el-button type="primary" @click="pubArticle">发布</el-button>
          <el-button @click="saveArticle">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// require styles

export default {
  data () {
    return {
      articleForm: {
        content: '', // 内容
        title: '', // 名称
        channel_id: '', // 频道id
        type: '' // 封面类型
      },
      channels: []
    }
  },
  created () {
    this.loadChannels() // 拉取频道数据
  },
  methods: {
    loadChannels () {
      this.$http({
        methods: 'GET',
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 数据赋值给频道
      })
    },
    // 发布文章
    pubArticle () {},
    // 存入草稿
    saveArticle () {}
  }
}
</script>

<style lang="less" scoped>
.publish {
  background-color: #fff;
  width: 100%;
  min-height: 100%;
  .publish-content {
    padding: 50px 10px;
  }
}
</style>
