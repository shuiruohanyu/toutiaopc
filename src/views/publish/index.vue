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
          <el-radio v-model="articleForm.type" label="1">单图</el-radio>
          <el-radio v-model="articleForm.type" label="3">三图</el-radio>
          <el-radio v-model="articleForm.type" label="0">无图</el-radio>
          <el-radio v-model="articleForm.type " label="-1">自动</el-radio>
        </el-form-item>
        <!-- 单图 -->
        <el-form-item v-if="articleForm.type === 1" label-width="120px">
          <!-- 点击图片时 弹出素材图 -->
          <div @click="showUploadDialog = true" class="single-img">
            <img :src="firstCover" alt />
          </div>
        </el-form-item>
        <!-- 三图 -->
        <el-form-item v-else-if="articleForm.type === 3" label-width="120px"></el-form-item>
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
    <el-dialog :visible="showUploadDialog">
      <img-upload></img-upload>
    </el-dialog>
  </div>
</template>

<script>
// require styles
import defaultImg from '../../assets/pic_bg.png'
export default {
  data () {
    return {
      articleForm: {
        content: '', // 内容
        title: '', // 名称
        channel_id: '', // 频道id
        type: 1, // 封面类型
        images: [] // 封面
      },
      channels: [],
      showUploadDialog: false
    }
  },
  // 计算属性
  computed: {
    firstCover () {
      return this.articleForm.images.length
        ? this.articleForm.images[0]
        : defaultImg
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
  .single-img {
    width: 180px;
    height: 180px;
    padding: 20px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
