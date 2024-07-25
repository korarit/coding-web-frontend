<template>
  <div
    class="flex items-center justify-center h-screen bg-[#fbfbfb] dark:bg-[#0F0F0F]"
  >
    <div
      class="bg-white dark:bg-[#3D3D3D] p-6 border border-[#afafaf] dark:border-[#1B1B1B] rounded-lg shadow-lg w-[90dvw] sm:w-96"
    >
      <div class="flex items-center justify-center mb-4">
        <div class="relative">
          <div
            class="w-32 h-32 rounded-full bg-[#d9d9d9] flex items-center justify-center mb-4 relative overflow-hidden"
          >
            <div
              class="absolute bottom-0 w-full h-8 bg-[#10101095] font-light text-white flex items-center justify-center"
            >
              Upload
            </div>
          </div>
          <input
            type="file"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <form>
        <div class="mb-4 font-light">
          <input
            type="text"
            placeholder="Username"
            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
          />
        </div>
        <div class="mb-4 font-light">
          <input
            type="text"
            placeholder="Full-Name"
            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
          />
        </div>
        <div class="mb-4 font-light">
          <input
            type="email"
            placeholder="Email"
            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
          />
        </div>
        <div class="mb-4 font-light">
          <input
            type="password"
            placeholder="Password"
            class="w-full p-2 dark:bg-[#262626] border border-gray-300 rounded hover:border-gray-500 dark:border-[#626262] dark:text-white"
          />
        </div>
        <div class="mb-4 flex items-center justify-center">
          <!-- Example of a ReCAPTCHA placeholder -->
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] text-white p-2 rounded text-md dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3]"
          >
            สมัคร
          </button>
        </div>
        <p
          class="text-center text-sm font-light my-4 text-[#606060] dark:text-[#FEFEFE]"
        >
          มีบัญชีอยู่แล้ว
          <a
            href="#"
            class="text-blue-500 hover:text-blue-700 underline underline-offset-2"
            >Log In</a
          >
          เลย
        </p>
        <p
          class="text-center text-sm font-light text-[#606060] dark:text-[#FEFEFE]"
        >
          หรือสมัครครด้วย
        </p>
        <div class="flex justify-center space-x-4 mb-4 mt-4">
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
            <font-awesome-icon :icon="['fab', 'google']" class="fa-2x" />
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
            <font-awesome-icon :icon="['fab', 'windows']" class="fa-2x" />
          </a>
        </div>
      </form>
    </div>
  </div>
</template>
