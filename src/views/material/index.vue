<template>
  <div class="material">
    <content-header>
      <template slot="title">素材管理</template>
    </content-header>
    <el-radio-group size="small" v-model="activeSelect" style="margin-top:20px" @change="changeTab">
      <el-radio-button label="all">全部</el-radio-button>
      <el-radio-button label="collect">收藏</el-radio-button>
    </el-radio-group>
    <el-card style="margin-top:20px">
      <div class="material-imgs">
        <div class="material-img" v-for="item in materialList" :key="item.id">
          <img :src="item.url" alt />
          <div v-if="activeSelect==='all'" class="img-operate">
            <img @click="collect(item)" :src="item.is_collected ? selectedImg : unselectImg" alt />
            <img @click="delItem(item)" src="../../assets/del.png" alt />
          </div>
        </div>
      </div>

      <div class="pagination">
        <el-pagination
          :disabled="pageInfo.pageDisabled"
          @current-change="changePage"
          :current-page="pageInfo.page"
          :page-size="pageInfo.pageNum"
          class="article-page"
          background
          layout="prev, pager, next"
          :total="pageInfo.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeSelect: 'all',
      materialList: [],
      pageInfo: {
        page: 1,
        pageNum: 10,
        total: 0,
        pageDisabled: false
      },
      selectedImg: require('../../assets/collect_select.png'),
      unselectImg: require('../../assets/collect.png')
    }
  },
  methods: {
    //   收藏
    collect (item) {
      this.$http({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(result => {
        this.loadAllMaterial({
          page: this.pageInfo.page,
          per_page: this.pageInfo.pageNum,
          collect: this.activeSelect === 'collect'
        })
      })
    },
    // 删除
    delItem (item) {
      this.$confirm('确定删除此素材吗', '提示').then(() => {
        return this.$http({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(result => {
          this.loadAllMaterial({
            page: this.pageInfo.page,
            per_page: this.pageInfo.pageNum,
            collect: this.activeSelect === 'collect'
          })
        })
      })
    },
    //  加载所有数据
    loadAllMaterial (params) {
      this.pageInfo.pageDisabled = true
      this.$http({
        method: 'get',
        url: '/user/images',
        params
      }).then(result => {
        this.pageInfo.pageDisabled = false
        this.pageInfo.total = result.data.total_count
        this.materialList = result.data.results
      })
    },
    changePage (newPage) {
      this.pageInfo.page = newPage
      this.loadAllMaterial({
        page: this.pageInfo.page,
        per_page: this.pageInfo.pageNum,
        collect: this.activeSelect === 'collect'
      })
    },
    changeTab () {
      this.loadAllMaterial({
        page: this.pageInfo.page,
        per_page: this.pageInfo.pageNum,
        collect: this.activeSelect === 'collect'
      })
    }
  },
  created () {
    this.loadAllMaterial({
      page: this.pageInfo.page,
      per_page: this.pageInfo.pageNum,
      collect: this.activeSelect === 'collect'
    })
  }
}
</script>

<style lang='less' scoped>
.material {
  padding: 20px;
  background-color: #fff;
  min-height: 100%;
  .pagination {
    padding: 40px 0;
    text-align: center;
  }
  .material-imgs {
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    .material-img {
      width: 150px;
      height: 150px;
      margin-top: 30px;
      margin-left: 30px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      .img-operate {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30px;
        background-color: #f4f5f6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
