<template>
  <div class=''>
      <el-card>
        <h1>富文本</h1>
        <el-divider></el-divider>
        <vue-wangeditor v-model="content" id="editor" width='100%' ref="editor"/>
        <el-button @click="getHtml" type="primary">获取内容</el-button>
        <el-button @click="setHtml" type="primary">设置内容</el-button>
      </el-card>
  </div>
</template>

<script>
// 导入
import vueWangeditor from 'vue-wangeditor';
export default {
  name: '',
  data(){
    return {
      content: `
      <h1>这是富文本</h1>
      `
    }
  },
  components: {
    //   注册组件
      vueWangeditor
  },
  methods: {
    getHtml() {
      const html = this.$refs.editor.getHtml();
      console.log(html);
    },
    setHtml() {
      this.$refs.editor.setHtml(`
          <h1>这是设置html</h1>
      `)
    }
  }
}
</script>
<style scoped>
</style>
