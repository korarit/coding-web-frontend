<template>
  <div
    class="bg-white dark:bg-[#3D3D3D] stroke-[#676767] p-6 rounded-lg shadow-lg w-[90dvw] sm:w-96"
  >
    <div class="flex justify-between">
      <div>
        <h2 class="text-[26px] lg:text-[34px] font-normal text-[#00c7a3]">
          ยินดีต้อนรับกลับมา!
        </h2>
        <p class="text-[22px] text-[#606060] dark:text-[#FEFEFE] mb-4">
          เข้าสู่ระบบบัญชีของคุณ
        </p>
      </div>
      <div class="flex items-center justify-center w-[15%]">
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          class="text-[34px] lg:text-[42px] xl:text-[40px] text-[#606060] dark:text-[#FEFEFE] hover:text-[#000000] dark:hover:text-[#b0b0b0] dark:hover: active:text-black dark:at"
        />
      </div>
    </div>

    <form>
      <div class="mb-4 font-light">
        <label for="username" class="sr-only">Username / Email</label>
        <input
          type="text"
          id="username"
          placeholder="Username / Email"
          class="w-full p-2 border dark:bg-[#262626] border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
        />
      </div>
      <div class="mb-4 font-light">
        <label for="password" class="sr-only">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          class="w-full p-2 border dark:bg-[#262626] border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
        />
      </div>
      <div class="flex items-center justify-between mb-4">
        <label
          class="flex items-center text-sm text-gray-600 dark:text-[#FEFEFE]"
        >
          <input type="checkbox" class="mr-2" />
          จดจำฉัน
        </label>
        <p class="text-blue-500 hover:text-blue-700 text-sm">
          <a href="#" class="underline underline-offset-2">ลืมรหัสผ่าน</a>?
        </p>
      </div>

      <button
        type="submit"
        class="w-full bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] text-white p-2 rounded dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3]"
      >
        เข้าสู่ระบบ
      </button>
      <p
        class="text-center text-sm font-light my-4 text-[#606060] dark:text-[#FEFEFE]"
      >
        หรือเข้าสู่ระบบด้วย
      </p>
      <div class="flex justify-center space-x-4 mb-4">
        <a
          href="#"
          class="text-gray-600 hover:text-black active:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400"
        >
          <font-awesome-icon :icon="['fab', 'github']" class="fa-2x" />
        </a>
        <a
          href="#"
          class="text-gray-600 hover:text-black active:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400"
        >
          <font-awesome-icon :icon="['fab', 'facebook']" class="fa-2x" />
        </a>
        <a
          href="#"
          class="text-gray-600 hover:text-black active:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400"
        >
          <font-awesome-icon :icon="['fab', 'google']" class="fa-2x" />
        </a>
        <a
          href="#"
          class="text-gray-600 hover:text-black active:text-black dark:text-[#FEFEFE] dark:hover:text-gray-400 dark:active:text-gray-400"
        >
          <font-awesome-icon :icon="['fab', 'windows']" class="fa-2x" />
        </a>
      </div>
      <p
        class="text-center text-sm font-light text-[#606060] dark:text-[#FEFEFE]"
      >
        ยังไม่มีบัญชีหรือ
        <a
          href="#"
          class="text-blue-500 hover:text-blue-700 underline underline-offset-2"
          >สมัคร</a
        >
        เลย
      </p>
    </form>
  </div>
</template>
