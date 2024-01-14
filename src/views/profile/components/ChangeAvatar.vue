<template>
  <div class="overflow-hidden flex flex-col items-center">
    <svg-icon
      name="close"
      v-if="isMobileTerminal"
      class="w-3 h-3 p-0.5 ml-auto m-1"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></svg-icon>

    <img :src="blob" ref="imgRef" class="aspect-square" alt="" />

    <my-button
      class="mt-4 w-[80%] xl:w-1/2 bg-red-500 hover:bg-red-600 text-white dark:text-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-700"
      @click="onConfirmClick"
      >确定</my-button
    >
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { ref, onMounted } from 'vue'
import { getOSSClient } from '@/utils/sts.js'
import { message } from '@/libs'
import { useStore } from 'vuex'
import { putProfile } from '@/api/sys.js'

defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['close'])

// 关闭
const close = () => {
  emits('close')
}

// 通知服务器更新数据
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })

  //更新服务器数据
  await putProfile(store.getters.userInfo)
  // 通知用户
  message('success', '头像修改成功')
  // 关闭loading
  loading.value = false
  // 关闭dialog
  close()
}

// 进行OSS上传
let OSSClient = null
const store = useStore()
const putObjectToOSS = async (file) => {
  if (!OSSClient) {
    OSSClient = await getOSSClient()
  }
  try {
    /* 因为当前凭证只具备 images 文件夹下的访问权限，所以图片需要上传到 images/xxx.xx 。
    否则你将得到一个 
    AccessDeniedError: You have no right to access this object because of bucket acl. 的bug */
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`

    // 存放文件到bucket，文件路径 + 文件
    const res = await OSSClient.put(`images/${fileName}`, file)
    // 通知服务器
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e)
  }
}

let cropper = null
const imgRef = ref(null)
// 初始化cropper
onMounted(() => {
  // 接收两个参数，第一个DOM对象，第二个配置对象
  cropper = new Cropper(imgRef.value)
})
// 处理点击事件
const loading = ref(false)
const onConfirmClick = () => {
  loading.value = true
  // 获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    putObjectToOSS(blob)
  })
}
</script>
