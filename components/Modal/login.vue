<template>
  <div class="w-full h-[100dvh] bg-[#00000048] absolute z-10 flex justify-center items-center">

    <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-300"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div v-show="show_modal" class="bg-white dark:bg-[#3D3D3D] dark:border-[#676767] p-6 rounded-lg shadow-lg w-[90dvw] sm:w-96 2xl:w-[24dvw]">
      <div class="flex justify-between">
        <div>
          <h2 class="text-[26px] lg:text-[34px] xl:text-[32px] 2xl:text-[36px] text-[#00c7a3]">
            ยินดีต้อนรับกลับมา!
          </h2>
          <p class="text-[22px] 2xl:text-[28px] text-[#606060] dark:text-[#FEFEFE] mb-4">เข้าสู่ระบบบัญชีของคุณ</p>
        </div>
        <button class="flex items-center justify-center w-[15%]" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'xmark']"
            class="text-[34px] lg:text-[42px] xl:text-[40px] 2xl:text-[56px] text-[#606060] hover:text-[#000000] active:text-black dark:text-[#FEFEFE] dark:hover:text-[#b0b0b0] dark:active:text-black" />
        </button>
      </div>

        <div class="mb-4">
          <label for="username" class="sr-only">Username / Email</label>
          <input v-model="username"
            type="text" id="username" placeholder="Username / Email"
            class="w-full p-2 border rounded hover:border-gray-500 2xl:text-[20px] placeholder:font-light dark:bg-[#262626] dark:border-[#626262] dark:text-white" 
            :class="`${username_error ? 'border-red-500' : 'border-gray-300'}`"
          />
          <p v-show="username_error" class="text-red-500 text-[12px] 2xl:text-[16px]">กรุณากรอกชื่อผู้ใช้</p>
        </div>
        <div class="mb-4">
          <label for="password" class="sr-only">Password</label>
          <input
            v-model="password"
            type="password" id="password" placeholder="Password"
            class="w-full p-2 border border-gray-300 rounded hover:border-gray-500 2xl:text-[20px] placeholder:font-light dark:bg-[#262626] dark:border-[#626262] dark:text-white"
            :class="`${password_error ? 'border-red-500' : 'border-gray-300'}`"
          />
          <p v-show="password_error" class="text-red-500 text-[12px] 2xl:text-[16px]">กรุณากรอกรหัสผ่าน</p>
        </div>
        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center text-sm 2xl:text-[20px] text-gray-600 dark:text-[#FEFEFE]">
            <input type="checkbox" class="mr-2 h-4 w-4" />
            จดจำฉัน
          </label>
          <p class="text-blue-500 hover:text-blue-700 text-sm 2xl:text-[20px]">
            <a href="#" class="underline underline-offset-2">ลืมรหัสผ่าน</a>?
          </p>
        </div>

        <button @click="checkInput" class="w-full bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3] 2xl:text-[24px] text-white p-2 rounded">
          เข้าสู่ระบบ
        </button>
        <p class="text-center text-sm 2xl:text-[20px] my-4 text-[#606060]">หรือเข้าสู่ระบบด้วย</p>
        <div class="flex justify-center space-x-4 mb-4">
          <button class="text-gray-600 hover:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400">
            <font-awesome-icon :icon="['fab', 'github']" class="text-[36px]" />
          </button>
          <button class="text-gray-600 hover:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400">
            <font-awesome-icon :icon="['fab', 'facebook']" class="text-[36px]" />
          </button>
          <button @click="signIn('google')" class="text-gray-600 hover:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400">
            <font-awesome-icon :icon="['fab', 'google']" class="text-[36px]" />
          </button>
          <button class="text-gray-600 hover:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400">
            <font-awesome-icon :icon="['fab', 'windows']" class="text-[36px]" />
          </button>
        </div>
        <p class="text-center text-sm 2xl:text-[20px] text-[#606060] dark:text-[#FEFEFE]">
          ยังไม่มีบัญชีหรือ
          <a href="#" class="text-blue-500 hover:text-blue-700 underline underline-offset-2">สมัคร</a>
          เลย
        </p>
    </div>
    </transition>
  </div>

</template>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<script setup lang="ts">

const props = defineProps({
  show: Boolean
})

const show_modal = ref(false)

watch(() => props.show, (val) => {
  show_modal.value = val
})


const emit = defineEmits(['closeModal', 'login'])
const closeModal = () => {
  show_modal.value = false
  setTimeout(() => {
    emit('closeModal')
  }, 300)
}

///////////// check input //////////////
const username = ref('')
const username_error = ref(false)
watch(username, (val) => {
  if (val !== '' && username_error.value === true) {
    username_error.value = false
  }
})

const password = ref('')
const password_error = ref(false)
watch(password, (val) => {
  if (val !== '' && password_error.value === true) {
    password_error.value = false
  }
})

const { signIn } = useAuth()
const checkInput = async () => {
  if (username.value === '' || password.value === '') {
    if (username.value === '') {
      username_error.value = true
    }
    if (password.value === '') {
      password_error.value = true
    }
  }else {
    username_error.value = false
    password_error.value = false
    emit('login', username.value, password.value)

    let type = 'email'
    if (username.value.includes('@')) {
      type = 'email';
    } else {
      type = 'username';
    }

    const login_data = {
      type: type,
      username: username.value,
      password: password.value
    }

    await signIn('credentials',login_data)
    closeModal()
  }
}

</script>