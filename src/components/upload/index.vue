<template>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="全部素材" name="material">
      <div class="material-list">
        <div class="img-item" v-for="item in list" :key="item.id">
          <img @click="selectImg(item.url)" :src="item.url" alt />
        </div>
      </div>
      <div class="pagination" style="text-align:center">
        <el-pagination
          @current-change="changePage"
          :current-page="pageInfo.page"
          :page-size="pageInfo.pageNum"
          class="article-page"
          background
          layout="prev, pager, next"
          :total="pageInfo.total"
        ></el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :http-request="handleUpload"
          list-type="picture-card"
        action=''
      >
        <i class="el-icon-plus"></i>

      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      pageInfo: {
        page: 1,
        pageNum: 8,
        total: 0
      }
    }
  },
  props: ['selectImgProps'],
  methods: {
    handleUpload (params) {
      const formData = new FormData()
      formData.append('image', params.file)
      this.$http({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then(result => {
        this.selectImgProps && this.selectImgProps(result.data.url)
      })
    },
    selectImg (url) {
      //  传入url
      this.selectImgProps && this.selectImgProps(url)
    },
    changePage (newPage) {
      this.pageInfo.page = newPage
      //  请求数据
      this.loadData({
        page: this.pageInfo.page,
        per_page: this.pageInfo.pageNum
      })
    },
    loadData (params) {
      this.$http({
        method: 'get',
        url: '/user/images',
        params
      }).then(result => {
        this.list = result.data.results
        this.pageInfo.total = result.data.total_count
      })
    }
  },
  created () {
    this.loadData({
      page: this.pageInfo.page,
      per_page: this.pageInfo.pageNum
    })
  }
}
</script>

<style lang='less' scoped>
.material-list {
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .img-item {
    width: 150px;
    height: 150px;
    margin-left: 20px;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pagination {
    text-align: center;
  }
}
</style>
