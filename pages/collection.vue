<template>
  <NuxtLayout name="main">
    <div
      class="bg-[#FBFBFB] min-h-[calc(100dvh-270px)] p-6 sm:px-[50px] sm:mt-[5px] md:mt-[10px] md:px-[60px] lg:mt-[15px] lg:px-[70px] xl:mt-[20px] xl:px-[80px] 2xl:mt-[25px] 2xl:px-[96px]"
    >
      <div class="relative min-h-[80px] h-fit w-full">
        <div
          class="absolute z-0 top-1/2 -translate-y-1/2 w-full h-fit pr-[4px] flex gap-3 sm:gap-5 pb-4 items-center overflow-hidden"
        >
          <button
            class="sm:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[3px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]"
          >
            <font-awesome-icon
              :icon="['fas', 'code']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] sm:mr-2"
            />
            <p class="whitespace-nowrap">All Topics</p>
          </button>

          <button
            class="w-[50%] sm:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[3px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]"
          >
            <font-awesome-icon
              :icon="['fas', 'code']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] mr-2"
            />
            Algorithm
          </button>

          <button
            class="w-[50%] sm:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[2px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]"
          >
            <font-awesome-icon
              :icon="['fab', 'js']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] mr-2"
            />
            JavaScript
          </button>

          <button
            class="w-[50%] sm:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[2px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]"
          >
            <font-awesome-icon
              :icon="['fas', 'person-running']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] mr-2"
            />
            Contest
          </button>

          <button
            class="w-[50%] sm:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[2px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]"
          >
            <font-awesome-icon
              :icon="['fab', 'python']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] mr-2"
            />
            Python
          </button>

          <button
            class="w-[50%] sm:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[2px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#00B191]"
          >
            <font-awesome-icon
              :icon="['fab', 'java']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] mr-2"
            />
            Java
          </button>
        </div>
        <div
          class="absolute w-[104px] z-10 right-0 top-1/2 -translate-y-1/2 flex self-end min-h-full text-label-3 dark:text-dark-label-3"
        >
          <span
            class="from-[#FAFAFA] min-h-full to-transparent dark:from-dark-paper w-16 bg-gradient-to-l"
          >
          </span>
          <span
            class="bg-[#FAFAFA] min-h-full dark:bg-dark-paper flex w-10 cursor-pointer items-center pl-1 font-normal text-[20px] text-[#606060] dark:text-dark-label-3"
          >
            >>
          </span>
        </div>
      </div>

      <div class="pr-[4px] grid grid-cols-6 gap-5 items-center">
        <button
          class="col-span-2 sm:col-span-1 border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[15px] md:py-[12px] sm:text-[13px] sm:px-[1px] sm:py-[9px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
        >
          ความยาก
          <font-awesome-icon
            class="text-[#4F4F4F] dark:text-[#8A8A8A] text-[20px] 2xl:text-[32px] xl:text-[31px] lg:text-[30px] md:text-[22px] sm:text-[18px] pr-0.5"
            :icon="['fas', 'caret-down']"
          />
        </button>

        <button
          class="col-span-2 sm:col-span-1 border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
        >
          สถานะ
          <font-awesome-icon
            class="text-[#4F4F4F] dark:text-[#8A8A8A] text-[20px] 2xl:text-[32px] xl:text-[31px] lg:text-[30px] md:text-[29px] sm:text-[22px]"
            :icon="['fas', 'caret-down']"
          />
        </button>

        <button
          class="col-span-2 sm:col-span-1 border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
        >
          tag
          <font-awesome-icon
            class="text-[#4F4F4F] dark:text-[#8A8A8A] text-[20px] 2xl:text-[32px] xl:text-[31px] lg:text-[30px] md:text-[29px] sm:text-[22px]"
            :icon="['fas', 'caret-down']"
          />
        </button>
        <div class="relative col-span-5 sm:col-span-2">
          <input
            class="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md pl-12 2xl:text-[22px] xl:text-[21px] lg:text-[18px] md:text-[19px] sm:text-[15px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            type="search"
            name="search"
            placeholder="ค้นหา"
            required
          />
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <font-awesome-icon
              class="text-[#4F4F4F] dark:text-[#8A8A8A] text-[25px] 2xl:text-[28px] xl:text-[31px] lg:text-[30px] md:text-[29px] sm:text-[22px]"
              :icon="['fas', 'magnifying-glass']"
            />
          </div>
        </div>

        <button
          class="col-span-1 border-2 border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-lg flex p-2 drop-shadow-md justify-center text-[14px] px-6 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[20px] sm:text-[16px] dark:text-[#0F0F0F] dark:bg-[#97E1CB] dark:border-[#00B191] dark:hover:bg-[#7FDBC1]"
        >
          ค้นหา
        </button>
      </div>

      <hr class="h-1 border-[#BABABA] dark:border-[#585858] my-6 sm:my-8" />

      <div
        class="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 sm:mb-8"
      >
        <div class="w-full sm:w-fit">
          <h1
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px]"
          >
            Head of Problem 1
          </h1>
          <span
            class="text-[#00C7A3] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
            >Easy</span
          >
          <span
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
            >, Max scroce 15, Success Rate: 96.12%</span
          >
        </div>
        <div class="w-full sm:w-fit flex items-center gap-3 sm:gap-6">
          <button>
            <font-awesome-icon
              class="text-[#606060] text-[25px] 2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] sm:text-[22px]"
              :icon="['far', 'star']"
            />
          </button>

          <button
            class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#00B191] dark:hover-[#]"
          >
            ทำโจทย์
          </button>
        </div>
      </div>

      <div
        class="w-full flex flex-col gap-2 mt-6 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 sm:mb-8"
      >
        <div class="w-full sm:w-fit">
          <h1
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px]"
          >
            Head of Problem 2
          </h1>
          <span
            class="text-[#00C7A3] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
            >Easy</span
          >
          <span
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
            >, Max scroce 15, Success Rate: 96.12%</span
          >
        </div>
        <div class="w-full sm:w-fit flex items-center gap-3 sm:gap-6">
          <button>
            <font-awesome-icon
              class="text-[#606060] text-[25px] 2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] sm:text-[22px]"
              :icon="['far', 'star']"
            />
          </button>

          <button
            class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#00B191] dark:hover-[#]"
          >
            ทำโจทย์
          </button>
        </div>
      </div>

      <div
        class="w-full flex flex-col gap-2 mt-6 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 sm:mb-8"
      >
        <div class="w-full sm:w-fit">
          <h1
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px]"
          >
            Head of Problem 3
          </h1>
          <span
            class="text-[#00C7A3] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
            >Easy</span
          >
          <span
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
            >, Max scroce 15, Success Rate: 96.12%</span
          >
        </div>
        <div class="w-full sm:w-fit flex items-center gap-3 sm:gap-6">
          <button>
            <font-awesome-icon
              class="text-[#606060] text-[25px] 2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] sm:text-[22px]"
              :icon="['far', 'star']"
            />
          </button>

          <button
            class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#00B191] dark:hover-[#]"
          >
            ทำโจทย์
          </button>
        </div>
      </div>

      <div
        class="w-full flex flex-col gap-2 mt-6 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 sm:mb-8"
      >
        <div class="w-full sm:w-fit">
          <h1
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px]"
          >
            Head of Problem 4
          </h1>
          <span
            class="text-[#00C7A3] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
            >Easy</span
          >
          <span
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
            >, Max scroce 15, Success Rate: 96.12%</span
          >
        </div>
        <div class="w-full sm:w-fit flex items-center gap-3 sm:gap-6">
          <button>
            <font-awesome-icon
              class="text-[#606060] text-[25px] 2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] sm:text-[22px]"
              :icon="['far', 'star']"
            />
          </button>

          <button
            class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#00B191] dark:hover-[#]"
          >
            ทำโจทย์
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
