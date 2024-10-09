<template>
    <div class="w-full h-[100dvh] bg-[#00000048] absolute z-10 flex justify-center items-center">
  
        <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-full"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-full"
        >
        <div v-show="show_modal" class="bg-white dark:bg-[#3D3D3D] dark:border-[#676767] p-6 rounded-lg shadow-lg w-[90dvw] sm:w-[480px]  2xl:w-[24dvw]">
            
            <div class="flex items-center justify-between w-full">
                <p class="text-[28px] leading-6 text-[#00C7A3]">แก้ไข Topic</p>

                <button class="flex items-center justify-center w-fit" @click="closeModal">
                    <font-awesome-icon 
                        :icon="['fas', 'xmark']"
                        class="text-[44px] lg:text-[44px] xl:text-[44px] 2xl:text-[48px] leading-5 text-[#606060] hover:text-[#000000] active:text-black dark:text-[#FEFEFE] dark:hover:text-[#b0b0b0] dark:active:text-black" 
                    />
                </button>
            </div>


            <div class="my-5 flex flex-col space-y-5">
                <input 
                    class="w-full px-4 py-1.5 shadow-inner shadow-black/15 border border-[#C2C2C2] rounded-md text-[20px] placeholder:font-light focus:outline-none"
                    v-model="topic_name"
                    placeholder="ชื่อ Topic"
                />

                <div class="flex flex-col w-full h-[240px] border border-[#C2C2C2] rounded-md  overflow-hidden">
                    <div class="w-full px-4 py-1 flex justify-between items-center">
                        <p class="text-[20px] text-[#606060]">รูปภาพ Topic</p>

                        <label for="fileUploadA" class="flex items-center justify-center px-2 py-0.5 bg-[#00C7A3] dark:bg-[#3DD6BA] hover:bg-[#199c80] active:bg-[#199c80] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3] rounded-md text-white text-[16px]">
                            อัพโหลด
                        </label>
                    </div>
                    <div class="w-full h-[240px] rounded-b-md shadow-inner shadow-black/15 overflow-hidden">
                        <label 
                            v-if="props.image_link === null && file === null && fileUrl === null"
                            class="w-full h-full flex justify-center items-center"
                            @drop.prevent="dragEnter"
                            for="fileUploadA"
                        >
                            <div class="flex flex-col select-none">
                                <font-awesome-icon :icon="['fas', 'images']" class="text-[48px] text-[#00C7A3]" />
                                <p class="text-[20px] "><span class="text-[#606060]">Drag & Drop or</span><span class="text-[#00C7A3] cursor-pointer"> Browse </span></p>
                                <p class="text-[12px] font-light text-[#202020] mx-auto">Support JPEG , PNG Image File</p>
                            </div>
                        </label>
                        <div v-else-if="fileUrl !== null" class="w-full h-full flex items-center justify-center">
                            <div class="cropper-wrapper">
                                <div :style="{backgroundImage : 'url(' + fileUrl + ')'}" class="image-background" ></div>
                            
                                <component :is="Cropper"
                                    class="w-full h-full"
                                    
                                    :src="fileUrl"
                                    :stencil-props="{
                                        aspectRatio: 1
                                    }"
                                    :canvas="{
                                        minHeight: 128,
                                        minWidth: 128,
                                        maxHeight: 256,
                                        maxWidth: 256,
                                    }"
                                    :resize-image="{
                                        adjustStencil: false,
                                        wheel: false
                                    }"
                                    ref="cropper"
                                />
                            </div>
                        </div>
                    </div>
                    <input type="file" id="fileUploadA" class="hidden" @change="chnageFile">
                </div>
            </div>

            <p v-if="error" class="text-[16px] text-red-600 mb-2">{{ error }}</p>

            <button @click="createTopic" class="w-full rounded-lg bg-[#00C7A3] dark:bg-[#3DD6BA] hover:bg-[#199c80] active:bg-[#199c80] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3] drop-shadow-md py-1">
                
                <span v-if="!loading" class="text-[24px] text-[#FEFEFE]">อัพเดต Topic</span>
                <div v-else class="mx-auto py-1 w-fit h-fit">
                    <svg  class=" animate-spin -ml-1 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </button>

        </div>
        </transition>
    </div>
  
</template>
  
<style>
.ease-custom {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<script setup lang="ts">
import {CircleStencil, Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const dayjs = useDayjs()
  
const props = defineProps<{
    show: boolean

    id: number,
    name: string,
    image_link: string|null
}>()

const { status, data } = useAuth()
  
const show_modal = ref<boolean>(false)
const loading = ref<boolean>(false)

const emit = defineEmits(['closeModal','refreshData'])
const closeModal = () => {
    show_modal.value = false
    setTimeout(() => {
      emit('closeModal')
    }, 300)
}

watch(() => props.show,async (value) => {
    show_modal.value = value
    if (value) {
        topic_name.value = props.name

        if (props.image_link) {
            const response = await fetch(props.image_link)

            const blob = await response.blob()
            fileUrl.value = URL.createObjectURL(blob)
        }else{
            fileUrl.value = null
        }

        file.value = null
    }else{
        topic_name.value = ''
        fileUrl.value = null
        file.value = null
        error.value = null
    }
})

//////////////////////// Drag & Drop ////////////////////////
const file = ref<File|null>(null)
const fileUrl = ref<string|null>(null)
const drag = ref<boolean>(false)
const dragEnter = (e: DragEvent) => {

    if (e.dataTransfer){
        file.value = e.dataTransfer.files[0]
        fileUrl.value = URL.createObjectURL(e.dataTransfer.files[0])
    }
}

const chnageFile = (e: Event) => {
    console.log("change file")
    const target = e.target as HTMLInputElement
    if (target.files){
    file.value = target.files[0]
    fileUrl.value = URL.createObjectURL(file.value)
    }

    //reset input file
    target.value = ''
}

onMounted(() => {
    window.addEventListener('dragenter', (e) => {
        e.preventDefault()
    })
    window.addEventListener('dragleave', (e) => {
        e.preventDefault()
    })
    window.addEventListener('drop', (e) => {
        e.preventDefault()
    })
    window.addEventListener('dragover', (e) => {
        e.preventDefault()
    })
})

/////////////////// create ///////////////////
const cropper = ref<any>(null);

const topic_name = ref<string>('')
const error = ref<string|null>(null)
async function createTopic(){
    //ดึงข้อมูลจากการ crop รูปภาพ
    if (!cropper.value) {
        console.error('Cropper not found');
        return;
    }
    if(loading.value) {
        return;
    }

    const { canvas } = cropper.value.getResult();

    const user_session:any = data.value
    //ส่งข้อมูลไปยัง API
    const config = useRuntimeConfig()

    const formData = new FormData()

    //ตรวจสอบว่ามีการเปลี่ยนแปลงรูปภาพ หรือ ชื่อ Topic หรือไม่
    if (!file.value && topic_name.value === props.name) {
        error.value = 'กรุณาเลือกรูปภาพหรือเปลี่ยนชื่อ Topic';
        return;
    }
    await canvas.toBlob(async (blob: any) => {

        if (file.value) {
            formData.append('topic_img', blob)
        }
        if (topic_name.value !== props.name) {
            formData.append('topic_name', topic_name.value)
        }



        loading.value = true
        try {
            const response = await fetch(config.public.backendApi+'/question/topic/'+props.id, {
                method: 'PATCH',
                headers: {
                    "Authorization": 'Bearer ' + user_session.sessionToken,
                },
                body: formData
            })

            const get_data = await response.json()
            if (response.status !== 200) {
                error.value = get_data.message;
                loading.value = false;
                return;
            }

        } catch (error:any) {
            error.value = error.response.status;
        }
        loading.value = false

        //refresh ข้อมูล
        canvas.remove();

        //ปิด Modal
        emit('refreshData')
        closeModal();
    }, 'image/png');

}
</script>
<style scoped>

.cropper-wrapper {
	overflow: hidden;
	position: relative;
    width: 100%;
    height: 100%;
}
.cropper-background {
	background: rgba(103, 103, 103, 0.1);
}
.image-background {
	position: absolute;
	height: 100%;
	left: 0;
	top: 0;
	background-size: cover;
	background-position: 50%;
	filter: blur(5px);
}

</style>