<template>
    <NuxtLayout name="dashboard" page_name="topics">
        <div v-show="loading_all" class="flex justify-between items-center h-full">
            <div class="mx-auto flex items-center">
                <svg class=" animate-spin -ml-1 mr-4 h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                    </circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <p class="text-[28px]">
                    Loading . . .
                </p>
            </div>
        </div>
        <div v-show="error_code != null && !loading_all" class=" h-full flex justify-center items-center">
            <div class="mx-auto flex items-center space-x-4">
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[72px] text-red-600" />
                <p class="text-[28px]">
                    เกิดข้อผิดพลาด HTTP {{ error_code }}
                </p>
            </div>
        </div>
        <div v-show="!loading_all && error_code == null" class="w-full flex flex-col min-h-full max-h-fit ">
            <div class="flex-none flex justify-between items-center">
                <h1 class="text-4xl font-bold mb-4 dark:text-[#FEFEFE]">รายการ Topic</h1>
                <button
                    @click="createTopic"
                    class="flex items-center justify-center px-8 py-1 bg-red-500 hover:bg-red-600 border border-red-700 text-2xl text-[#FEFEFE] rounded-md">
                    เพิ่ม Topic
                </button>
            </div>

            <div class="flex-auto border-t border-x border-gray-600 pt-10 px-12 mt-8 pb-8 rounded-t-lg min-h-full">

                <div class="grid xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                    <div class="bg-[#FEFEFE] w-full rounded-xl border-[#BABABA] border drop-shadow-md p-4" v-for="(data, index) in topic_data">
                        <div class="flex items-center space-x-2 mb-6">
                            <div class="h-12 w-12 bg-gray-600">
                                <img v-if="data.image_link" v-show="status_image[index] == false" @error="status_image[index] = true" :src="data.image_link" alt="topic" class="h-full w-full object-cover">
                                <div v-show="status_image[index] == true || data.image_link === null" class="flex w-full h-full items-center justify-center">
                                    <font-awesome-icon :icon="['far','image']" class="text-white text-[36px]" />
                                </div>
                            </div>
                            <p class="text-xl font-semibold dark:text-[#FEFEFE]">
                                {{ data.name }}
                            </p>
                        </div>
                        <p class="text-lg dark:text-[#FEFEFE] mb-4">
                            มีโจทย์ในหัวข้อ {{ data.count_question }} โจทย์
                        </p>

                        <div class="grid grid-cols-2 gap-4">
                            <button
                                @click="editTopic(data.id, data.name, data.image_link)"
                                class="w-full flex items-center justify-center px-8 py-1 bg-[#00C7A3] hover:bg-[#32b29a] border border-[#00B191] text-[16px] font-semibold text-[#FEFEFE] rounded-xl">
                                แก้ไข
                            </button>

                            <button
                                @click="openModeldeleteCofirm(data.id)"
                                class="w-full flex items-center justify-center px-8 py-1 bg-red-500 hover:bg-red-600 border border-red-700 text-[16px] font-semibold text-[#FEFEFE] rounded-xl">
                                ลบ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="openCreateTopic" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalCreateTopic 
                @closeModal="closeModal"
                @refresh-data="load_topic"
                :show="openCreateTopic"
            />
        </div>

        <div v-show="openEditTopic" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalEditTopic 
                @closeModal="closeModalEditTopic"
                @refresh-data="load_topic"
                :show="openEditTopic"

                :name="editTopicName"
                :image_link="editTopicImage"
                :id="editTopicId"
            />
        </div>

        <div v-show="openCofirmDelete" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalComfirm 
                @closeModal="closeModalDelete"
                @comfirm="DeleteTopicById()"
                :show="showConfirm"

                message="คุณต้องการลบ Topic นี้ใช่หรือไม่ ?"
                icon="warning"

                :loading="loadingDelete"
                loadingMessage="กำลังลบ Topic . . ."

            />
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">

//////////////////////////////////// Auth  ////////////////////////////////////

definePageMeta({
    auth: true
})
const { status, data } = useAuth()

const sessionData = ref<any>(null)

const router = useRouter()
onMounted(() => {
    if (status.value === 'authenticated' && data.value) {
        let user_session: any = data.value;
        if (user_session?.type_level < 2) {
            router.push('/')
        }else{
            sessionData.value = user_session
        }
    }else{
        router.push('/')
    }
})

//////////////////////////////////// Data Loading  ////////////////////////////////////
const loading_all = ref<boolean>(true)
const error_code = ref<number|null>(null)

const config = useRuntimeConfig()

const topic_data = ref<any>([])
const status_image = ref<boolean[]>([])
const load_topic = async () => {
    try {

        const response = await fetch(config.public.backendApi+'/question/topic', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.status !== 200) {
            error_code.value = response.status
            return
        }
        
        const get_data = await response.json()
        topic_data.value = get_data.data.topic_list

        get_data.data.topic_list.forEach((data: any, index: number) => {
            status_image.value[index] = false
        });

    } catch (error:any) {
        error_code.value = error.response.status
    }
    loading_all.value = false
}

onMounted(() => {
    load_topic()
})

const {open_modal, close_modal} = useModalControl()

//////////////////////////////////// Create Topic  ////////////////////////////////////
const openCreateTopic = ref<boolean>(false)

const createTopic = () => {
    openCreateTopic.value = true
    open_modal()
}

const closeModal = () => {
    openCreateTopic.value = false
    close_modal()
}

//////////////////////////////////// Edit Topic  ////////////////////////////////////
const openEditTopic = ref<boolean>(false)

const editTopicId = ref<number>(0)
const editTopicName = ref<string>('')
const editTopicImage = ref<string|null>(null)
const editTopic = (id:number, name:string, image_link:string|null) => {
    editTopicId.value = id
    editTopicName.value = name
    editTopicImage.value = image_link
    openEditTopic.value = true
    
    open_modal()
}

const closeModalEditTopic = () => {
    openEditTopic.value = false
    close_modal()
}

//////////////////////////////////// Delete Topic  ////////////////////////////////////
const openCofirmDelete = ref<boolean>(false)
const showConfirm = ref<boolean>(false)

const loadingDelete = ref<boolean>(false)

const selectTopicDelete = ref<number>(0)
const openModeldeleteCofirm = (id:number) => {
    openCofirmDelete.value = true
    showConfirm.value = true
    selectTopicDelete.value = id
    open_modal()
}

const closeModalDelete = () => {
    showConfirm.value = false
    loadingDelete.value = false

    setTimeout(() => {
        openCofirmDelete.value = false
    }, 300);
    close_modal();
}

const DeleteTopicById = async () => {
    
    
    const user_session:any = data.value
    loadingDelete.value = true
    try {
        const response = await fetch(config.public.backendApi+'/question/topic/'+selectTopicDelete.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+user_session.sessionToken,
            }
        })

        if (response.status !== 200) {
            error_code.value = response.status
            loadingDelete.value = false
            return
        }

        if (response.status === 200) {
            closeModalDelete()
            load_topic()
        }
    } catch (error:any) {
        console.log(error)
    }

}


</script>