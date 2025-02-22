<template>
  <NuxtLayout name="defaultmain" page_name="ลืมรหัส">
    <div
      class="max-w-[100dvw] min-h-[90dvh]  xl:min-h-[100dvh] h-fit flex justify-center items-center"
    >
      <div
        class="flex gap-x-[3%] justify-center xl:justify-between 2xl:justify-around w-full lg:items-center sm:items-center md:flex-col-reverse lg:flex-row px-4 xl:px-16 2xl:px-[96px] pb-[64px] lg:pb-0"
      >
        <div
          class="w-0 sm:w-[55%] lg:w-[45%] hidden md:flex items-center justify-center"
        >
          <img
            class="hidden sm:hidden md:block xl:h-[60dvw] 2xl:h-[30dvw] 2xl:max-w-[100%] lg:w-[30dvw] lg:h-[80dvw] md:w-[35dvw] md:h-[35dvw] md:mt-[50px] xl:mt-0"
            src="/img_programmer.svg"
            alt="imageprogrammer"
          />
        </div>

        <div
          class="flex h-min-[100%] items-center w-full sm:w-fit lg:w-[30%] xl:w-[42%] 2xl:w-[30%] justify-center sm:justify-normal"
        >
          <ForgetEmail 
            v-if="step === 1"
            v-model:email="email"
            v-model:turnstile="turnstile_token"
            :error="email_error"

            @check-email="checkEmail"
          />
          <ForgetVerification 
            v-else-if="step === 2"
            :otp_code="otp_code"
            :expire="expire_otp"
            :error="otp_error"

            @check-otp="checkOTP"
          />
          <ForgetPassword 
            v-else-if="step === 3"
            :error="setPasswordError"

            @reset-password="resetPassword"
          />
          <ForgetLogin 
            v-else-if="step === 4"
          />

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})
// หากมีการเข้าสู่ระบบแล้ว ให้กลับไปหน้าหลัก
const {status} = useAuth()
const router = useRouter()
onMounted(() => {
    if (status.value === 'authenticated') {
        router.push('/')
    }
})

const config = useRuntimeConfig()
const step = ref(1)

const email = ref('')
const turnstile_token = ref('')
const email_error = ref('')



const checkEmail = async () => {
  if (email.value === '') {
    email_error.value = 'กรุณากรอก Email'
    return
  }

  const res = await fetch(config.public.backendApi + '/auth/checkemail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email.value
    })
  })

  if (res.status === 200) {
    getOTP()
  } else {
    email_error.value = 'Email ไม่ถูกต้อง หรือ ไม่มีมีการสมัครสมาชิก'
  }
  
}


const otp_code = ref('')
const expire_otp = ref<number>(0)
const otp_error = ref('')

const getOTP = async () => {
  if (email.value === '') {
    email_error.value = 'กรุณากรอก Email'
    return
  }

  email_error.value = ''
  const res = await fetch(config.public.backendApi + '/auth/forget/otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Turnstile-Token': turnstile_token.value
    },
    body: JSON.stringify({
      'email': email.value
    })
  })
  if (res.status === 200) {
    const data = await res.json()
    otp_code.value = data.OTPCode
    expire_otp.value = data.ExpireTime
    step.value = 2
  } else {
    email_error.value = 'ไม่สามารถส่ง OTP ไปยัง Email ได้'
  }
}

const otp_correct = ref<string>('')
const checkOTP = async (otp: string) => {
  console.log('test', otp)
  if (otp === '') {
    otp_error.value = 'กรุณากรอกรหัส OTP'
    return
  }

  const res = await fetch(config.public.backendApi + '/security/otp/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'receiver': email.value,
      'otp': otp,
      'code': otp_code.value,
      'use_for': 'forget'
    })
  })

  if (res.status === 200) {
    const data = await res.json()
    console.log(data)
    step.value = 3
    otp_correct.value = otp
  } else {
    if (res.status === 400) {
      otp_error.value = 'รหัส OTP ไม่ถูกต้อง'
    } else {
      otp_error.value = 'ไม่สามารถยืนยัน OTP ได้'
    }
  }
}


const setPasswordError = ref('')
const resetPassword = async (new_password: string) => {
  const res = await fetch(config.public.backendApi + '/auth/forget', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email.value,
      'otp': otp_correct.value,
      'otp_code': otp_code.value,
      'new_password': new_password
    })
  })

  if (res.status === 200) {
    //login after reset password
    step.value = 4
  } else {
    setPasswordError.value = 'ไม่สามารถเปลี่ยนรหัสผ่านได้'
  }
}

</script>