<template>
    <Transition enter-active-class="transition ease-out duration-500" enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-500"
        leave-from-class="opacity-100 translate-y-full" leave-to-class="opacity-0 -translate-y-1">
        <div v-show="show_modal" class="w-dvw p-2 h-fit">
            <div class="bg-[#ffffff] dark:bg-[#2d2d2d] rounded-lg px-2 pt-1.5 pb-3 border border-[#C1C1C1] dark:border-[#202020] drop-shadow-md">
                <div class="flex flex-col space-y-3 w-full min-w-[220px]">
                    <div class="flex justify-between items-center">
                        <div class="flex space-x-4  items-center">
                            <div
                                class="w-[38px] h-[38px] rounded-full bg-[#00C7A3] overflow-hidden flex items-center justify-center">
                                <img src="/logo-web-coding.png" class="w-full h-full object-cover" />
                            </div>
                            
                            <p class="text-[20px] text-[#262626] dark:text-[#FEFEFE] font-medium">Coding With Me</p>
                        </div>

                        <button @click="show_modal = false" class="text-[36px] flex items-center justify-center h-[32px] text-[#606060] hover:text-[#262626]">
                            <IconClose color="#262626" dark-color="#FEFEFE" :size="36" />
                        </button>
                    </div>

                    <NuxtLink to="/user" class="flex px-1 space-x-3 items-center text-[#606060] dark:text-[#FEFEFE] hover:text-[#262626]">
                        <p class="text-[20px] font-light">หน้าหลัก</p>
                    </NuxtLink>


                    <NuxtLink to="/collection" class="flex px-1 space-x-3 items-center text-[#606060] dark:text-[#FEFEFE] hover:text-[#262626]">
                        <p class="text-[20px] font-light">โจทย์</p>
                    </NuxtLink>

                    <NuxtLink to="/ranking" class="flex px-1 space-x-3 items-center text-[#606060] dark:text-[#FEFEFE] hover:text-[#262626]">
                        <p class="text-[20px] font-light">อันดับ</p>
                    </NuxtLink>

                    <div class="flex space-x-2 overflow-x-auto" v-if="loginStatus">

                        <NuxtLink to="/notication" class="flex-shrink-0 flex flex-col space-y-1 items-center p-2 bg-gray-100 dark:bg-[#262626] text-[#464545] dark:text-[#dedddd] hover:text-[#262626] active:text-[#262626] rounded-md border border-gray-300 dark:border-[#1c1c1c] drop-shadow-sm">
                            <div class="w-[48px] h-fit flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'bell']" class="text-[36px] " />
                            </div>
                            <p class="text-[14px]">แจ้งเตือน</p>
                        </NuxtLink>

                        <NuxtLink to="/profile" class="flex-shrink-0 flex flex-col space-y-1 items-center p-2 bg-gray-100 dark:bg-[#262626] text-[#464545] dark:text-[#dedddd] hover:text-[#262626] active:text-[#262626] rounded-md border border-gray-300 dark:border-[#1c1c1c] drop-shadow-sm">
                            <div class="w-[48px] h-fit flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'circle-question']" class="text-[36px] " />
                            </div>
                            <p class="text-[14px]">บันทึกทำโจทย์</p>
                        </NuxtLink>

                        <NuxtLink to="/like-question" class="flex-shrink-0 flex flex-col space-y-1 items-center p-2 bg-gray-100 dark:bg-[#262626] text-[#464545] dark:text-[#dedddd] hover:text-[#262626] active:text-[#262626] rounded-md border border-gray-300 dark:border-[#1c1c1c] drop-shadow-sm">
                            <div class="w-[48px] h-fit flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'book-bookmark']" class="text-[36px] " />
                            </div>
                            <p class="text-[14px]">โจทย์ที่ถูกใจไว้</p>
                        </NuxtLink>

                        <NuxtLink to="/ranking" class="flex-shrink-0 flex flex-col space-y-1 items-center p-2 bg-gray-100 dark:bg-[#262626] text-[#464545] dark:text-[#dedddd] hover:text-[#262626] active:text-[#262626] rounded-md border border-gray-300 dark:border-[#1c1c1c] drop-shadow-sm">
                            <div class="w-[48px] h-fit flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'award']" class="text-[36px] " />
                            </div>
                            <p class="text-[14px]">ลำดับภายในเว็บ</p>
                        </NuxtLink>

                    </div>

                    <button v-if="loginStatus === false" @click="$emit('loginOpen')" class="flex space-x-3 items-center bg-[#606060] text-[#FEFEFE] hover:bg-[#303030] py-1.5 px-2 rounded-md">
                        <div class="w-[48px] h-fit flex items-center justify-center">
                            <font-awesome-icon :icon="['fas', 'right-to-bracket']" class="text-[24px] " />
                        </div>
                        <p class="text-[18px]">เข้าสู่ระบบ</p>
                    </button>

                    <div class="flex space-x-3 items-center"  v-if="loginStatus">
                        <div class="w-[44px] h-[44px] rounded-full bg-[#00C7A3] overflow-hidden flex items-center justify-center">
                            <img v-if="data?.profile_img != null" :src="data?.profile_img" class="w-full h-full object-cover" />
                            <p v-else class="text-[36px] text-[#FEFEFE]">{{ data?.name[0].toUpperCase() }}</p>
                        </div>
                        <p class="text-[20px] text-[#262626] dark:text-[#FEFEFE] font-medium">{{ data?.name }}</p>
                    </div>

                    <div v-if="loginStatus" class="bg-[#d3d1d1] dark:bg-[#FEFEFE] h-[0.5px] w-full"></div>


                    <button @click="toggleDarkMode" class="flex space-x-3 items-center bg-[#606060] dark:bg-[#262626] text-[#FEFEFE] hover:bg-[#303030] py-1.5 px-2 rounded-md border border-gray-300 dark:border-[#1c1c1c]">
                        <div class="w-[48px] h-fit flex items-center justify-center">
                            <font-awesome-icon :icon="['fas', 'moon']" class="text-[24px] " v-if="!isDarkMode" />
                            <font-awesome-icon :icon="['fas', 'sun']" class="text-[24px] " v-else />
                        </div>
                        <p class="text-[18px]" v-if="!isDarkMode" >ตั้งเป็นโหมดกลางคืน</p>
                        <p class="text-[18px]" v-else>ตั้งเป็นโหมดกลางวัน</p>
                    </button>

                    <NuxtLink v-if="loginStatus" to="/user" class="flex space-x-3 items-center bg-[#606060] dark:bg-[#262626] text-[#FEFEFE] hover:bg-[#303030] py-1.5 px-2 rounded-md border border-gray-300 dark:border-[#1c1c1c]">
                        <div class="w-[48px] h-fit flex items-center justify-center">
                            <font-awesome-icon :icon="['fas', 'gear']" class="text-[24px] " />
                        </div>
                        <p class="text-[18px]">ตั้งค่าบัญชี</p>
                    </NuxtLink>

                    <button  v-if="loginStatus" @click="() => signOut" title="logout" class="flex space-x-3 items-center bg-red-500 text-[#FEFEFE] hover:bg-red-600 py-1.5 px-2 rounded-md">
                        <div class="w-[48px] h-fit flex items-center justify-center">
                            <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-[24px] " />
                        </div>
                        <p class="text-[18px]">ออกจากระบบ</p>
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">

const props = defineProps({
    show: Boolean,
    data: Object,
    loginStatus: Boolean
})

const show_modal = ref(false)

watch(() => props.show, (val) => {
    if (val) {
        show_modal.value = true
    } else {
        show_modal.value = false
    }
})

const { signOut } = useAuth()



const $emit = defineEmits(['loginOpen', 'darkTheme'])

const isDarkMode = defineModel('DarkTheme',{
    type: Boolean,
    default: false
})
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    $emit('darkTheme', status)
    localStorage.setItem('darkMode', status.toString())
}

</script>