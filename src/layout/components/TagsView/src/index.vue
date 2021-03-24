<script>
import ScrollPane from '@/components/ScrollPane'
const TagItem = {
  inject: ['layout', 'TagsView'],
  props: {
    tag: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      active: false
    }
  },
  computed: {
    path() {
      return this.tag.path
    },
    title() {
      return this.tag.text || this.tag.name
    }
  },
  methods: {
    setActive(flag) {
      this.active = !!flag
    },
    handleclose(event) {
      event.preventDefault()
      event.stopPropagation()
      this.TagsView.closeSelectedTag(this.tag)
    },
    handleclick() {
      this.TagsView.$emit('tagChange', this.tag)
    }
  },
  mounted() {
    this.TagsView.addTag(this)
  },
  // eslint-disable-next-line
  render(h) {
    return (
      <a on-click={this.handleclick} class={{ active: this.active && this.layout.showEmpty !== true }}>
        {this._v(this.title)}
        <span style={this.path !== '/dashboard'} class="el-icon-close" on-click={this.handleclose}></span>
      </a>
    )
  }
}

export default {
  components: {
    ScrollPane,
    TagItem
  },
  inject: ['layout'],
  provide() {
    return {
      TagsView: this
    }
  },
  data() {
    return {
      visitedViews: [],
      tagItems: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // TagsView 记录 route meta
          if (this.$route.meta && this.$route.meta.addTag !== false) {
            this.addViewTags(
              Object.assign(this.$route.meta, {
                name: this.$route.name,
                path: this.$route.path
              })
            )
          }
          this.setCurrentTag()
        })
      }
    }
  },
  methods: {
    /**
     * TagItem mounted 调用
     * @param tag vnode
     */
    addTag(tag) {
      this.tagItems.push(tag)
    },
    /**
     * TagItem beforeDestory 调用
     * @param tag vnode
     */
    removeTag(tag) {
      for (let i = 0, path = tag.path, len = this.tagItems.length; i < len; i++) {
        if (path === this.tagItems[i].path) {
          this.tagItems[i] = null
          this.tagItems.splice(i, 1)
          break
        }
      }
    },
    /**
     *  增加 visitedView
     */
    addViewTags(view) {
      if (!view) {
        return false
      }
      let hasView = false
      for (let i = 0, len = this.visitedViews.length; i < len; i++) {
        const _view = this.visitedViews[i]
        if (_view.path === view.path) {
          hasView = true
          this.visitedViews[i] = view
          break
        }
      }
      if (!hasView) {
        this.visitedViews.push(view)
      }
    },
    /**
     *  删除 visitedView
     */
    removeViewTag({ path }) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === path) {
          this.visitedViews.splice(i, 1)
          if (path === this.$route.path) {
            /**
             * 关闭的是激活的 tag, 激活上一个tag,如果上一个没有看有没有下一个tag, 存在就跳转到对应路由,不存在就跳转到根路由
             */
            this.$emit('tagChange', this.visitedViews[Math.max(i - 1, 0)] || { id: 0, url: '/' })
          }
          break
        }
      }
    },
    setCurrentTag() {
      this.$nextTick(() => {
        if (!this.tagItems.length) {
          return
        }
        const trailingSlashRE = /\/?$/
        const route = this.$route
        // 查找path相同的tag
        let tags = this.tagItems.filter(tag => {
          tag.setActive(false)
          return tag.path === route.path
        })

        // 没有找到path相同的tag,尝试查找path的父tag
        if (!tags.length) {
          tags = this.tagItems
            .filter(tag => {
              return route.path.replace(trailingSlashRE, '/').indexOf(tag.path.replace(trailingSlashRE, '/')) === 0
            })
            .sort((a, b) => {
              // 路径最长的父tag排前面
              const aLen = a.path.replace(trailingSlashRE, '/').length
              const bLen = b.path.replace(trailingSlashRE, '/').length
              return aLen > bLen ? -1 : aLen < bLen ? 1 : 0
            })
        }
        if (tags[0]) {
          tags[0].setActive(true)
          this.$refs.scrollPane.moveToTarget(tags[0].$el)
        }
      })
    },
    closeSelectedTag(tag) {
      const { name, path, key } = tag
      /**
       * 清理keeplive缓存
       */
      this.layout.removeKeepaliveCacheByKey(key, name, path)
      /**
       * 清理tag标签
       */
      this.removeViewTag(tag)
      /**
       *  清理 tagItem component
       */
      this.removeTag(tag)
    }
  },
  // eslint-disable-next-line
  render(h){
    return (
      <div class="tags-view-container">
        <ScrollPane class="tags-view-wrapper" ref="scrollPane">
          {this._l(this.visitedViews, tag => {
            return (
              <TagItem class="tags-view-item" tag={tag} key={tag.path}>
                {' '}
              </TagItem>
            )
          })}
        </ScrollPane>
      </div>
    )
  },
  beforeDestroy() {
    this.visitedViews.forEach(tag => {
      this.removeTag(tag)
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.tags-view-container {
  .tags-view-wrapper {
    background: #eef1f6;
    height: 40px;
    // border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 30px;
      line-height: 30px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 10px;
      margin-top: 10px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #409eff;
        color: #fff;
        border-color: #409eff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>
