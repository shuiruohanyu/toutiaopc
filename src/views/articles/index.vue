<template>
  <el-card class="articles-list">
    <div class="articles-title">全部图文</div>
    <div class="articles-tool">
      <el-form>
        <!-- 多状态 -->
        <el-form-item label="文章状态" label-width="100px">
          <a
            @click="changeStatus(item.value)"
            class="state-label"
            href="javascript:void(0)"
            v-for="item in state"
            :key="item.value"
          >{{item.label}}</a>
        </el-form-item>
        <el-form-item label="频道列表" label-width="100px">
          <el-select @change="queryData" v-model="searchTool.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择" label-width="100px">
          <el-date-picker
            @change="queryData"
            v-model="searchTool.dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <div slot="header" class="list-header">共找到{{pageInfo.total}}条内容</div>
      <el-table :data="articles" v-loading="loading">
        <el-table-column>
          <!-- 表格列默认只能输出文本，如果需要自定义里面的内容，则需要 -->
          <!--
            slot-scope 是插槽作用域，现在先听个名词，你要知道的是值 scope 是起的一个名字
            scope 中有个成员叫 row
            也就是说 scope.row 就是当前的遍历项对象
            自定义列模板，el-table-column 的 prop 就没有意义了
          -->
          <template slot-scope="scope">
            <div class="cover-info">
              <img class="cover" :src="scope.row.cover.images[0]" alt />
              <div class="info">
                <span>{{scope.row.title}}</span>
                <span class="status">{{scope.row.status | filterStatus}}</span>
                <span class="date">{{scope.row.pubdate}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="item">
            <i @click="delItem(item.row.id)" class="el-icon-delete operate">删除</i>
            <i class="el-icon-edit operate">修改</i>
          </template>
        </el-table-column>
      </el-table>
      <!-- 加入分页组件 -->
      <div class="pagination">
        <el-pagination
          :disabled="pageDisabled"
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      state: [
        {
          label: '全部',
          value: 5
        },
        {
          label: '草稿',
          value: 0
        },
        {
          label: '待审核',
          value: 1
        },
        {
          label: '审核通过',
          value: 2
        },
        {
          label: '审核失败',
          value: 3
        }
      ],
      channels: [
        {
          value: 'c++',
          label: 'c++'
        },
        {
          value: 'java',
          label: 'java'
        }
      ],
      searchTool: {
        channel_id: null,
        dateRange: null,
        channel: null
      },
      articles: [],
      pageInfo: {
        page: 1, // 第几页
        pageNum: 10, // 每页显示多少条
        total: 0, // 共多少条记录
        pageDisabled: false // 是否禁用分页组件
      },
      loading: false
    }
  },
  // 请求列表数据
  created () {
    this.loadData()
  },
  methods: {
    delItem (id) {
      // 删除方法
      // 如果点击了确定 则会进入到then
      this.$confirm('确定删除此条记录?', '提示').then(() => {
        this.$http.delete(`/articles/${id}`).then(result => {
          this.loadData() // 刷新页面数据
        })
      })
    },
    // 请求数据
    loadData (params) {
      this.pageInfo.pageDisabled = true
      this.loading = true
      this.$http({
        methods: 'GET',
        url: 'articles',
        params: {
          page: this.pageInfo.page,
          per_page: this.pageInfo.pageNum,
          ...params
        }
      }).then(result => {
        this.articles = result.data.results
        this.pageInfo.total = result.data.total_count // 将总条数赋值给当前数据对象
        this.pageInfo.pageDisabled = false
        this.loading = false
      })
    },
    changePage (newPage) {
      this.pageInfo.page = newPage // 将最新的页码赋值给数据对象
      this.loadData()
    },
    // 查询条件改变 需要查询数据
    queryData () {
      let params = {} // 拼接参数
      if (this.searchTool.dateRange && this.searchTool.dateRange.length) {
        params = {
          begin_pubdate: this.searchTool.dateRange[0],
          end_pubdate: this.searchTool.dataRange[1]
        }
      }
      params.channel_id = this.searchTool.channel_id
      params.status = this.searchTool.status
      this.loadData(params)
    },
    // 状态改变
    changeStatus (status) {
      this.searchTool.status = status // 状态赋值
      this.queryData() // 查询数据
    }
  },
  // 定义过滤器
  filters: {
    // 筛选过滤数据
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已发表'
        case 5:
          return '全部'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.articles-list {
  min-height: 100%;
  .articles-title {
    background-color: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    padding-left: 20px;
    border-bottom: 1px dashed #ccc;
  }
  .articles-tool {
    background-color: #fff;
    padding: 50px 20px;
    .state-label {
      margin-left: 20px;
    }
  }
  .cover-info {
    display: flex;
    flex-direction: row;
    .cover {
      width: 150px;
      height: 100px;
    }
    .info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .status {
        background-color: rgba(64, 158, 255, 0.1);
        padding: 0 10px;
        height: 32px;
        line-height: 30px;
        font-size: 12px;
        color: #409eff;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid rgba(64, 158, 255, 0.2);
        white-space: nowrap;
      }
      .date {
        font-size: 12px;
        margin: 5px 0;
        color: #999;
      }
    }
  }
  .operate {
    color: #333;
    font-size: 12px;
    cursor: pointer;
    margin-left: 10px;
    float: right;
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
