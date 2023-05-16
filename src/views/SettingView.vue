<template>
  <div class="setting">
    <div class="head">
      <h1>设置</h1>
    </div>
    <div class="main">
      <h2 style="color: deepskyblue">
        1. 模型设置
      </h2>
      <!--标注人数-->
      <div class="item">
        <div class="left-box">
          <el-text class="mx-1" size="large">标注者人数</el-text>
        </div>
        <div class="right-box">
          <el-input-number v-model="setting.annoCnt" :min="1" @change="handleChange" />
        </div>
      </div>

      <!--分类的类别-->
      <div class="item">
        <div class="left-box">
          <el-text class="mx-1" size="large">类别数</el-text>
        </div>
        <div class="right-box">
          <el-input-number v-model="setting.typeCnt" :min="1" @change="handleChange" />
        </div>
      </div>


      <h2 style="color: deepskyblue">
        2. 训练设置
      </h2>

      <!--学习率-->
      <div class="item">
        <div class="left-box">
          <el-text class="mx-1" size="large">学习率</el-text>
        </div>
        <div class="right-box">
          <el-input-number v-model="setting.lr" :min="0.001" :step="0.001" @change="handleChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface SettingProps {
  annoCnt: number;
  typeCnt: number;
  lr: number;
}

const setting = ref<SettingProps>({
  annoCnt: 10,
  typeCnt: 5,
  lr: 0.001,
});

const handleChange = (value: number) => {
  console.log(setting.value)
}
</script>

<style>
@media (min-width: 1024px) {
  .setting {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-left: 15vh;
    padding-top: 25vh;
  }
}
.head {
  /*font-size: 38px;*/
}
.head h1 {
  padding-bottom: 3vh;
}
.item {
  display: flex;
  align-content: flex-start;
  padding-top: 1vh;
  padding-bottom: 1vh;
}

.left-box {
  width: 20vh;
}
</style>
