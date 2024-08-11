<template>
    <div class="h-[100dvh] flex flex-col max-w-full" :class="show_modal ? 'overflow-hidden' : ''">
        <Navbar 
            :login_status="status"
            @open-login="openLogin"
            @open-user="() => {show_user_modal = !show_user_modal;}"

            :profile="data?.profile_img"
            :fullname="data?.name[0]"
            :page_name="props.page_name"
        />
            <div class="bg-[#FBFBFB] dark:bg-[#0F0F0F]">
                <slot>
                </slot>
            </div>
                
        <Footer />
        <div v-show="show_login_modal" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalLogin 
                :show="show_login_modal" 
                @close-modal="closeModal" 
                @login="login"
            />
        </div>

        <div class="absolute z-50 w-fit h-fit top-20 xl:right-16  2xl:right-[96px] hidden xl:block">
            <ModalUserData :show="show_user_modal" :data="data" />
        </div>
    </div>
</template>


<style scoped>
body {
    overflow-y: hidden;
}
</style>
<script setup>
const props = defineProps({
    page_name: String
})

///////////////////////// modal control /////////////////////////
const show_user_modal = ref(false)

const status_login = ref(false)

const {run, open_modal_login, close_modal_login} = useLoginModalControl()
const {statusModal, open_modal, close_modal} = useModalControl()
const show_login_modal = run()
const show_modal = statusModal()

const openLogin = () => {
    open_modal_login()
    open_modal()
}

const closeModal = () => {
    close_modal_login()
    close_modal()
}

///////////////////////// login /////////////////////////

const login = (username, password) => {
    console.log(username, password)
    status_login.value = true
}

///////////////////////// login status /////////////////////////

const { status , data } = useAuth()
</script>