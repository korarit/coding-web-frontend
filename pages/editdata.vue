<template>
  <NuxtLayout name="main">
    <div class="flex items-center justify-center h-full sm:my-16">
      <div
        class="sm:border-2 sm:bg-[#FEFEFE] sm:border-[#AFAFAF] sm:dark:bg-[#3D3D3D] sm:dark:border-[#1B1B1B] p-6 sm:rounded-lg sm:drop-shadow-xl sm:w-[80dvw] md:w-[68dvw] lg:w-[60dvw] 2xl:w-[45dvw]"
      >
        <div class="flex items-center justify-center mb-4">
          <div class="relative">
            <div
              class="w-[15dvh] h-[15dvh] xl:w-[25dvh] xl:h-[25dvh] 2xl:w-[22dvh] 2xl:h-[22dvh] sm:w-[20dvh] sm:h-[20dvh] lg:w-[22dvh] lg:h-[22dvh] rounded-full bg-[#d9d9d9] flex items-center justify-center mb-4 relative overflow-hidden"
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
          class="grid grid-cols-3 gap-4 mb-4 sm:grid sm:grid-cols-5 sm:gap-5 sm:mb-6"
        >
          <b
            class="col-span-3 text-[20px] sm:col-span-1 w-fit flex items-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[23px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[15px]"
          >
            Username
          </b>

          <form class="col-span-2 sm:col-span-3">
            <div>
              <input
                type="text"
                placeholder="thestepkla"
                class="w-full border-2 p-2 text-[14px] border-[#C2C2C2] rounded-lg placeholder-[#1F1F1F] dark:placeholder-[#FEFEFE] hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px]"
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
          class="grid grid-cols-3 gap-4 mb-4 sm:grid sm:grid-cols-5 sm:gap-5 sm:mb-6"
        >
          <b
            class="col-span-3 sm:col-span-1 text-[20px] w-fit flex items-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[23px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[15px]"
            >Full-Name
          </b>

          <form class="col-span-2 sm:col-span-3">
            <div>
              <input
                type="text"
                placeholder="Nonnoi Maija"
                class="w-full border-2 p-2 text-[#1F1F1F] text-[14px] dark:text-[#FEFEFE] border-[#C2C2C2] placeholder-[#1F1F1F] dark:placeholder-[#FEFEFE] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px]"
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
          class="grid grid-cols-1 gap-4 mb-3 sm:grid sm:grid-cols-5 sm:gap-5"
        >
          <b
            class="sm:col-span-1 text-[20px] sm:w-fit flex sm:items-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[23px] xl:text-[20px] lg:text-[1px] md:text-[16px] sm:text-[15px]"
          >
            Email
          </b>

          <form class="sm:col-span-3">
            <div>
              <input
                type="text"
                placeholder="12345@gmail.com"
                class="w-full border-2 p-2 border-[#C2C2C2] text-[14px] text-[#1F1F1F] dark:text-[#FEFEFE] placeholder-[#1F1F1F] dark:placeholder-[#FEFEFE] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px]"
              />
            </div>
          </form>
        </div>

        <div
          class="grid grid-cols-4 gap-4 mb-4 sm:grid sm:grid-cols-5 sm:gap-6 sm:mb-6"
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
          class="grid grid-cols-3 gap-4 mb-5 sm:grid sm:grid-cols-5 sm:gap-6 sm:mb-6"
        >
          <b
            class="col-span-3 text-[20px] sm:col-span-1 w-fit flex items-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[23px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[15px]"
          >
            Password
          </b>

          <form class="col-span-2 sm:col-span-3">
            <div>
              <input
                type="text"
                placeholder="***********"
                class="w-full border-2 p-2 border-[#C2C2C2] text-[14px] text-[#1F1F1F] placeholder-[#1F1F1F] dark:placeholder-[#FEFEFE] dark:text-[#FEFEFE] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px]"
              />
            </div>
          </form>

          <button
            class="bg-[#00C7A3] hover:bg-[rgb(25,156,128)] text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] shadow-lg rounded-lg drop-shadow-md 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[16px] sm:text-[14px]"
          >
            แก้ไข
          </button>
        </div>

        <hr class="border-1 mb-5 text-[#9D9D9D] sm:mb-6" />

        <div
          class="grid grid-cols-2 gap-6 sm:grid sm:grid-cols-4 sm:gap-6 mb-5"
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
          class="grid grid-cols-2 gap-6 mb-10 sm:grid sm:grid-cols-4 sm:gap-6 sm:mb-14"
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

        <div class="flex sm:mb-8">
          <button
            class="w-full p-2 text-[23px] sm:p-2 bg-[#D41E30] hover:bg-[#ad313e] shadow-xl text-[#FFFFFF] dark:text-[#FFFFFF] dark:bg-[#E41E31] dark:hover:bg-[#D41E30] rounded-xl flex items-center justify-center 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[18px]"
          >
            ลบบัญชี
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
