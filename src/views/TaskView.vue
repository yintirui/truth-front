<template>
  <div class="task">
    <div class="head">
      <h1>任务</h1>
    </div>
    <div class="main">
      <!--main begin-->
      <!--task name-->
      <div class="item">
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="task.taskName" class="ml-4">
            <el-radio label="music" size="large">music</el-radio>
            <el-radio label="labelme" size="large">labelme</el-radio>
          </el-radio-group>
        </div>
      </div>

      <!--task name-->
      <div class="item">
        <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="http://localhost:5000/upload"
            :auto-upload="false"
            :on-success="handleUploadSuccess"
        >
          <template #trigger>
            <el-button style="margin-right: 2vh" type="primary">选择文件</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitUpload">
            上传
          </el-button>
        </el-upload>
      </div>

      <!--unzip filename list -->
      <div class="item" >
<!--           v-if="(tableData.length > 0) || (loading.value === true)">-->
        <el-table v-loading="loading"
                  :data="tableData"
                  element-loading-text="正在解析数据集..."
                  height="250">
          <el-table-column prop="name" label="文件名" />
        </el-table>
      </div>

      <!--start task button -->
<!--      TODO-->
<!--      <div class="item" v-if="tableData.length > 0">-->
      <div class="item">
        <el-button type="primary" @click="startTask">开始任务</el-button>
      </div>

      <div class="item" v-if="resShow"
           style="display: flex; flex-direction: column">
        <el-text class="mx-1" type="info">
          输出
        </el-text>

        <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="percentage"
            status="success"
        />
        <div>
          <div id="terminal"></div>
        </div>

      </div>

      <!--main end-->
    </div>
  </div>
</template>


<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import axios from 'axios'
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import type { UploadInstance } from 'element-plus'


const loading = ref(false)
const resShow = ref(false)
const percentage = ref<number>(0)

const tableData = ref<Array<{ name: string }>>([]);

interface TaskProps {
  taskName: string;
}

const task = ref<TaskProps>({
  taskName: 'music',
});

const uploadRef = ref<UploadInstance>()


const submitUpload = () => {
  uploadRef.value!.submit()
}

const handleUploadSuccess = (response, file, fileList) => {
  const code: number = response['code']
  const data: Array<string>= response['data']
  const msg: string = response['msg']
  if (code === 200) {
    tableData.value = [];
    loading.value = true;
    setTimeout(()=>{
      loading.value = false
      for(const d of data) {
        tableData.value.push({name: d});
      }
    }, 1200);
  }
}

function sleep(ms: number) {
  const start = Date.now();
  while (Date.now() - start < ms) {}
}
const term = new Terminal();
onMounted(()=>{
  setTimeout(()=>{
    document.getElementById('terminal')
    term.open(document.getElementById('terminal'));
  }, 1000)
})

const startTask = () => {
  resShow.value = true
  sleep(1000);

  axios.get(`http://localhost:5000/start?type=${task.value.taskName}`).then(
    async resp => {
      console.log(resp.data);
      while (percentage.value < 90) {
        await getProgress()
        sleep(500)
        console.log(percentage.value)
      }
      percentage.value = 100;
    })
}

interface progressProps {
  currentEpoch: number;
  totalEpochs: number;
  logs: Array<string>;
}

const pgInstance = ref<progressProps>({

});

const getProgress = async () => {
  await axios.get(`http://localhost:5000/getProgress`).then(resp => {
    console.log(resp.data);
    if (resp.data['code'] == 200) {
      pgInstance.currentEpoch = resp.data['data']['current']
      pgInstance.totalEpochs = resp.data['data']['epochs']
      pgInstance.logs = resp.data['data']['logs']
      percentage.value = Math.ceil(100 * pgInstance.currentEpoch / pgInstance.totalEpochs)
      for(const log: string of pgInstance.logs) {
        term.write(log+"\r\n")
      }
      // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    }
  })
}
</script>


<style>
@media (min-width: 1024px) {
  .task {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-left: 15vh;
    padding-top: 10vh;
  }
}
.left-box {
  width: 20vh;
}
</style>
