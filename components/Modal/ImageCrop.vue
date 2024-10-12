<template>
    <ClientOnly>
    <div class="w-full h-[100dvh] bg-[#00000048] absolute z-10 flex justify-center items-center">

        <Transition 
            enter-active-class="transition ease-out duration-300" 
            enter-from-class="opacity-0 translate-y-full"
            enter-to-class="opacity-100 translate-y-0" 
            leave-active-class="transition ease-in duration-300"
            leave-from-class="opacity-100 translate-y-0" 
            leave-to-class="opacity-0 translate-y-full"
        >
            <div v-show="show_modal" class="bg-white dark:bg-[#3D3D3D] dark:border-[#676767] p-6 rounded-lg shadow-lg w-[90dvw] sm:w-[50dvw] 2xl:w-[35dvw]">
                <div class="flex w-full justify-between items-center mb-4">
                    <p class="text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[32px] text-[#00c7a3]">อัพโหลดรูป</p>

                    <button class="flex items-center justify-center " @click="closeModal">
                        <font-awesome-icon 
                            :icon="['fas', 'xmark']"
                            class="text-[44px] lg:text-[48px] xl:text-[52px] 2xl:text-[52px] text-[#606060] hover:text-[#0f0f0f] active:text-black dark:text-[#FEFEFE] dark:hover:text-[#b0b0b0] dark:active:text-black" 
                        />
                    </button>
                </div>
                <div class="cropper-wrapper mb-6">
                    <div :style="{backgroundImage : 'url(' + image + ')'}" class="image-background" ></div>
                
                    <component :is="Cropper"
                        background-class="cropper-background"
                        
                        :src="image"
                        :stencil-props="{
                            aspectRatio: 1
                        }"
                        :canvas="{
                            minHeight: 0,
		                    minWidth: 0,
		                    maxHeight: 512,
		                    maxWidth: 512,
                        }"
                        :resize-image="{
		                    adjustStencil: false,
                            wheel: false
	                    }"
                        :stencil-component="CircleStencil"
                        ref="cropper"
                    />
                </div>
                <button @click="crop_image()" class="p-2 text-[#FEFEFE] text-[24px] bg-[#00c7a3] rounded-lg w-full">อัพโหลด</button>
            </div>
        </transition>
    </div>
    </ClientOnly>
</template>

<style scoped>

.cropper-wrapper {
	overflow: hidden;
	position: relative;
    max-width: 100%;
    height: auto;
    max-height: 40dvh;
}
.cropper-background {
	background: rgba(103, 103, 103, 0.1);
}
.image-background {
	position: absolute;
	height: 50dvh;
	left: 0;
	top: 0;
	background-size: cover;
	background-position: 50%;
	filter: blur(5px);
}

</style>

<script setup lang="ts">
import {CircleStencil, Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';


//////////////////////// modal //////////////////////////
const props = defineProps<{
    show: boolean
    image: string | null
}>()

const show_modal = ref<boolean>(true)

watch(() => props.show, (val) => {
    show_modal.value = val
})


const emit = defineEmits(['closeModal', 'imageOutput'])
const closeModal = () => {
    show_modal.value = false
    setTimeout(() => {
        emit('closeModal')
    }, 300)
}

const cropper = ref<any>(null);
function crop_image(){
    //ดึงข้อมูลจากการ crop รูปภาพ
    if (!cropper.value) {
        return;
    }
    const { coordinates, canvas, } = cropper.value.getResult();

    canvas.toBlob((blob: string) => {
        emit('imageOutput', blob);
    }, 'image/jpeg');

    //ปิด Modal
    closeModal();
}


</script>