<template>
    <NuxtLayout>
        <div class="flex justify-center h-fit  dark:bg-[#0F0F0F] bg-[#FBFBFB] max-w-[100%] pt-[32px] sm:py-[64px]">
            <div class="bg-white h-fit dark:bg-[#3D3D3D] p-6 border border-[#afafaf] dark:border-[#1B1B1B] rounded-lg shadow-lg w-[90dvw] sm:w-96">
                <div class="w-[164px] h-[164px] mx-auto rounded-full bg-[#555555] flex items-center justify-center mb-6 relative overflow-hidden">
                    <button class="absolute bottom-0 w-full h-[40px] bg-[#10101095] text-white text-[20px] font-medium flex items-center justify-center">
                            Upload
                    </button>
                </div>
                <input type="file" class="hidden" />
                <div class="flex flex-col">
                    <div class="mb-4 font-light">
                        <input type="text" placeholder="Username"
                            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white" />
                    </div>
                    <div class="mb-4 font-light">
                        <input type="text" placeholder="Full-Name"
                            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white" />
                    </div>
                    <div class="mb-4 font-light">
                        <input type="email" placeholder="Email"
                            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white" />
                    </div>
                    <div class="mb-4 font-light">
                        <input type="password" placeholder="Password"
                            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white" />
                    </div>
                    <div class="mb-4 font-light">
                        <input type="password" placeholder="Password Confrim"
                            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white" />
                    </div>
                    <div class="mb-4 flex items-center justify-center">
                        <!-- Example of a ReCAPTCHA placeholder -->
                    </div>
                    <div class="flex justify-center">
                        <button type="submit"
                            class="w-full bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] text-white dark:text-[#0F0F0F] text-[24px] py-[2px] rounded text-md dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3]">
                            สมัคร
                        </button>
                    </div>
                    <p class="text-center text-[16px] font-light my-4 text-[#606060] dark:text-[#FEFEFE]">
                        มีบัญชีอยู่แล้ว
                        <button @click="open_modal_login" class="text-blue-500 hover:text-blue-700 underline underline-offset-2">Log In</button>
                        เลย
                    </p>
                    <p class="text-center text-[16px] font-light text-[#606060] dark:text-[#FEFEFE]">
                        หรือสมัครด้วย
                    </p>
                    <div class="flex justify-center space-x-4 mb-4 mt-4">
                        <button @click="signIn('github')" class="text-gray-600 hover:text-black active:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400">
                            <font-awesome-icon :icon="['fab', 'github']" class="text-[36px]" />
                        </button>
                        <button @click="signIn('google')" class="text-gray-600 hover:text-black active:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400">
                            <font-awesome-icon :icon="['fab', 'google']" class="text-[36px]" />
                        </button>
                        <button href="#" class="text-gray-600 hover:text-black active:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400">
                            <font-awesome-icon :icon="['fab', 'facebook']" class="text-[36px]" />
                        </button>
                        <button @click="signIn('azure-ad')" class="text-gray-600 hover:text-black active:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400">
                            <font-awesome-icon :icon="['fab', 'windows']" class="text-[36px]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'defaultmain',
    auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})

const {status, signIn} = useAuth()


const router = useRouter()
onMounted(() => {
    if (status.value === 'authenticated') {
        router.push('/')
    }
})

const {open_modal_login} = useLoginModalControl()

</script>