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
          <el-radio v-model="articleForm.cover.type" :label="1">单图</el-radio>
          <el-radio v-model="articleForm.cover.type" :label="3">三图</el-radio>
          <el-radio v-model="articleForm.cover.type" :label="0">无图</el-radio>
          <el-radio v-model="articleForm.cover.type " :label="-1">自动</el-radio>
        </el-form-item>
        <!-- 单图 -->
        <el-form-item v-if="articleForm.cover.type == 1" label-width="120px">
          <!-- 点击图片时 弹出素材图 -->
          <div @click="showUploadDialog = true" class="single-img">
            <img :src="firstCover" alt />
          </div>
        </el-form-item>
        <!-- 三图 -->
        <el-form-item v-else-if="articleForm.cover.type == 3" label-width="120px">
          <div class="three-img">
            <div
              v-for="(item,index) in articleForm.cover.images"
              @click="showUpload(index)"
              class="single-img"
              :key="index"
            >
              <img :src="item ? item : defaultImg " alt />
            </div>
          </div>
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
    <el-dialog :visible="showUploadDialog" @close="showUploadDialog = false">
      <img-upload :selectImgProps="selectImgProps"></img-upload>
    </el-dialog>
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
        cover: {
          type: 1, // 封面类型
          images: ['', '', ''] // 封面
        }
      },
      articleId: null, // 当前的文章标识
      channels: [],
      showUploadDialog: false,
      changeImgIndex: 0, // 设置封面的索引 只针对3图时
      defaultImg: require('../../assets/pic_bg.png'),
      dataDirty: false
    }
  },
  // 计算属性
  computed: {
    firstCover () {
      return this.articleForm.cover.images[0]
        ? this.articleForm.cover.images[0]
        : this.defaultImg
    }
  },
  created () {
    this.loadChannels() // 拉取频道数据
    const { articleId } = this.$route.params
    if (articleId) {
      // 修改状态
      this.articleId = articleId // 赋值给当前的数据对象
      this.$http({
        method: 'get',
        url: `/articles/${articleId}`
      }).then(result => {
        this.articleForm = result.data
      })
    }
    this.watchForm()
  },
  methods: {
    // 监控formdata变化
    watchForm () {
      const unWatch = this.$watch('articleForm', () => {
        this.dataDirty = true // 设置数据标记
        unWatch()
      }, {
        deep: true
      })
    },
    selectImgProps (url) {
      // 传入url
      if (url) {
        this.articleForm.cover.images = this.articleForm.cover.images.map(
          (item, index) => {
            if (this.articleForm.cover.type === 1) {
              if (index === 0) {
                // 只是单图的情景下
                return url
              }
            } else if (this.articleForm.cover.type === 3) {
              if (index === this.changeImgIndex) {
                // 如果是3图的情景下
                return url
              }
            }
            return item
          }
        )
        this.showUploadDialog = false
      }
    },
    showUpload (index) {
      this.showUploadDialog = true
      this.changeImgIndex = index
    },
    loadChannels () {
      this.$http({
        methods: 'GET',
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 数据赋值给频道
      })
    },
    // 发布文章
    pubArticle (event, draft) {
      if (
        !this.articleForm.title ||
        this.articleForm.title.length < 5 ||
        this.articleForm.title.length > 30
      ) {
        this.$message({ type: 'warning', message: '文章标题至少五个字符' })
        return
      }
      if (!this.articleForm.content) {
        this.$message({ type: 'warning', message: '文章内容不能为空' })
        return
      }
      if (
        this.articleForm.cover.type === 1 ||
        this.articleForm.cover.type === 3
      ) {
        if (this.articleForm.cover.type === 1) {
          //  images第一个元素不能为空
          if (!this.articleForm.cover.images[0]) {
            this.$message({ type: 'warning', message: '封面不能为空' })
            return
          }
          this.articleForm.cover.images = [this.articleForm.cover.images[0]]
        }
        if (this.articleForm.cover.type === 3) {
          if (this.articleForm.cover.images.some(item => !item)) {
            this.$message({ type: 'warning', message: '封面不能为空' })
            return
          }
        }
      }
      if (!this.articleForm.channel_id) {
        this.$message({ type: 'warning', message: '发布频道不能为空' })
        return
      }
      this.$http({
        method: 'post',
        url: '/articles',
        data: this.articleForm,
        params: { draft: !!draft } // 是否为草稿
      }).then(result => {
        this.$router.push({ path: '/home/articles' })
      })
    },
    // 存入草稿 不需要校验
    saveArticle () {
      this.pubArticle(null, true) // 存为草稿
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (this.dataDirty) {
      // 说明有脏数据 需要保存
      const isLeave = window.confirm('您有数据未保存,确定离开?')
      if (isLeave) {
        // 需要保存
        return next()
      } else {
        return next(false)
      }
    } else {
      next()
    }
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
  .three-img {
    display: flex;
    flex-direction: row;
    .single-img {
      margin-left: 20px;
    }
    .single-img:nth-child(1) {
      margin-left: 0;
    }
  }
}
</style>
