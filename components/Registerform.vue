<template>
  <div class="flex items-center justify-center h-screen bg-[#aeaeae]">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[90dvw] sm:w-96s">
      <div class="flex items-center justify-center mb-4">
        <div class="relative">
          <div
            class="w-32 h-32 rounded-full bg-[#d9d9d9] flex items-center justify-center mb-4 relative overflow-hidden"
          >
            <div
              class="absolute bottom-0 w-full h-8 bg-[#10101095] text-white flex items-center justify-center"
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
        <div class="mb-4">
          <input
            type="text"
            placeholder="Username"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <input
            type="text"
            placeholder="Full-Name"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <input
            type="email"
            placeholder="Email"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <input
            type="password"
            placeholder="Password"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4 flex items-center justify-center">
          <!-- Example of a ReCAPTCHA placeholder -->
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] text-white p-2 rounded text-md"
          >
            สมัคร
          </button>
        </div>
        <p class="text-center text-sm my-4 text-[#606060]">
          มีบัญชีอยู่แล้ว
          <a href="#" class="text-blue-500 underline underline-offset-2"
            >Log In</a
          >
          เลย
        </p>
        <p class="text-center text-sm text-[#606060]">หรือสมัครครด้วย</p>
        <div class="flex justify-center space-x-4 mb-4 mt-4">
          <a href="#" class="text-gray-600 hover:text-black active:text-black">
            <font-awesome-icon :icon="['fab', 'github']" class="fa-2x" />
          </a>
          <a href="#" class="text-gray-600 hover:text-black active:text-black">
            <font-awesome-icon :icon="['fab', 'google']" class="fa-2x" />
          </a>
          <a href="#" class="text-gray-600 hover:text-black active:text-black">
            <font-awesome-icon :icon="['fab', 'facebook']" class="fa-2x" />
          </a>
          <a href="#" class="text-gray-600 hover:text-black active:text-black">
            <font-awesome-icon :icon="['fab', 'windows']" class="fa-2x" />
          </a>
        </div>
      </form>
    </div>
  </div>
</template>
