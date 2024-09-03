<template>
  <NuxtLayout>
    <div class="flex bg-[#FBFBFB] dark:bg-[#0F0F0F]">
      <Navleft />
      <div class="flex-auto flex flex-col max-h-dvh overflow-y-auto px-10">
        <div class="flex justify-between mt-10">
          <h1
            class="2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] text-[#000000] dark:text-[#FEFEFE]"
          >
            รายการโจทย์
          </h1>
          <button
            class="2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] rounded-xl border-2 px-4 text-[#FCFCFC] border-[#B12900] hover:bg-[#ad313e] bg-[#DF3E3E] active:bg-[#ef435d]"
          >
            เพิ่มโจทย์
          </button>
        </div>

        <div class="grid grid-cols-6 gap-5 items-center my-10">
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
            class="col-span-1 border-2 border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-lg flex p-2 drop-shadow-md justify-center text-[14px] px-6 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[20px] sm:text-[16px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]"
          >
            ค้นหา
          </button>
        </div>

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
              class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]"
            >
              ทำโจทย์
            </button>
          </div>
        </div>

        <div
          class="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 sm:mb-8"
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
              class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]"
            >
              ทำโจทย์
            </button>
          </div>
        </div>

        <div
          class="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 sm:mb-8"
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
              class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]"
            >
              ทำโจทย์
            </button>
          </div>
        </div>

        <div
          class="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 sm:mb-8"
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
              class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]"
            >
              ทำโจทย์
            </button>
          </div>
        </div>

        <div
          class="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 sm:mb-8"
        >
          <div class="w-full sm:w-fit">
            <h1
              class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px]"
            >
              Head of Problem 5
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
              class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]"
            >
              ทำโจทย์
            </button>
          </div>
        </div>
      </div>
    </div>
    <LazyFooter />
  </NuxtLayout>
</template>
