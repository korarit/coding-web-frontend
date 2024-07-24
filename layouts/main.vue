<template>
    <div class="h-[100dvh] flex flex-col max-w-full" :class="show_login_modal ? 'overflow-hidden' : ''">
        <Navbar 
            :login_status="status_login"
            @open-login="() => {show_login_modal = true;}"
            @open-user="() => {show_user_modal = !show_user_modal;}"
        />

            <div class="bg-[#FBFBFB]">
                <slot>
                </slot>
            </div>
                
        <Footer />
        <div v-show="show_login_modal" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalLogin 
                :show="show_login_modal" 
                @close-modal="show_login_modal = false" 
                @login="login"
            />
        </div>

        <div class="absolute w-fit h-fit top-20 xl:right-16  2xl:right-[96px] hidden xl:block">
            <ModalUserData :show="show_user_modal" />
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
const show_user_modal = ref(false)

const status_login = ref(false)

const login = (username, password) => {
    console.log(username, password)
    status_login.value = true
}
</script>