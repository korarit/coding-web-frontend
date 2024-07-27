<template>
  <NuxtLayout name="main">
    <div class="flex items-center justify-center h-full sm:my-16">
      <div
        class="border-2 bg-[#FEFEFE] border-[#AFAFAF] dark:bg-[#3D3D3D] dark:border-[#1B1B1B] p-6 sm:border-[#afafaf] sm:rounded-lg sm:shadow-lg sm:w-[70dvw] md:w-[64dvw] lg:w-[50dvw] 2xl:w-[40dvw]"
      >
        <div class="flex items-center justify-center mb-6">
          <div class="relative">
            <div
              class="w-[15dvh] h-[15dvh] xl:w-[20dvh] xl:h-[20dvh] rounded-full bg-[#d9d9d9] flex items-center justify-center mb-4 relative overflow-hidden"
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

        <div
          class="grid grid-cols-3 gap-6 sm:grid sm:grid-cols-5 sm:gap-6 mb-7"
        >
          <b
            class="col-span-3 sm:col-span-1 w-fit flex items-center justify-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
          >
            Username
          </b>

          <form class="col-span-2 sm:col-span-3">
            <div>
              <input
                type="text"
                placeholder="Username"
                class="w-full border-2 p-2 border-[#C2C2C2] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
              />
            </div>
          </form>

          <button
            class="bg-[#00C7A3] hover:bg-[rgb(25,156,128)] shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-lg drop-shadow-md 2xl:text-[24px] xl:text-[22px] lg:text-[18px] md:text-[16px] sm:text-[14px]"
          >
            แก้ไข
          </button>
        </div>

        <div
          class="grid grid-cols-3 gap-6 sm:grid sm:grid-cols-5 sm:gap-6 mb-7"
        >
          <b
            class="col-span-3 sm:col-span-1 w-fit flex items-center justify-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[20px] xl:text-[18px] lg:text-[15px] md:text-[14px] sm:text-[12px]"
            >Full-Name
          </b>

          <form class="col-span-2 sm:col-span-3">
            <div>
              <input
                type="text"
                placeholder="Username"
                class="w-full border-2 p-2 text-[#1F1F1F] dark:text-[#FEFEFE] border-[#C2C2C2] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
              />
            </div>
          </form>

          <button
            class="bg-[#00C7A3] hover:bg-[rgb(25,156,128)] shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-lg drop-shadow-md 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[16px] sm:text-[14px]"
          >
            แก้ไข
          </button>
        </div>

        <div
          class="grid grid-cols-1 gap-6 mb-7 sm:grid sm:grid-cols-5 sm:gap-6"
        >
          <b
            class="sm:col-span-1 sm:w-fit flex sm:items-center sm:justify-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
          >
            Email
          </b>

          <form class="sm:col-span-3">
            <div>
              <input
                type="text"
                placeholder="Username"
                class="w-full border-2 p-2 border-[#C2C2C2] text-[#1F1F1F] dark:text-[#FEFEFE] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
              />
            </div>
          </form>
        </div>

        <div
          class="grid grid-cols-4 gap-6 sm:grid sm:grid-cols-5 sm:gap-6 mb-7"
        >
          <button class></button>
          <button
            class="border rounded-lg bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] shadow-lg pl-0.5 py-1 sm:p-1 text-[#FFFFFF] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
          >
            บันทึก
          </button>
          <button
            class="border rounded-lg bg-[#D41E30] hover:bg-[#ad313e] dark:text-[#FFFFFF] dark:bg-[#E41E31] dark:hover:bg-[#D41E30] shadow-lg sm:p-1 text-[#FFFFFF] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
          >
            ยกเลิก
          </button>
        </div>

        <div
          class="grid grid-cols-3 gap-6 sm:grid sm:grid-cols-5 sm:gap-6 mb-7"
        >
          <b
            class="col-span-3 sm:col-span-1 w-fit flex items-center justify-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
          >
            Password
          </b>

          <form class="col-span-2 sm:col-span-3">
            <div>
              <input
                type="text"
                placeholder="Password"
                class="w-full border-2 p-2 border-[#C2C2C2] text-[#1F1F1F] dark:text-[#FEFEFE] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]"
              />
            </div>
          </form>

          <button
            class="bg-[#00C7A3] hover:bg-[rgb(25,156,128)] text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] shadow-lg rounded-lg drop-shadow-md 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[16px] sm:text-[14px]"
          >
            แก้ไข
          </button>
        </div>

        <hr class="border-1 text-[#9D9D9D] mb-7" />

        <div
          class="grid grid-cols-2 gap-6 sm:grid sm:grid-cols-4 sm:gap-6 mb-7"
        >
          <button
            class="col-span-2 py-0.5 sm:py-1 bg-[#D41E30] hover:bg-[#ad313e] text-8 shadow-xl text-[#FFFFFF] dark:text-[#FFFFFF] dark:bg-[#E41E31] dark:hover:bg-[#D41E30] rounded-xl flex items-center justify-center 2xl:text-[17px] xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[12px]"
          >
            <a class="text-[#FFFFFF] pr-2">
              <font-awesome-icon :icon="['fab', 'google']" class="fa-2x" />
            </a>
            ยกเลิกเชื่อม google
          </button>
          <button
            class="col-span-2 py-0.5 sm:py-1 bg-[#00C7A3] hover:bg-[rgb(25,156,128)] shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-xl flex items-center justify-center 2xl:text-[17px] xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[12px]"
          >
            <a class="text-[#FFFFFF] dark:text-[#0F0F0F] pr-2">
              <font-awesome-icon :icon="['fab', 'github']" class="fa-2x" /> </a
            >เชื่อมกับ github
          </button>
        </div>

        <div
          class="grid grid-cols-2 gap-6 sm:grid sm:grid-cols-4 sm:gap-6 mb-7"
        >
          <button
            class="col-span-2 py-0.5 sm:py-1 bg-[#00C7A3] hover:bg-[rgb(25,156,128)] shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-xl flex items-center justify-center 2xl:text-[17px] xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[12px]"
          >
            <a class="text-[#FFFFFF] dark:text-[#0F0F0F] pr-2">
              <font-awesome-icon :icon="['fab', 'facebook']" class="fa-2x" />
            </a>
            เชื่อมกับ facebook
          </button>
          <button
            class="col-span-2 py-0.5 sm:py-1 bg-[#00C7A3] hover:bg-[rgb(25,156,128)] shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-xl flex items-center justify-center 2xl:text-[17px] xl:text-[16px] lg:text-[15px] md:text-[13px] sm:text-[12px]"
          >
            <a class="text-[#FFFFFF] dark:text-[#0F0F0F] pr-2">
              <font-awesome-icon
                :icon="['fab', 'microsoft']"
                class="fa-2x" /></a
            >เชื่อมกับ Microsoft
          </button>
        </div>

        <div class="flex mb-8">
          <button
            class="w-full p-2.5 sm:p-1 bg-[#D41E30] hover:bg-[#ad313e] shadow-xl text-[#FFFFFF] dark:text-[#FFFFFF] dark:bg-[#E41E31] dark:hover:bg-[#D41E30] rounded-xl flex items-center justify-center 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[18px]"
          >
            ลบบัญชี
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
