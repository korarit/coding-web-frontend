<template>
    <NuxtLayout name="dashboard" page_name="admin">
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
                <h1 class="text-4xl font-bold mb-4 dark:text-[#FEFEFE]">รายชื่อ Admin</h1>
                <button v-if="sessionData?.type_level === 3"
                    @click="addAdmin"
                    class="flex items-center justify-center px-8 py-1 bg-red-500 hover:bg-red-600 border border-red-700 text-2xl text-[#FEFEFE] rounded-md">
                    เพิ่ม Admin
                </button>
            </div>

            <div class="flex-auto border-t border-x border-gray-600 pt-10 px-12 mt-8 pb-8 rounded-t-lg min-h-full">

                <div class="grid xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    <div class=" bg-[#FEFEFE] w-full rounded-xl border-[#BABABA] border drop-shadow-md p-4" v-for="(data, index) in admin_data">
                        <div class="flex items-center space-x-3 mb-3">
                            <div class="h-14 w-14 bg-gray-600 overflow-hidden rounded-full drop-shadow-md ">
                                <img v-if="data.profile_img" v-show="status_image[index] == false" @error="status_image[index] = true" :src="'https://pub-3d57d68059384f598b7ac0875ccf93db.r2.dev/profile/'+data.profile_img" alt="topic" class="h-full w-full object-cover">
                                <div v-show="status_image[index] == true || data.profile_img === null" class="flex w-full h-full items-center justify-center">
                                    <font-awesome-icon :icon="['far','image']" class="text-white text-[36px]" />
                                </div>
                            </div>
                            <p class="text-xl font-semibold dark:text-[#FEFEFE]">
                                {{ data.name }}
                            </p>
                        </div>
                        <p class="text-lg dark:text-[#FEFEFE]" v-if="data.type_level === 2">
                            Admin ( จัดการโจทย์ได้ )
                        </p>
                        <p class="text-lg dark:text-[#FEFEFE]" v-else-if="data.type_level === 3">
                            Super Admin ( จัดการโจทย์ และ Admin ได้ )
                        </p>

                        <div class="grid grid-cols-2 gap-4 mt-4" v-if="sessionData?.type_level === 3">
                            <button
                                @click="editLevelUser(data.user_id, data.name, data.type_level)"
                                class="w-full flex items-center justify-center px-8 py-1 bg-[#00C7A3] hover:bg-[#32b29a] border border-[#00B191] text-[16px] font-semibold text-[#FEFEFE] rounded-xl">
                                แก้ไขระดับ
                            </button>

                            <button
                                @click="openModeldeleteCofirm(data.user_id, data.name)"
                                class="w-full flex items-center justify-center px-8 py-1 bg-red-500 hover:bg-red-600 border border-red-700 text-[16px] font-semibold text-[#FEFEFE] rounded-xl">
                                ลบ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="openAddAdmin" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalAddAdmin 
                @closeModal="closeModaladdAdmin"
                @refresh-data="load_topic"
                :show="openAddAdmin"
            />
        </div>

        <div v-show="openEditAdmin" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalEditAdmin
                @closeModal="closeModalEditLevel"
                @refresh-data="load_topic"
                :show="openEditAdmin"

                :name="editUserName"
                :level="editLevel"
                :user_id="editUserId"
            />
        </div>

        <div v-show="openCofirmDelete" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalComfirm 
                @closeModal="closeModalDelete"
                @comfirm="DeleteAdminById()"
                :show="showConfirm"

                :message="'คุณต้องการยกเลิกสิทธิ์การเป็น Admin ของ '+seleteNameDelete+' ใช่หรือไม่ ?'"
                icon="warning"

                :loading="loadingDelete"
                loadingMessage="กำลังยกเลิกสิทธิ์การเป็น Admin . . ."

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

const admin_data = ref<any>(null)
const status_image = ref<boolean[]>([])
const load_topic = async () => {
    try {

        const user_session:any = data.value
        const response = await fetch(config.public.backendApi+'/admin/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_session.sessionToken
            }
        })

        if (response.status !== 200) {
            error_code.value = response.status
            return
        }
        
        const get_data = await response.json()
        admin_data.value = get_data.data.admin_list

        get_data.data.admin_list.forEach((data: any, index: number) => {
            status_image.value[index] = false
        });

    } catch (error:any) {
        console.log(error)
    }
    loading_all.value = false
}

onMounted(() => {
    load_topic()
})

const {open_modal, close_modal} = useModalControl()

//////////////////////////////////// Add Admin  ////////////////////////////////////
const openAddAdmin = ref<boolean>(false)

const addAdmin = () => {
    openAddAdmin.value = true
    open_modal()
}

const closeModaladdAdmin = () => {
    openAddAdmin.value = false
    close_modal()
}

//////////////////////////////////// Edit Admin Level  ////////////////////////////////////
const openEditAdmin = ref<boolean>(false)

const editUserId = ref<number>(0)
const editLevel = ref<number>(0)
const editUserName = ref<string>('')
const editLevelUser = (id:number, name:string, level:number) => {
    editUserId.value = id
    editUserName.value = name
    editLevel.value = level
    
    openEditAdmin.value = true
    open_modal()
}

const closeModalEditLevel = () => {
    openEditAdmin.value = false
    close_modal()
}

//////////////////////////////////// Delete Topic  ////////////////////////////////////
const openCofirmDelete = ref<boolean>(false)
const showConfirm = ref<boolean>(false)

const loadingDelete = ref<boolean>(false)

const selectUserDelete = ref<number>(0)
const seleteNameDelete = ref<string>('')
const openModeldeleteCofirm = (id:number, name: string) => {

    selectUserDelete.value = id
    seleteNameDelete.value = name

    openCofirmDelete.value = true
    showConfirm.value = true

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

const DeleteAdminById = async () => {
    
    
    const user_session:any = data.value
    loadingDelete.value = true
    try {
        const response = await fetch(config.public.backendApi+'/admin', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+user_session.sessionToken,
            },
            body: JSON.stringify({user_id: selectUserDelete.value})
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