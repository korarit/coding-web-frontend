<template>
    <NuxtLayout name="defaultmain" page_name="">
        <div class="flex items-center justify-center min-h-full ">
            <div v-if="user_data === null" class="w-dvw h-dvh flex justify-center items-center">
                <div class="flex items-center">
                    <svg class=" animate-spin -ml-1 mr-4 h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>

                    <p class="text-[28px]">
                        Loading . . .
                    </p>
                </div>

            </div>
            <div v-else
                class="sm:my-16 sm:border-2 sm:bg-[#FEFEFE] sm:border-[#AFAFAF] sm:dark:bg-[#3D3D3D] sm:dark:border-[#1B1B1B] p-6 sm:rounded-lg sm:drop-shadow-xl sm:w-[80dvw] md:w-[68dvw] lg:w-[60dvw] 2xl:w-[45dvw]">
                <div class="flex items-center justify-center mb-4">
                    <div class="relative">
                        <div
                            class="w-[14dvh] h-[14dvh] xl:w-[20dvh] xl:h-[20dvh] 2xl:w-[20dvh] 2xl:h-[20dvh] sm:w-[16dvh] sm:h-[16dvh] lg:w-[18dvh] lg:h-[18dvh] rounded-full bg-[#d9d9d9] flex items-center justify-center mb-4 relative overflow-hidden">
                            <p v-if="user_data.ProfileImg === null && image_crop === ''" class="text-[96px]">{{
                                user_data.Name[0].toString().toUpperCase() }}</p>
                            <img v-else-if="image_crop === ''" :src="user_data.ProfileImg" alt="profile"
                                class="w-full h-full object-cover bg-center bg-cover" />
                            <img v-else :src="image_crop" alt="profile"
                                class="w-full h-full object-cover bg-center bg-cover" />

                            <label for="upload_profile"
                                class="cursor-pointer absolute bottom-0 w-full xl:h-[5dvh] 2xl:h-[5dvh] sm:h-[4dvh] lg:h-[4dvh] 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] h-8 bg-[#10101095] text-white flex items-center justify-center">
                                Upload
                            </label>
                        </div>
                        <input id="upload_profile" type="file" hidden @change="profile_upload" />
                    </div>
                </div>

                <InputUserEdit title="Username" placeholder="Username" error="" :have_wait="false" :wait="false"
                    :reset="false" :value="user_data.Username" edit_form="username" @update="changeUserData" />

                <InputUserEdit title="Full-Name" placeholder="ชื่อ-นามสกุล" error="" :have_wait="false" :wait="false"
                    :reset="false" :value="user_data.Name" edit_form="name" @update="changeUserData" />


                <InputUserEdit title="Email" placeholder="Email" error="" :have_wait="true" :wait="wait_email_change"
                    :reset="reset_email_change" :value="user_data.Email" edit_form="email"
                    @update="openOtpForChangeEmail" />

                <InputPasswordEdit title="Password" placeholder="Password" placeholder_confirm="Confirm Password"
                    error="" :have_wait="true" :wait="wait_password_change" :reset="reset_password_change"
                    edit_form="password" @update="openOtpForChangePassword" />

                <hr class="border-1 text-[#9D9D9D]" />

                <div class="my-4 flex justify-between">
                    <p class="text-[20px] sm:text-[20px] font-light dark:text-white ">เปิด Profile ให้คนอื่น ๆ สามารถดูประวัติการทำได้</p>

                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" v-model="status_profile">
                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00C7A3]"></div>
                    </label>
                </div>

                <hr class="border-1 mb-5 text-[#9D9D9D] sm:mb-6" />

                <div class="grid grid-cols-2 gap-6 sm:grid sm:grid-cols-4 sm:gap-6 mb-12">
                    <button @click="oauthRemoveConnect(user_thired_party.google, 'google')"
                        :class="user_thired_party.google ? 'bg-red-500 hover:bg-red-600 border border-red-700' : 'bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]'"
                        class="col-span-2 py-2 text-8 shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#E41E31] dark:hover:bg-[#D41E30] rounded-xl flex items-center justify-center xl:text-[20px] text-[16px]">
                        <font-awesome-icon v-if="!wait_remove_oauth.google" :icon="['fab', 'google']" class="text-[32px] text-[#FFFFFF] dark:text-[#0F0F0F] pr-2" />
                        <div v-else class="mr-2 w-fit h-fit">
                            <svg class=" animate-spin -ml-1 xl:h-8 xl:w-8 h-7 w-7   text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                        
                        {{ user_thired_party.google ? 'ยกเลิกเชื่อมต่อ' : 'เชื่อมกับ' }} google
                    </button>

                    <button @click="oauthRemoveConnect(user_thired_party.github, 'github')"
                        :class="user_thired_party.github ? 'bg-red-500 hover:bg-red-600 border border-red-700' : 'bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]'"
                        class="col-span-2 py-2 shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] rounded-xl flex items-center justify-center xl:text-[20px] text-[16px]">
                        
                        <font-awesome-icon v-if="!wait_remove_oauth.github" :icon="['fab', 'github']" class="text-[28px] xl:text-[32px] text-[#FFFFFF] dark:text-[#0F0F0F] pr-2" />
                        <div v-else class="mr-2 w-fit h-fit">
                            <svg class=" animate-spin -ml-1 xl:h-8 xl:w-8 h-7 w-7   text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                        {{ user_thired_party.github ? 'ยกเลิกเชื่อมต่อ' : 'เชื่อมกับ' }} github
                    
                    </button>
                    <button @click="oauthRemoveConnect(user_thired_party.facebook, 'facebook')"
                        :class="user_thired_party.facebook ? 'bg-red-500 hover:bg-red-600 border border-red-700' : 'bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]'"
                        class="col-span-2 py-2 shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-xl flex items-center justify-center xl:text-[20px] text-[16px]">
                        
                        <font-awesome-icon v-if="!wait_remove_oauth.facebook" :icon="['fab', 'facebook']" class="text-[28px] xl:text-[32px] text-[#FFFFFF] dark:text-[#0F0F0F] pr-2" />
                        <div v-else class="mr-2 w-fit h-fit">
                            <svg class=" animate-spin -ml-1 xl:h-8 xl:w-8 h-7 w-7   text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>                        
                        {{ user_thired_party.facebook ? 'ยกเลิกเชื่อมต่อ' : 'เชื่อมกับ' }} facebook
                    </button>

                    <button @click="oauthRemoveConnect(user_thired_party.azure_ad, 'azure_ad')"
                        :class="user_thired_party.azure_ad ? 'bg-red-500 hover:bg-red-600 border border-red-700' : 'bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]'"
                        class="col-span-2 py-2 shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-xl flex items-center justify-center xl:text-[20px] text-[16px]">

                        <font-awesome-icon v-if="!wait_remove_oauth.azure_ad" :icon="['fab', 'microsoft']" class="text-[28px] xl:text-[32px] text-[#FFFFFF] dark:text-[#0F0F0F] pr-2" />
                        <div v-else class="mr-2 w-fit h-fit">
                            <svg class=" animate-spin -ml-1 lg:h-8 lg:w-8 h-7 w-7   text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                        {{ user_thired_party.azure_ad ? 'ยกเลิกเชื่อมต่อ' : 'เชื่อมกับ' }} Microsoft
                    </button>
                </div>

                <div class="flex sm:mb-8">
                    <button
                        @click="openDeleteAcc"
                        class="w-full p-2 text-[23px] sm:p-2 bg-red-500 hover:bg-red-600 border border-red-700 shadow-xl text-[#FFFFFF] dark:text-[#FFFFFF] rounded-xl flex items-center justify-center 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[18px]">
                        <div v-if="wait_acc_delete" class="mr-3 w-fit h-fit">
                            <svg class=" animate-spin -ml-1 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                        ลบบัญชี
                    </button>
                </div>


            </div>
        </div>

        <!-- Modal Image Crop -->
        <div v-show="openModalCropImage" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalImageCrop :show="openModalCropImage" :image="image_for_crop" @close-modal="closeImageCrop"
                @image-output="CropImg" />
        </div>

        <!-- Modal OTP For Change Email-->
        <div v-show="openModalOtpEmail" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalOtp message="OTP ถูกส่งไปยังอีเมลเก่าก่อนเปลี่ยนของคุณ" :show="openModalOtpEmail"
                :otp_code="otp_code_for_email" :otp_expire="otp_expire_for_email" :error="otpErrorEmail"
                :can_request="true" @request-otp="getOTPForChangeEmail" @close-modal="closeOtpForChangeEmail"
                @check-otp="ChangeEmail" />
        </div>

        <!-- Modal OTP For Change Password-->
        <div v-show="openModalOtpPassword" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalOtp message="OTP ถูกส่งไปยัง Email ของคุณ" :show="openModalOtpPassword"
                :otp_code="otp_code_for_password" :otp_expire="otp_expire_for_password" :error="otpErrorPassword"
                :can_request="true" @request-otp="getOTPForChangePassword" @close-modal="closeModalOTPPassword"
                @check-otp="ChangePassword" />
        </div>

        <!-- Modal OTP For Delete Account-->
        <div v-show="openModalOtpDelAcc" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalOtp message="OTP สำหรับลบบัญถูกส่งไปยัง Email ของคุณ" :show="openModalOtpDelAcc"
                :otp_code="otp_code_for_del_acc" :otp_expire="otp_expire_for_del_acc" :error="otpErrorDelAcc"
                :can_request="true" @request-otp="getOTPForDeleteAcc" @close-modal="closeModalOTPDelAcc"
                @check-otp="DeleteAccount" />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">


definePageMeta({
    auth: { unauthenticatedOnly: false, navigateAuthenticatedTo: '/' }
})

const { status, data, signOut } = useAuth()


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
const status_profile = ref(false)
const old_status_profile = ref(false)
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

        //check profile show
        if (user_data.value.ProfileShow == "true") {
            status_profile.value = true
            old_status_profile.value = true
        }

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

const changeUserData = async (form_name: string, new_data: string) => {
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

    if (res.status >= 300) {
        return false
    }

    return true
}

////////////////////// change profile show ///////////////////////
watch(() => status_profile.value, async (val) => {
    console.log(val)
    if (user_data.value === null) {
        return
    }

    const status_str = val ? 'true' : 'false'

    //change profile show
    if (old_status_profile.value === val) {
        return
    }
    const status_change = await changeUserData('profile_show', status_str)
    if (status_change) {
        old_status_profile.value = val
        user_data.value.ProfileShow = status_str
    }
})


///////////////////// modal control ///////////////////////
const openModalCropImage = ref(false)
const openModalOtpEmail = ref(false)
const { open_modal, close_modal } = useModalControl()

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
const otpErrorEmail = ref<string | null>(null)
const wait_email_change = ref<boolean>(false)


const otp_code_for_email = ref('')
const otp_expire_for_email = ref(0)

const getOTPForChangeEmail = async () => {
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
        return true
    }

    return false
}

const openOtpForChangeEmail = async (form_name: string, new_data: string) => {
    const status = await getOTPForChangeEmail()

    if (status) {
        new_email.value = new_data
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

        close_modal()
    } else {
        if (res.status === 400) {
            otpErrorEmail.value = "OTP ไม่ถูกต้อง"
        }
    }
}

const reset_email_change = ref(false)
const closeOtpForChangeEmail = () => {
    if (openModalOtpEmail.value) {
        openModalOtpEmail.value = false
        wait_email_change.value = false

        close_modal()

        //reset value for input email when close modal otp (not send otp to check)
        reset_email_change.value = true
        setTimeout(() => {
            reset_email_change.value = false
        }, 5)
    }
}


/////////////////// Change Password ///////////////////////

const new_password = ref('')
const wait_password_change = ref(false)
const reset_password_change = ref(false)
const openModalOtpPassword = ref(false)

const otpErrorPassword = ref<string | null>(null)
const otp_code_for_password = ref('')
const otp_expire_for_password = ref(0)


const getOTPForChangePassword = async () => {
    const user_session: any = data.value
    const res = await fetch(config.public.backendApi + '/auth/user/otp_password', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + user_session.sessionToken
        }
    })
    if (res.status === 200) {
        const data = await res.json()
        otp_code_for_password.value = data.OTPCode
        otp_expire_for_password.value = data.ExpireTime
        return true
    }

    return false
}

const openOtpForChangePassword = async (password: string) => {
    const status = await getOTPForChangePassword()

    if (status) {
        //set new password
        new_password.value = password
        //open modal otp
        openModalOtpPassword.value = true

        //set wait for loading
        wait_password_change.value = true
        open_modal()
    }
}

const ChangePassword = async (otp: string) => {
    const user_session: any = data.value
    const res = await fetch(config.public.backendApi + '/auth/user/password', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        },
        body: JSON.stringify({
            new_password: new_password.value,
            otp: otp,
            otp_code: otp_code_for_password.value
        })
    })
    if (res.status === 200) {
        openModalOtpPassword.value = false
        wait_password_change.value = false
        close_modal()
    } else {
        if (res.status === 400) {
            otpErrorPassword.value = "OTP ไม่ถูกต้อง"
        }
    }
}

const closeModalOTPPassword = () => {
    if (openModalOtpPassword.value) {
        openModalOtpPassword.value = false
        wait_password_change.value = false

        close_modal()

        //reset value for input email when close modal otp (not send otp to check)
        reset_password_change.value = true
        setTimeout(() => {
            reset_password_change.value = false
        }, 5)
    }
}




//////////////////// Delete Account ///////////////////////

const openModalOtpDelAcc = ref(false)
const wait_acc_delete = ref(false)

const otpErrorDelAcc = ref<string | null>(null)
const otp_code_for_del_acc = ref('')
const otp_expire_for_del_acc = ref(0)

const getOTPForDeleteAcc = async () => {
    const user_session: any = data.value
    const res = await fetch(config.public.backendApi + '/auth/user/otp_delete_user', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + user_session.sessionToken
        }
    })
    if (res.status === 200) {
        const data = await res.json()
        otp_code_for_del_acc.value = data.OTPCode
        otp_expire_for_del_acc.value = data.ExpireTime
        return true
    }

    return false
}

const openDeleteAcc = async () => {

    if (wait_acc_delete.value) {
        return
    }

    if (user_data.value.Email === null) {
        wait_acc_delete.value = true
        DeleteAccount('')
        return
    }

    wait_acc_delete.value = true
    const status = await getOTPForDeleteAcc()

    if (status) {
        openModalOtpDelAcc.value = true
        //set wait for loading
        open_modal()
    }
}

const closeModalOTPDelAcc = () => {
    if (openModalOtpDelAcc.value) {
        openModalOtpDelAcc.value = false
        wait_acc_delete.value = false
        close_modal()
    }
}

const DeleteAccount = async (otp: string) => {
    const user_session: any = data.value

    let payload: any | null = null

    if (user_data.value.Email !== null && user_data.value.Email !== '') {
        payload = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_session.sessionToken
            },
            body: JSON.stringify({
                otp: otp,
                otp_code: otp_code_for_del_acc.value
            })
        }
    } else {
        payload = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_session.sessionToken
            }
        }
    }

    const res = await fetch(config.public.backendApi + '/auth/user', payload)
    if (res.status === 200) {
        openModalOtpDelAcc.value = false
        wait_acc_delete.value = false
        if (user_data.value.Email !== null && user_data.value.Email !== '') {
            close_modal()
        }
        await signOut()
    }
    if (res.status === 400) {
        otpErrorDelAcc.value = "OTP ไม่ถูกต้อง"
        wait_acc_delete.value = false
    }
}


///////////////////////////// connect oauth social login /////////////////////////////
const wait_remove_oauth = ref({
    google: false,
    github: false,
    facebook: false,
    azure_ad: false
} as { [key: string]: boolean })

const oauthRemoveConnect = async (connect_status: boolean, provider: string) => {
    const user_session: any = data.value

    if (wait_remove_oauth.value[provider]) {
        return
    }

    if (connect_status) {

        //กรณีที่เชื่อมต่ออยู่ แล้วต้องการยกเลิกการเชื่อมต่อ

        if (!user_thired_party.value[provider]) {
            return
        }

        if (user_data.value.ThirdParty.length === 1 && user_data.value.Email === null) {
            alert('กรุณาเพิ่ม Email ก่อน หรือ เชื่อมกับ Thired Party อื่น ๆ')
            return
        }

        wait_remove_oauth.value[provider] = true
        const res = await fetch(config.public.backendApi + '/auth/oauth/connect/' + provider, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_session.sessionToken
            }
        })
        if (res.status === 200) {
            user_thired_party.value[provider] = false
        }
        wait_remove_oauth.value[provider] = false


    } else {
        //กรณีที่ยังไม่เชื่อมต่อ แล้วต้องการเชื่อมต่อ
        window.location.href = config.public.backendApi + '/auth/oauth/connect/' + provider 
        + '?redirect=' + window.location.origin + '/user' + '&access_token=' + user_session.sessionToken
    }
}

</script>