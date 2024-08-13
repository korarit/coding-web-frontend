<template>
    <NuxtLayout name="defaultmain" page_name="">
        <div class="flex items-center justify-center min-h-full ">
            <div v-if="user_data === null" class="w-dvw h-dvh flex justify-center items-center">
                <div class="flex items-center">
                    <svg class=" animate-spin -ml-1 mr-4 h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>

                    <p class="text-[28px]">
                        Loading . . .
                    </p>
                </div>
                
            </div>
            <div
                v-else
                class="sm:my-16 sm:border-2 sm:bg-[#FEFEFE] sm:border-[#AFAFAF] sm:dark:bg-[#3D3D3D] sm:dark:border-[#1B1B1B] p-6 sm:rounded-lg sm:drop-shadow-xl sm:w-[80dvw] md:w-[68dvw] lg:w-[60dvw] 2xl:w-[45dvw]">
                <div class="flex items-center justify-center mb-4">
                    <div class="relative">
                        <div
                            class="w-[14dvh] h-[14dvh] xl:w-[20dvh] xl:h-[20dvh] 2xl:w-[20dvh] 2xl:h-[20dvh] sm:w-[16dvh] sm:h-[16dvh] lg:w-[18dvh] lg:h-[18dvh] rounded-full bg-[#d9d9d9] flex items-center justify-center mb-4 relative overflow-hidden">
                            <p v-if="user_data.ProfileImg === null && image_crop === ''" class="text-[96px]">{{ user_data.Name[0].toString().toUpperCase() }}</p>
                            <img v-else-if="image_crop === ''" :src="user_data.ProfileImg" alt="profile" class="w-full h-full object-cover bg-center bg-cover" />
                            <img v-else :src="image_crop" alt="profile" class="w-full h-full object-cover bg-center bg-cover" />

                            <label for="upload_profile"
                                class="cursor-pointer absolute bottom-0 w-full xl:h-[5dvh] 2xl:h-[5dvh] sm:h-[4dvh] lg:h-[4dvh] 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] h-8 bg-[#10101095] text-white flex items-center justify-center">
                                Upload
                            </label>
                        </div>
                        <input id="upload_profile" type="file" hidden @change="profile_upload" />
                    </div>
                </div>

                <InputUserEdit 
                    title="Username" 
                    placeholder="Username" 
                    error="" 
                    :have_wait="false"
                    :wait="false"
                    :value="user_data.Username" 
                    edit_form="username"

                    @update="changeUserData"
                />

                <InputUserEdit 
                    title="Full-Name" 
                    placeholder="ชื่อ-นามสกุล" 
                    error="" 
                    :have_wait="false"
                    :wait="false"
                    :value="user_data.Name" 
                    edit_form="name"

                    @update="changeUserData"
                />


                <InputUserEdit 
                    title="Email" 
                    placeholder="Email" 
                    error="" 

                    :have_wait="true"
                    :wait="wait_email_change"
                    :value="user_data.Email" 
                    edit_form="email"

                    @update="requestOTPForChangeEmail"
                />

                <div class="grid grid-cols-3 gap-4 mb-5 sm:grid sm:grid-cols-5 sm:gap-6 sm:mb-6">
                    <b
                        class="col-span-3 text-[20px] sm:col-span-1 w-fit flex items-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[23px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[15px]">
                        Password
                    </b>

                    <div class="col-span-2 sm:col-span-3">
                        <input type="password" value="12345789" disabled placeholder="รหัสผ่าน"
                            class="w-full border-2 p-2 sm:disabled:bg-white sm:dark:disabled:bg-[#3D3D3D] border-[#C2C2C2] text-[14px] text-[#1F1F1F] placeholder-[#1F1F1F] dark:placeholder-[#FEFEFE] dark:text-[#FEFEFE] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px]" />
                    </div>

                    <button
                        class="bg-[#00C7A3] hover:bg-[rgb(25,156,128)] text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] shadow-lg rounded-lg drop-shadow-md 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[16px] sm:text-[14px]">
                        แก้ไข
                    </button>
                </div>

                <hr class="border-1 mb-5 text-[#9D9D9D] sm:mb-6" />

                <div class="grid grid-cols-2 gap-6 sm:grid sm:grid-cols-4 sm:gap-6 mb-12">
                    <button
                        @click="oauthRemoveConnect(user_thired_party.google, 'google')"
                        :class="user_thired_party.google ? 'bg-[#D41E30] hover:bg-[#ad313e] dark:bg-[#E41E31] dark:hover:bg-[#D41E30]' : 'bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]'"
                        class="col-span-2 py-0.5 sm:py-1 text-8 shadow-xl text-[#FFFFFF] dark:text-[#FFFFFF] dark:bg-[#E41E31] dark:hover:bg-[#D41E30] rounded-xl flex items-center justify-center 2xl:text-[17px] xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[12px]">
                        <font-awesome-icon :icon="['fab', 'google']" class="fa-2x text-[#FFFFFF] dark:text-[#0F0F0F] pr-2" />
                        {{ user_thired_party.google ? 'ยกเลิกเชื่อมต่อ' : 'เชื่อมกับ' }} google
                    </button>

                    <button
                        @click="oauthRemoveConnect(user_thired_party.github, 'github')"
                        :class="user_thired_party.github ? 'bg-[#D41E30] hover:bg-[#ad313e] dark:bg-[#E41E31] dark:hover:bg-[#D41E30]' : 'bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]'"
                        class="col-span-2 py-1 sm:py-2 shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] rounded-xl flex items-center justify-center 2xl:text-[17px] xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[12px]"
                    >
                            <font-awesome-icon :icon="['fab', 'github']" class="fa-2x text-[#FFFFFF] dark:text-[#0F0F0F] pr-2" />
                            {{ user_thired_party.github ? 'ยกเลิกเชื่อมต่อ' : 'เชื่อมกับ' }} github
                    </button>
                    <button
                        @click="oauthRemoveConnect(user_thired_party.facebook, 'facebook')"
                        :class="user_thired_party.facebook ? 'bg-[#D41E30] hover:bg-[#ad313e] dark:bg-[#E41E31] dark:hover:bg-[#D41E30]' : 'bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]'"
                        class="col-span-2 py-1 sm:py-2 shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-xl flex items-center justify-center 2xl:text-[17px] xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[12px]"
                    >
                        <font-awesome-icon :icon="['fab', 'facebook']" class="fa-2x text-[#FFFFFF] dark:text-[#0F0F0F] pr-2" />
                        {{ user_thired_party.facebook ? 'ยกเลิกเชื่อมต่อ' : 'เชื่อมกับ' }} facebook
                    </button>

                    <button
                        @click="oauthRemoveConnect(user_thired_party.azure_ad, 'azure_ad')"
                        :class="user_thired_party.azure_ad ? 'bg-[#D41E30] hover:bg-[#ad313e] dark:bg-[#E41E31] dark:hover:bg-[#D41E30]' : 'bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]'"
                        class="col-span-2 py-1 sm:py-2 shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-xl flex items-center justify-center 2xl:text-[17px] xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[12px]"
                    >
                        <font-awesome-icon :icon="['fab', 'microsoft']" class="fa-2x text-[#FFFFFF] dark:text-[#0F0F0F] pr-2" />

                        {{ user_thired_party.azure_ad ? 'ยกเลิกเชื่อมต่อ' : 'เชื่อมกับ' }} Microsoft
                    </button>
                </div>

                <div class="flex sm:mb-8">
                    <button
                        class="w-full p-2 text-[23px] sm:p-2 bg-[#D41E30] hover:bg-[#ad313e] shadow-xl text-[#FFFFFF] dark:text-[#FFFFFF] dark:bg-[#E41E31] dark:hover:bg-[#D41E30] rounded-xl flex items-center justify-center 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[18px]">
                        ลบบัญชี
                    </button>
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

        <!-- Modal OTP -->
        <div v-show="openModalOtpEmail" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalOtp 
                :show="openModalOtpEmail"
                :otp_code="otp_code_for_email"
                :otp_expire="otp_expire_for_email"
                :error="otpErrorEmail"
                :can_request="false"

                @close-modal="closeOtpForChangeEmail"
                @check-otp="ChangeEmail"
            />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    auth: { unauthenticatedOnly: false, navigateAuthenticatedTo: '/' }
})

const { status, data } = useAuth()


const router = useRouter()
onMounted(() => {
    if (status.value === 'unauthenticated') {
        router.push('/')
    }
})


const user_data = ref<any | null>(null)
const user_thired_party = ref({
    google: false,
    github: false,
    facebook: false,
    azure_ad: false
} as { [key: string]: boolean })


// get user data from api
onMounted(async () => {
    await load_user_data()
})

const config = useRuntimeConfig()
const load_user_data = async () => {
    // get user data from api

    const user_session: any = data.value
    const res = await fetch(config.public.backendApi + '/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        }
    })
    if (res.status === 200) {
        const data = await res.json()
        user_data.value = data
        console.log(user_data.value)

        // check thired party
        for (const key in user_thired_party.value) {
            for (const thired_party of user_data.value.ThirdParty) {
                if (thired_party === key) {
                    user_thired_party.value[key] = true
                }
            }
        }
    }
}

const changeUserData = async (form_name: string,new_data: string) => {
    // change user data
    const form_data = new FormData()
    form_data.append(form_name, new_data)

    const user_session: any = data.value
    const res = await fetch(config.public.backendApi + '/auth/user', {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + user_session.sessionToken
        },
        body: form_data
    })
}

const oauthRemoveConnect = async (connect_status: boolean ,provider: string) => {

    if (connect_status) {

        //กรณีที่เชื่อมต่ออยู่ แล้วต้องการยกเลิกการเชื่อมต่อ

        if (!user_thired_party.value[provider]) {
        return
        }

        if (user_data.value.ThirdParty.length === 1 && user_data.value.Email === null) {
            alert('กรุณาเพิ่ม Email ก่อน หรือ เชื่อมกับ Thired Party อื่น ๆ')
            return
        }

    }else{
        //กรณีที่ยังไม่เชื่อมต่อ แล้วต้องการเชื่อมต่อ
        alert('รออัพเดทในเวอร์ชั่นถัดไป')
    }
}


///////////////////// modal control ///////////////////////
const openModalCropImage = ref(false)
const openModalOtpEmail = ref(false)
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
async function CropImg(blob: Blob) {
    image_crop.value = URL.createObjectURL(blob);
    profile_img_blob.value = blob;

    const form_data = new FormData()
    form_data.append('profile', blob)

    const user_session: any = data.value

    const res = await fetch(config.public.backendApi + '/auth/user', {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + user_session.sessionToken
        },
        body: form_data
    })
    if (res.status !== 200) {
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
}

/////////////////// Change Email ///////////////////////
const new_email = ref('')


// Error For OTP OF Change Email
const otpErrorEmail = ref<string|null>(null)
const wait_email_change = ref<boolean>(false)

const otp_code_for_email = ref('')
const otp_expire_for_email = ref(0)
const requestOTPForChangeEmail = async (form_name: string, new_data: string) => {
    const user_session: any = data.value
    const res = await fetch(config.public.backendApi + '/auth/user/otp_email', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + user_session.sessionToken
        }
    })
    if (res.status === 200) {
        const data = await res.json()
        otp_code_for_email.value = data.OTPCode
        otp_expire_for_email.value = data.ExpireTime


        new_email.value = new_data

        //open modal otp
        openModalOtpEmail.value = true
        wait_email_change.value = true
        open_modal()
    }
}

const ChangeEmail = async (otp: string) => {
    const user_session: any = data.value
    const res = await fetch(config.public.backendApi + '/auth/user/email', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        },
        body: JSON.stringify({
            new_email: new_email.value,
            otp: otp,
            otp_code: otp_code_for_email.value
        })  
    })
    if (res.status === 200) {
        user_data.value.Email = new_email.value
        openModalOtpEmail.value = false
        wait_email_change.value = false
    }else{
        if(res.status === 400){
            otpErrorEmail.value = "OTP ไม่ถูกต้อง"
        }
    }
}

const closeOtpForChangeEmail = () => {
    if (openModalOtpEmail.value) {
        openModalOtpEmail.value = false
        wait_email_change.value = false
        close_modal()
    }
}

</script>