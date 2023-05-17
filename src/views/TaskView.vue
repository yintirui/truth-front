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
      <div class="item">
        <el-table v-loading="loading"
                  :data="tableData"
                  element-loading-text="正在解析数据集..."
                  height="250">
          <el-table-column prop="name" label="文件名" />
        </el-table>
      </div>

      <!--start task button -->
      <div class="item">
        <el-button type="primary" @click="startTask">开始任务</el-button>
      </div>
      <!--main end-->
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import type { UploadInstance } from 'element-plus'

const loading = ref(false)

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
    }, 1200);

    for(const d of data) {
      tableData.value.push({name: d});
    }
  }
}

const startTask = () => {
  // this.$http.get('/start').then((resp)=>{
  //   console.log(resp)
  // })
  // https://blog.csdn.net/qq_43318840/article/details/122247433
  console.log(task)
  axios.get(`http://localhost:5000/start?type=${task.value.taskName}`).then(resp => {
    console.log(resp);
  })
}

const getProgress = () => {
  this.$http.get('/getProgress').then(resp => {
      console.log(resp);
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
