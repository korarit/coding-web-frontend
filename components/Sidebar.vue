<template>
    <div class="relative z-[999] h-dvh pt-12 2xl:px-3 flex flex-col space-y-4 bg-[#00C7A3] border-1 border-[#00C7A3] dark:bg-[#3DD6BA] dark:border-[#00B191] overflow-hidden transition-all duration-300 ease-in-out w-[72px] hover:w-64">
        <button class="flex items-center overflow-hidden transition-all duration-300 ease-in-out">
            <div class="flex-none flex items-center justify-center w-12 h-12">
                <font-awesome-icon
                    :icon="['fas', 'bars']"
                    class="text-[#FFFFFF] dark:text-[#0F0F0F] text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]"
                />
            </div>
            <p class="2xl:text-[20px] text-[#FEFEFE]">Dashboard</p>
        </button>

        <hr class="border-2 border-[#FFFFFF] dark:border-[#C8C8C8]" />

        <div class="flex flex-col max-w-full space-y-3">

            <button class="flex items-center bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] hover:text-[#FEFEFE] w-full border-1 rounded-xl overflow-hidden">
                <div class="flex-none flex items-center justify-center w-12 h-12">
                    <font-awesome-icon
                        :icon="['fas', 'house']"
                        class="text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
                    />
                </div>

                <p class="2xl:text-[20px]">Home</p>
            </button>

            <button class="flex items-center bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] hover:text-[#FEFEFE] w-full border-1 rounded-xl h-12 overflow-hidden">
                <div class="flex-none flex items-center justify-center w-12 h-12">
                    <font-awesome-icon
                        :icon="['fas', 'arrow-up-short-wide']"
                        class="text-[20px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
                    />
                </div>
            </button>
            <button class="flex items-center bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] hover:text-[#FEFEFE] w-full border-1 border-[#000000] border-1 rounded-xl h-12 overflow-hidden">
                <div class="flex-none flex items-center justify-center w-12 h-12">
                    <font-awesome-icon
                        :icon="['fas', 'business-time']"
                        class="text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
                    />
                </div>  
            </button>
            <button class="flex items-center bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] hover:text-[#FEFEFE] w-full border-1 rounded-xl h-12 overflow-hidden ">
                <div class="flex-none flex items-center justify-center w-12 h-12">
                    <font-awesome-icon
                        :icon="['fas', 'file-lines']"
                        class="text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
                    />
                </div>
            </button>
            <button class="flex items-center bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] hover:text-[#FEFEFE] w-full border-1 rounded-xl h-12 overflow-hidden ">
                <div class="flex-none flex items-center justify-center w-12 h-12">
                    <font-awesome-icon
                        :icon="['fas', 'plus']"
                        class="text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] "
                    />
                </div>
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">

const active_hover = ref(false)

function checkActive(status: boolean) {
    setTimeout(() => {
        active_hover.value = status
    }, 300)

}
</script>