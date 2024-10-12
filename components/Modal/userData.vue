<template>
    <Transition
        enter-active-class="transition ease-out duration-500"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="opacity-100 translate-y-full"
        leave-to-class="opacity-0 -translate-y-1"
    >
    <div v-show="show_modal" class="w-fit h-fit p-3 bg-[#ffffff] rounded-lg border border-[#C1C1C1] drop-shadow-md">
        <div class="flex flex-col space-y-2 w-fit min-w-[220px]">
            <div class="flex space-x-3 items-center">
                <div class="w-[48px] h-[48px] rounded-full bg-[#00C7A3] overflow-hidden flex items-center justify-center">
                    <img v-if="data?.profile_img != null" :src="data?.profile_img" class="w-full h-full object-cover" />
                    <p v-else class="text-[40px] text-[#FEFEFE]">{{ data?.name[0].toUpperCase() }}</p>
                </div>
                <p class="text-[20px] text-[#262626] font-medium">{{ data?.name }}</p>
            </div>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <NuxtLink to="/user" class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[48px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'gear']" class="text-[28px] " />
                </div>
                <p class="text-[18px] font-light">ตั้งค่าของผู้ใช้</p>
            </NuxtLink>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <button class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[48px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'circle-question']" class="text-[28px] " />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </button>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <NuxtLink to="/like-question" class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[48px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'book-bookmark']" class="text-[28px] " />
                </div>
                <p class="text-[18px] font-light">โจทย์ที่ถูกใจไว้</p>
            </NuxtLink>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <NuxtLink to="/ranking" class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[48px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'award']" class="text-[28px] " />
                </div>
                <p class="text-[18px] font-light">ลำดับภายในเว็บไซต์</p>
            </NuxtLink>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <NuxtLink to="/dashboard" v-if="data?.type_level >= 2" class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[48px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'server']" class="text-[28px] " />
                </div>
                <p class="text-[18px] font-light">จัดการเว็บไซต์</p>
            </NuxtLink>

            <div class="bg-[#EBEBEB] h-px w-full" v-if="data?.type_level >= 2"></div>

            <button @click="signOut" class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[48px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-[28px] " />
                </div>
                <p class="text-[18px] font-light">ออกจากระบบ</p>
            </button>
        </div>
    </div>
    </Transition>
</template>

<script setup>

const props = defineProps({
    show: Boolean,
    data: Object
})

const show_modal = ref(false)

watch(() => props.show, (val) => {
  if(val) {
    show_modal.value = true
  } else {
    show_modal.value = false
  }
})

const { signOut } = useAuth()
</script>