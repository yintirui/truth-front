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
          <el-text class="mx-1" size="large">设备</el-text>
        </div>
        <div class="mb-2 flex items-center text-sm right-box">
          <el-radio-group v-model="setting.device" class="ml-4">
            <el-radio label="cpu" size="large">CPU</el-radio>
            <el-radio label="gpu" size="large">GPU</el-radio>
          </el-radio-group>
        </div>
      </div>

      <!--学习率-->
      <div class="item">
        <div class="left-box">
          <el-text class="mx-1" size="large">学习率</el-text>
        </div>
        <div class="right-box">
          <el-input-number v-model="setting.lr" :min="0.001" :step="0.001" @change="handleChange" />
        </div>
      </div>

      <!--epochs-->
      <div class="item">
        <div class="left-box">
          <el-text class="mx-1" size="large">迭代次数(epochs)</el-text>
        </div>
        <div class="right-box">
          <el-input-number v-model="setting.epochs" :min="1" :step="128" @change="handleChange" />
        </div>
      </div>

      <!--batch_size-->
      <div class="item">
        <div class="left-box">
          <el-text class="mx-1" size="large">批量大小(batch size)</el-text>
        </div>
        <div class="right-box">
          <el-input-number v-model="setting.batch_size" :min="1" :step="128" @change="handleChange" />
        </div>
      </div>

      <div class="item">
        <div class="left-box">
          <el-text class="mx-1" type="info">
            高级设置
          </el-text>
        </div>
        <el-switch v-model="diy" />
      </div>


      <div class="item" v-if="diy">
        <div class="left-box">
          <el-text class="mx-1" size="large">辅助网络embedding维度</el-text>
        </div>
        <div class="right-box">
          <el-input-number v-model="setting.emb_dim" :min="1" :step="128" @change="handleChange" />
        </div>
      </div>

      <el-button type="primary" @click="save">保存设置</el-button>
      <el-button type="success" @click="gotoTask">前往任务</el-button>
<!--   end   -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from "@/router";
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'


const diy = ref(true)

interface SettingProps {
  annoCnt: number;
  typeCnt: number;
  lr: number;
  emb_dim: number;
  epochs: number;
  batch_size: number;
  device: string;
}

const setting = ref<SettingProps>({
  annoCnt: 10,
  typeCnt: 5,
  lr: 0.001,
  emb_dim: 20,
  epochs: 1000,
  batch_size: 128,
  device: 'cpu',
});

const handleChange = (value: number) => {
  console.log(setting.value)
  console.log(1)
}
const save = () => {
  ElMessageBox.alert('消息已保存', '提示', {
    confirmButtonText: 'OK',
  })
}

const gotoTask = () => {
  router.push('/task');
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
