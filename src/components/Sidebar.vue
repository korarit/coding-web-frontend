<template>
    <div class="relative z-[999] h-dvh py-12 px-3 flex flex-col justify-between bg-[#00C7A3] dark:bg-[#3D3D3D] border-1 border-[#00C7A3] dark:border-[#252525] overflow-hidden transition-all duration-300 ease-in-out w-[72px] hover:w-64">
        <div class="flex flex-col space-y-4">
            
            <button class="flex items-center overflow-hidden transition-all duration-300 ease-in-out">
                <div class="flex-none flex items-center justify-center w-12 h-12">
                    <font-awesome-icon
                        :icon="['fas', 'bars']"
                        class="text-[#FFFFFF] dark:text-[#FEFEFE] text-[20px] xl:text-[28px] 2xl:text-[30px]"
                    />
                </div>
                <p class="2xl:text-[20px] text-[#FEFEFE] text-nowrap">Dashboard</p>
            </button>

            <hr class="border border-[#FFFFFF] dark:border-[#C8C8C8]" />

            <div class="flex flex-col max-w-full space-y-3">

                <NuxtLink to="/dashboard" :class="page_name === 'home' ? 'bg-[#252525] text-white' : 'bg-[#FFFFFF] hover:bg-[#252525] hover:text-[#FEFEFE] '" class=" flex items-center drop-shadow-md w-full border-1 rounded-xl overflow-hidden">
                    <div class="flex-none flex items-center justify-center w-12 h-12">
                        <font-awesome-icon
                            :icon="['fas', 'house']"
                            class="text-[26px] 2xl:text-[28px]"
                        />
                    </div>

                    <p class="text-[20px] text-nowrap">Home</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/collection" :class="page_name === 'collection' ? 'bg-[#252525] text-white' : 'bg-[#FFFFFF] hover:bg-[#252525] hover:text-[#FEFEFE]'" class="flex items-center drop-shadow-md w-full border-1 rounded-xl h-12 overflow-hidden ">
                    <div class="flex-none flex items-center justify-center w-12 h-12">
                        <font-awesome-icon
                            :icon="['fas', 'file-lines']"
                            class="text-[26px] 2xl:text-[28px]"
                        />
                    </div>

                    <p class="text-[20px] text-nowrap">รายการโจทย์</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/create-question" :class="page_name === 'create-question' ? 'bg-[#252525] text-white' : 'bg-[#FFFFFF] hover:bg-[#252525] hover:text-[#FEFEFE]'" class="flex items-center drop-shadow-md w-full border-1 rounded-xl h-12 overflow-hidden ">
                    <div class="flex-none flex items-center justify-center w-12 h-12">
                        <font-awesome-icon
                            :icon="['fas', 'plus']"
                            class="text-[26px] 2xl:text-[28px] "
                        />
                    </div>

                    <p class="text-[20px] text-nowrap">สร้างโจทย์</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/topics" :class="page_name === 'topics' ? 'bg-[#252525] text-white' : 'bg-[#FFFFFF] hover:bg-[#252525] hover:text-[#FEFEFE]'" class="flex items-center drop-shadow-md w-full border-1 rounded-xl h-12 overflow-hidden ">
                    <div class="flex-none flex items-center justify-center w-12 h-12">
                        <font-awesome-icon
                            :icon="['fas', 'box-archive']"
                            class="text-[26px] 2xl:text-[28px]"
                        />
                    </div>

                    <p class="text-[20px] text-nowrap">จัดการหัวข้อ</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/admin" :class="page_name === 'admin' ? 'bg-[#252525] text-white' : 'bg-[#FFFFFF] hover:bg-[#252525] hover:text-[#FEFEFE]'" class="flex items-center drop-shadow-md w-full border-1 rounded-xl h-12 overflow-hidden ">
                    <div class="flex-none flex items-center justify-center w-12 h-12">
                        <font-awesome-icon
                            :icon="['fas', 'user-tie']"
                            class="text-[26px] 2xl:text-[28px] "
                        />
                    </div>

                    <p class="text-[20px] text-nowrap">จัดการแอดมิน</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/notification" :class="page_name === 'notification' ? 'bg-[#252525] text-white' : 'bg-[#FFFFFF] hover:bg-[#252525] hover:text-[#FEFEFE]'" class="flex items-center drop-shadow-md w-full border-1 rounded-xl h-12 overflow-hidden ">
                    <div class="flex-none flex items-center justify-center w-12 h-12">
                        <font-awesome-icon
                            :icon="['fas', 'bullhorn']"
                            class="text-[26px] 2xl:text-[28px] "
                        />
                    </div>

                    <p class="text-[20px] text-nowrap">จัดการ Notification</p>
                </NuxtLink>
            </div>
        </div>

        <NuxtLink to="/" class="bg-[#FFFFFF] hover:bg-[#252525] hover:text-[#FEFEFE] flex items-center drop-shadow-md w-full border-1 rounded-xl h-12 overflow-hidden ">
            <div class="flex-none flex items-center justify-center w-12 h-12">
                    <font-awesome-icon
                        :icon="['fas', 'arrow-right-from-bracket']"
                        class="text-[26px] 2xl:text-[28px] rotate-180 "
                />
            </div>

            <p class="text-[20px] text-nowrap">ออกจาก Dashboard</p>
        </NuxtLink>
    </div>

</template>

<script setup lang="ts">

const props = defineProps<{
    page_name: string
}>()
    

const active_hover = ref(false)

function checkActive(status: boolean) {
    setTimeout(() => {
        active_hover.value = status
    }, 300)

}
</script>