<template>
    <div class="min-w-full bg-[#FEFEFE] dark:bg-[#3D3D3D] border-b border-[#cecece] dark:border-[#3A3A3A] drop-shadow-md py-3 flex justify-between px-4 xl:px-16 2xl:px-[96px]">

        <!-- logo -->
        <div>

        </div>

        <!-- menu -->
        <div class="items-center w-fit gap-x-5 hidden xl:flex">
            <p class="text-[20px] text-[#00C7A3] dark:text-[#3DD6BA] text-center"> 
                หน้าหลัก
            </p>
            <p class="text-[20px] text-[#606060] dark:text-[#FEFEFE] font-normal text-center"> 
                โจทย์
            </p>
            <p class="text-[20px] text-[#606060] dark:text-[#FEFEFE] font-normal text-center"> 
                การแข่ง
            </p>
            <p class="text-[20px] text-[#606060] dark:text-[#FEFEFE] font-normal text-center"> 
                ชั้นเรียน
            </p>
            <NuxtLink v-if="props.login_status != 'authenticated'" to="/register" class="rounded-md drop-shadow-md bg-[#606060] dark:bg-[#FEFEFE] hover:bg-[#303030] dark:hover:bg-[#a0a0a0] active:bg-[#303030] dark:active:bg-[#a0a0a0] text-[20px] text-white dark:text-[#0F0F0F] font-medium px-3 py-[4px]">
                Sing Up
            </NuxtLink>
            <button v-if="props.login_status  != 'authenticated'" @click="$emit('openLogin')" class="rounded-md drop-shadow-md bg-[#00C7A3] dark:bg-[#3DD6BA] hover:bg-[#199c80] dark:hover:bg-[#00C7A3] active:bg-[#199c80] dark:active:bg-[#00C7A3] text-[20px] text-white dark:text-[#0F0F0F] font-medium px-3 py-[4px]">
                Log In
            </button>
            <button v-if="props.login_status  == 'authenticated'" @click="$emit('openUser')" class="flex items-center">
                <div class="w-[42px] h-[42px] rounded-full bg-[#262626] flex items-center justify-center overflow-hidden">
                    <img :src="props.profile" class="w-full h-full object-cover" />
                </div>
            </button>
        </div>
        <!-- mobile menu -->
        <div class="flex xl:hidden">
            <button class="text-[42px] text-[#00C7A3] dark:text-[#3DD6BA] hover:text-[#199c80] dark:hover:text-[#00C7A3] active:text-[#199c80] dark:active:text-[#00C7A3] font-medium px-3 flex items-center">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </button>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    login_status: String,
    profile: String
})

</script>