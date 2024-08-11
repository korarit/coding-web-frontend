<template>
    <div class="min-w-full bg-[#FEFEFE] dark:bg-[#3D3D3D] border-b border-[#cecece] dark:border-[#3A3A3A] drop-shadow-md py-3 flex justify-between px-4 xl:px-16 2xl:px-[96px]">

        <!-- logo -->
        <div>

        </div>

        <!-- menu -->
        <div class="items-center w-fit gap-x-5 hidden xl:flex">
            <NuxtLink 
                to="/"
                class="text-[20px] text-center" 
                :class="props.page_name === 'หน้าหลัก' ? 'text-[#00C7A3] dark:text-[#3DD6BA]' : 'text-[#606060] dark:text-[#FEFEFE]'"
            >
                หน้าหลัก
            </NuxtLink>
            <NuxtLink 
                to="/collection"
                class="text-[20px] text-center" 
                :class="props.page_name === 'โจทย์' ? 'text-[#00C7A3] dark:text-[#3DD6BA]' : 'text-[#606060] dark:text-[#FEFEFE]'"
            >
                โจทย์
            </NuxtLink>
            <NuxtLink 
                to="/"
                class="text-[20px] text-center" 
                :class="props.page_name === 'การแข่ง' ? 'text-[#00C7A3] dark:text-[#3DD6BA]' : 'text-[#606060] dark:text-[#FEFEFE]'"
            > 
                การแข่ง
            </NuxtLink>
            <NuxtLink 
                to="/"
                class="text-[20px] text-center" 
                :class="props.page_name === 'ชั้นเรียน' ? 'text-[#00C7A3] dark:text-[#3DD6BA]' : 'text-[#606060] dark:text-[#FEFEFE]'"
            > 
                ชั้นเรียน
            </NuxtLink>

            <NuxtLink v-if="props.login_status != 'authenticated'" to="/register" class="rounded-md drop-shadow-md bg-[#606060] dark:bg-[#FEFEFE] hover:bg-[#303030] dark:hover:bg-[#a0a0a0] active:bg-[#303030] dark:active:bg-[#a0a0a0] text-[20px] text-white dark:text-[#0F0F0F] font-medium px-3 py-[4px]">
                Sing Up
            </NuxtLink>
            <button v-if="props.login_status  != 'authenticated'" @click="$emit('openLogin')" class="rounded-md drop-shadow-md bg-[#00C7A3] dark:bg-[#3DD6BA] hover:bg-[#199c80] dark:hover:bg-[#00C7A3] active:bg-[#199c80] dark:active:bg-[#00C7A3] text-[20px] text-white dark:text-[#0F0F0F] font-medium px-3 py-[4px]">
                Log In
            </button>
            <button v-if="props.login_status  == 'authenticated'" @click="$emit('openUser')" class="flex items-center">
                <div class="w-[42px] h-[42px] rounded-full bg-[#262626] flex items-center justify-center overflow-hidden">
                    <img v-if="props.profile !== null" :src="props.profile" class="w-full h-full object-cover" />
                    <p v-else class="text-[32px] text-[#FEFEFE]">{{ props.fullname }}</p>
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
    profile: String,
    fullname: String,

    page_name: String
})

</script>