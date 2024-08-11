<template>
    <NuxtLayout page_name="สมัคร">
        <div class="flex justify-center h-fit  dark:bg-[#0F0F0F] bg-[#FBFBFB] max-w-[100%] py-[32px] sm:py-[64px]">
            <div class="bg-white h-fit dark:bg-[#3D3D3D] p-6 border border-[#afafaf] dark:border-[#1B1B1B] rounded-lg shadow-lg w-[90dvw] sm:w-96">
                <div class="w-[164px] h-[164px] mx-auto rounded-full bg-[#555555] bg-cover bg-center flex items-center justify-center mb-6 relative overflow-hidden"
                    :style="{backgroundImage : 'url(' + image_crop + ')'}"
                >
                    <label for="imageProfile" class="absolute cursor-pointer bottom-0 w-full h-[40px] bg-[#10101095] text-white text-[18px] font-medium flex items-center justify-center">
                            อัพโหลด
                    </label>
                    <input id="imageProfile" type="file" hidden @change="profile_upload" />
                </div>
                <div class="flex flex-col">
                    <!-- input register -->
                    <div class=" font-light">

                        <InputWarning
                            type="text"
                            placeholder="Username"
                            :warning="input_status['username'][1].toString()"
                            :show_warning="!!input_status['username'][0]"
                            class_input="mb-4 w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            class_input_warning="mb-[2px] w-full p-2 dark:bg-[#262626] border border-red-500 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            class_warning="mb-2 text-red-500 text-[14px] font-light"
                            :StringCheck="/^[a-zA-Z0-9\s]+$/"
                            v-model="register_data.username"
                        />
                    </div>
                    <div class="font-light">
                        <InputWarning
                            type="text"
                            placeholder="Full-Name"
                            :warning="input_status['name'][1].toString()"
                            :show_warning="!!input_status['name'][0]"
                            class_input="mb-4 w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            class_input_warning="mb-[2px] w-full p-2 dark:bg-[#262626] border border-red-500 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            
                            class_warning="mb-2 text-red-500 text-[14px] font-light"
                            :StringCheck="/^[a-zA-Zก-๏\s]+$/"
                            v-model="register_data.name"
                        />
                    </div>
                    <div class="font-light">
                        <InputWarning
                            type="email"
                            placeholder="Email"
                            :warning="input_status['email'][1].toString()"
                            :show_warning="!!input_status['email'][0]"
                            class_input="mb-4 w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            class_input_warning="mb-[2px] w-full p-2 dark:bg-[#262626] border border-red-500 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            
                            class_warning="mb-2 text-red-500 text-[14px] font-light"
                            :StringCheck="/^[a-zA-Z0-9@.]*$/"

                            v-model="register_data.email"
                        />
                    </div>
                    <div class="font-light" :class="register_data.password === '' ? 'mb-4' : ''">

                        <InputPassword
                            class_input="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            class_input_warning="w-full p-2 dark:bg-[#262626] border border-red-500 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            class_warning="text-red-500 text-[14px] font-light"
                            :show_warning="!!input_status['password'][0]"
                            :warning="input_status['password'][1].toString()"
                            placeholder="Password"
                            fontsize_strength="text-[14px]"

                            v-model:password="register_data.password"
                            v-model:password_strength="register_data.password_strength"
                        />
                    </div>
                    <div class="font-light">
                        <InputWarning
                            type="password"
                            placeholder="Password Confirm"
                            :warning="input_status['password_confirm'][1].toString()"
                            :show_warning="!!input_status['password_confirm'][0]"
                            class_input="mb-4 w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            class_input_warning="mb-[2px] w-full p-2 dark:bg-[#262626] border border-red-500 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
                            
                            class_warning="mb-2 text-red-500 text-[14px] font-light"
                            :StringCheck="/^[a-zA-Z0-9@.!#+*-?^&]*$/"
                            v-model="register_data.password_confirm"
                        />
                    </div>

                    <div class="mb-4 mt-1 flex justify-center">
                        <NuxtTurnstile ref="turnstile" v-model="turnstile_token" />
                    </div>

                    <div class="flex justify-center">
                        <button
                            @click="checkInput"
                            :disabled="requestOtp"
                            class="w-full bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] py-[2px] rounded text-md dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3]"
                        >
                            <span v-if="!requestOtp" class="text-[24px] text-white dark:text-[#0F0F0F]">
                                สมัคร
                            </span>

                            <div v-else class="mx-auto py-1 w-fit h-fit">
                                <svg  class=" animate-spin -ml-1 mr-3 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>

                            
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

                    <!-- social login -->
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

        <!-- Modal Image Crop -->
        <div v-show="openModalCropImage" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalImageCrop 
                :show="openModalCropImage"
                :image="image_for_crop" 
                @close-modal="closeImageCrop" 
                @image-output="CropImg"
            />
        </div>
        <div v-show="openModalOtp" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalOtp 
                :show="openModalOtp"
                :otp_code="otp_code"
                :otp_expire="otpExpire"
                :error="otpError"

                @close-modal="closeOtp"
                @check-otp="Register"
            />
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

const register_data = ref({
    username: '',
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    password_strength: 0,
    otp_code: ''
})


const turnstile = ref<any>(null)

///////////////////// modal control ///////////////////////
const openModalCropImage = ref(false)
const openModalOtp = ref(false)
const {open_modal, close_modal} = useModalControl()

///////////////////// Image Crop ///////////////////////
const openImageCrop = () => {
    openModalCropImage.value = true
    open_modal()
}
const closeImageCrop = () => {
    if (openModalCropImage.value) {
        openModalCropImage.value = false
        close_modal()
    }
}


const image_for_crop = ref<string>('');

function profile_upload(event: any) {
    if (!event.target) {
        return;
    }
    const el = event.target as HTMLInputElement;
    if (!el.files) {
        return;
    }
    var file = el.files[0];
    if (file) {
        //check file type is image
        if (file.type.split('/')[0] !== 'image') {
            alert('Please select image file');
            return;
        }
        if (image_for_crop.value) {
            URL.revokeObjectURL(image_for_crop.value);
        }
        const blob = URL.createObjectURL(file);
        var reader = new FileReader();
        reader.onload = (e) => {
            image_for_crop.value = blob;
            //เปิด modal ตัดรูป หลังจากเลือกรูป
            if (image_for_crop.value !== '') {
                openImageCrop();
            }
            //console.log(this.profile_img);
        };
        reader.readAsArrayBuffer(file);
    }
}

const image_crop = ref<string>('');
const profile_img_blob = ref<Blob | null>(null);
function CropImg(blob: Blob) {
    image_crop.value = URL.createObjectURL(blob);
    profile_img_blob.value = blob;
}

///////////////////// OTP Modal control ///////////////////////
const otp_code = ref<string | null>(null) // code for check otp
const otpExpire = ref<number | null>(null) // time otp expire in millisecond
const otpError = ref<string|null>(null)
const requestOtp = ref(false)
const openOtp = async () => {
    if (openModalCropImage.value) {
        closeImageCrop()
    }

    if (register_data.value['email'] === '') {
        alert('Please input email')
        return
    }

    const config = useRuntimeConfig();

    //get otp from backend
    requestOtp.value = true
    const request = await fetch( config.public.backendApi + '/security/otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Turnstile-Token': turnstile_token.value
        },
        body: JSON.stringify({
            'type': 'email',
            'use_for': 'register',
            'receiver': register_data.value.email
        })
    })
    if (request.status === 200) {
        const data = await request.json()
        register_data.value['otp_code'] = data.OTPCode
        otp_code.value = data.OTPCode
        otpExpire.value = data.ExpireTime

        //open modal otp
        if(register_data.value['otp_code'] !== '' && otp_code.value !== null ) {
            openModalOtp.value = true
            open_modal()
        }
    }else{
        console.log('error otp', request)
        if (request.status === 400) {
            const data = await request.json()
            if (data.message === 'antibot failed') {
                turnstile.value?.reset()
            }
        }
    }
    requestOtp.value = false
} 


const closeOtp = () => {
    if (openModalOtp.value) {
        openModalOtp.value = false
        close_modal()
    }
}


///////////////////// Register ///////////////////////
const input_status = ref({
    username: [false, 'กรุณากรอกชื่อผู้ใช้'],
    name: [false, 'กรุณากรอกชื่อ-นามสกุล'],
    email: [false, 'กรุณากรอกอีเมล'],
    password: [false, 'กรุณากรอกรหัสผ่าน'],
    password_confirm: [false, 'กรุณากรอกยืนยันรหัสผ่าน']
})
const checkInput = () => {
    if (register_data.value.username === '') {
        input_status.value.username = [true, 'กรุณากรอกชื่อผู้ใช้']
        return
    }else{
        input_status.value.username = [false, '']
    }

    if (register_data.value.name === '') {
        input_status.value.name = [true, 'กรุณากรอกชื่อ-นามสกุล']
        return
    }else{
        input_status.value.name = [false, '']
    }

    if (register_data.value.email === '') {
        input_status.value.email = [true, 'กรุณากรอกอีเมล']
        return
    }else{
        input_status.value.email = [false, '']
    }

    if (register_data.value.password === '') {
        input_status.value.password = [true, 'กรุณากรอกรหัสผ่าน']
        return
    }else{
        input_status.value.password = [false, '']
    }

    //password strength
    if (register_data.value.password_strength <= 3) {
        input_status.value.password = [true, 'รหัสผ่านไม่ปลอดภัย']
        return
    }else{
        input_status.value.password = [false, '']
    }

    if (register_data.value.password_confirm === '') {
        input_status.value.password_confirm = [true, 'กรุณากรอกยืนยันรหัสผ่าน']
        return
    }else{
        input_status.value.password_confirm = [false, '']
    }

    if (register_data.value.password !== register_data.value.password_confirm) {
        input_status.value.password_confirm = [true, 'รหัสผ่านไม่ตรงกัน']
        return
    }else{
        input_status.value.password_confirm = [false, '']
    }

    //open otp modal
    openOtp()
}

watch(() => register_data.value.username, (val) => {
    input_status.value.username = [false, '']
})
watch(() => register_data.value.name, (val) => {
    input_status.value.name = [false, '']
})
watch(() => register_data.value.email, (val) => {
    input_status.value.email = [false, '']
})
watch(() => register_data.value.password, (val) => {
    input_status.value.password = [false, '']
    if (register_data.value.password_confirm !== '') {
        if (register_data.value.password !== register_data.value.password_confirm) {
            input_status.value.password_confirm = [true, 'รหัสผ่านไม่ตรงกัน']
        }else{
            input_status.value.password_confirm = [false, '']
        }
    }
})
watch(() => register_data.value.password_confirm, (val) => {
    if (register_data.value.password !== register_data.value.password_confirm) {
        input_status.value.password_confirm = [true, 'รหัสผ่านไม่ตรงกัน']
    }else{
        input_status.value.password_confirm = [false, '']
    }
})




const Register = async (otp : string) =>{
    console.log('register_data', otp)
    const form = new FormData();
    const config = useRuntimeConfig();

    if (otp === '' || otp_code.value === null) {
        console.log('otp or otp_code not found', otp, otp_code.value)
        return
    }

    //check input not empty
    if (register_data.value.username === '' || register_data.value.name === '' || register_data.value.email === '' || register_data.value.password === '' || register_data.value.password_confirm === '') {
        alert('Please input all field')
        return
    }

    //check password confirm
    if (register_data.value.password !== register_data.value.password_confirm) {
        alert('Password not match')
        return
    }

    form.append('username', register_data.value['username']);
    form.append('name', register_data.value['name']);
    form.append('email', register_data.value['email']);
    form.append('password', register_data.value['password']);
    form.append('otp', otp);
    form.append('otp_code', otp_code.value);
    if (profile_img_blob.value) {
        form.append('profile_img', profile_img_blob.value);
    }

    const register_res = await fetch(config.public.backendApi + '/auth/register', {
        method: 'POST',
        body: form
    })
    if (register_res.status === 200) {
        const data = await register_res.json()
        console.log(data)
        //login after register
        const login_data = {
            email: register_data.value.email,
            password: register_data.value.password,
            otp: otp,
            otp_code: register_data.value['otp_code']
        }
        const login_res = await signIn('register', login_data);
        if (login_res?.error !== null) {
            console.log('error login', login_res)
        }else{
            console.log('login success', login_res)
            closeOtp()
        }
    
    }else{
        console.log('error register', register_res)
        if (register_res.status === 400) {
            const data = await register_res.json()
            if (data.message === 'OTP is missing') {
                otpError.value = 'OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
            }
        }
    }
}

///////////////////// Login modal control ///////////////////////
const {open_modal_login} = useLoginModalControl()

const turnstile_token = ref<String | null>(null)
watch(turnstile_token, (val) => {
    console.log('turnstile_token', val)
})
</script>