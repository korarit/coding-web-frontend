<template>
    <div class="h-[100dvh] flex flex-col max-w-full" :class="show_login_modal ? 'overflow-hidden' : ''">
        <Navbar @open-login="() => {show_login_modal = true; showModal}" />

            <div class="bg-[#FBFBFB]">
                <slot>
                </slot>
            </div>
                
        <Footer />
        <div v-show="show_login_modal" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalLogin :show="show_login_modal" @close-modal="show_login_modal = false" />
        </div>
    </div>
</template>


<style scoped>
body {
    overflow-y: hidden;
}
</style>
<script setup>

///////////////////////// modal control /////////////////////////
const show_login_modal = ref(false)

const test = () => {
    console.log('test')
}
</script>