<template>
  <div class="comment">
    <content-header>
      <template slot="title">评论列表</template>
    </content-header>
    <el-table :data="comments" v-loading="loading" tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column width="120" prop="comment_status" label="评论状态">
        <template slot-scope="obj">
          {{
          obj.row.comment_status | commentStatus
          }}
        </template>
      </el-table-column>
      <el-table-column width="120" prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column width="120" prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column width="120" label="操作">
        <div class="comment-operate">
          <a href="javascript:void(0)">修改</a>
          <a href="javascript:void(0)">关闭评论</a>
        </div>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
export default {
  filters: {
    commentStatus (value) {
      return value ? '正常' : '关闭'
    }
  },
  data () {
    return {
      comments: [],
      loading: true,
      pageInfo: {
        page: 1,
        pageNum: 10,
        total: 0,
        pageDisabled: false
      }
    }
  },
  methods: {
    // 加载评论
    loadComment (params) {
      this.loading = true
      this.$http({
        methods: 'GET',
        url: '/articles',
        params
      }).then(result => {
        this.pageInfo.total = result.data.total_count // 赋值总条数
        this.pageInfo.pageDisabled = false
        this.loading = false
        this.comments = result.data.results
      })
    },
    changePage (newPage) {
      this.pageInfo.page = newPage
      this.loadComment({
        page: this.pageInfo.page,
        per_page: this.pageInfo.pageNum,
        response_type: 'comment'
      }) // 加载评论
    }
  },
  created () {
    this.loadComment({
      page: this.pageInfo.page,
      per_page: this.pageInfo.pageNum,
      response_type: 'comment'
    }) // 加载评论
  }
}
</script>

<style lang='less' scoped>
.comment {
  background-color: #fff;
  .pagination {
    padding: 40px 0;
    text-align: center;
  }
  .comment-operate {
    font-size: 12px;
    color: #3296fa;
    a {
      margin-left: 5px;
    }
  }
}
</style>
