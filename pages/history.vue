<template>
  <NuxtLayout>
    <div class="flex bg-[#FBFBFB] dark:bg-[#0F0F0F]">
      <Navleft />

      <div
        class="flex-auto flex flex-col max-h-dvh overflow-y-auto mx-auto 2xl:mx-24"
      >
        <h1
          class="text-[28px] 2xl:text-[58px] xl:text-[54px] lg:text-[50px] md:text-[45px] sm:text-[40px] pl-5 sm:pl-10 py-5 sm:py-10"
        >
          History in Question
        </h1>
        <p
          class="text-[20px] 2xl:text-[38px] xl:text-[34px] lg:text-[30px] md:text-[28px] sm:text-[26px] pl-5 sm:pl-10 md:pb-auto lg:pb-10"
        >
          Check this when your want
        </p>

        <div
          class="w-full mx-auto lg:border-2 lg:border-b-0 lg:rounded-b rounded-2xl dark:bg-[#262626] border-[#9C9C9C] dark:border-[#545454]"
        >
          <!-- แถว1 -->
          <div
            class="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 md:gap-8 sm:gap-10 gap-6 mx-10 mt-14"
          >
            <div
              class="border-2 rounded-xl drop-shadow-lg p-5 border-[#BABABA] dark:border-[#545454] bg-[#FEFEFE] dark:bg-[#3D3D3D]"
            >
              <p
                class="text-[#000000] dark:text-[#FEFEFE] pb-4 text-[17px] 2xl:text-[28px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px]"
              >
                ชื่อคนทำ
              </p>

              <button
                class="text-[#000000] dark:text-[#E6E6E6] pb-3 text-[15px] 2xl:text-[24px] xl:text-[22px] lg:text-[18px] md:text-[15px] sm:text-[17px]"
              >
                <font-awesome-icon
                  :icon="['fab', 'python']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#E6E6E6]"
                />
                ภาษา
              </button>
              <p
                class="text-[#000000] dark:text-[#C8C8C8] pb-5 text-[15px] 2xl:text-[18px] xl:text-[18px] lg:text-[12px] md:text-[10px] sm:text-[15px]"
              >
                <font-awesome-icon
                  :icon="['fas', 'calendar-days']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#C8C8C8]"
                />
                15:00:56 24/02/2024
              </p>
              <button
                class="text-[15px] 2xl:text-[23px] xl:text-[20px] lg:text-[16px] md:text-[14px] sm:text-[16px] drop-shadow-lg py-1 px-12 sm:px-10 md:px-7 lg:px-8 xl:px-12 border-2 rounded-2xl border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
              >
                รายระเอียด
              </button>
            </div>

            <div
              class="border-2 rounded-xl drop-shadow-lg p-5 border-[#BABABA] dark:border-[#545454] bg-[#FEFEFE] dark:bg-[#3D3D3D]"
            >
              <p
                class="text-[#000000] dark:text-[#FEFEFE] pb-4 text-[17px] 2xl:text-[28px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px]"
              >
                ชื่อคนทำ
              </p>

              <button
                class="text-[#000000] dark:text-[#E6E6E6] pb-3 text-[15px] 2xl:text-[24px] xl:text-[22px] lg:text-[18px] md:text-[15px] sm:text-[17px]"
              >
                <font-awesome-icon
                  :icon="['fab', 'python']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#E6E6E6]"
                />
                ภาษา
              </button>
              <p
                class="text-[#000000] dark:text-[#C8C8C8] pb-5 text-[15px] 2xl:text-[18px] xl:text-[18px] lg:text-[12px] md:text-[10px] sm:text-[15px]"
              >
                <font-awesome-icon
                  :icon="['fas', 'calendar-days']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#C8C8C8]"
                />
                15:00:56 24/02/2024
              </p>
              <button
                class="text-[15px] 2xl:text-[23px] xl:text-[20px] lg:text-[16px] md:text-[14px] sm:text-[16px] drop-shadow-lg py-1 px-12 sm:px-10 md:px-7 lg:px-8 xl:px-12 border-2 rounded-2xl border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
              >
                รายระเอียด
              </button>
            </div>

            <div
              class="border-2 rounded-xl drop-shadow-lg p-5 border-[#BABABA] dark:border-[#545454] bg-[#FEFEFE] dark:bg-[#3D3D3D]"
            >
              <p
                class="text-[#000000] dark:text-[#FEFEFE] pb-4 text-[17px] 2xl:text-[28px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px]"
              >
                ชื่อคนทำ
              </p>

              <button
                class="text-[#000000] dark:text-[#E6E6E6] pb-3 text-[15px] 2xl:text-[24px] xl:text-[22px] lg:text-[18px] md:text-[15px] sm:text-[17px]"
              >
                <font-awesome-icon
                  :icon="['fab', 'python']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#E6E6E6]"
                />
                ภาษา
              </button>
              <p
                class="text-[#000000] dark:text-[#C8C8C8] pb-5 text-[15px] 2xl:text-[18px] xl:text-[18px] lg:text-[12px] md:text-[10px] sm:text-[15px]"
              >
                <font-awesome-icon
                  :icon="['fas', 'calendar-days']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#C8C8C8]"
                />
                15:00:56 24/02/2024
              </p>
              <button
                class="text-[15px] 2xl:text-[23px] xl:text-[20px] lg:text-[16px] md:text-[14px] sm:text-[16px] drop-shadow-lg py-1 px-12 sm:px-10 md:px-7 lg:px-8 xl:px-12 border-2 rounded-2xl border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
              >
                รายระเอียด
              </button>
            </div>

            <div
              class="md:hidden 2xl:block border-2 rounded-xl drop-shadow-lg p-5 border-[#BABABA] dark:border-[#545454] bg-[#FEFEFE] dark:bg-[#3D3D3D]"
            >
              <p
                class="text-[#000000] dark:text-[#FEFEFE] pb-4 text-[17px] 2xl:text-[28px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px]"
              >
                ชื่อคนทำ
              </p>

              <button
                class="text-[#000000] dark:text-[#E6E6E6] pb-3 text-[6px] 2xl:text-[24px] xl:text-[14px] lg:text-[12px] md:text-[10px] sm:text-[17px]"
              >
                <font-awesome-icon
                  :icon="['fab', 'python']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#E6E6E6]"
                />
                ภาษา
              </button>
              <button
                class="text-[#000000] dark:text-[#C8C8C8] pb-5 text-[15px] 2xl:text-[18px] xl:text-[18px] lg:text-[12px] md:text-[10px] sm:text-[15px]"
              >
                <font-awesome-icon
                  :icon="['fas', 'calendar-days']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#C8C8C8]"
                />
                15:00:56 24/02/2024
              </button>
              <button
                class="text-[15px] 2xl:text-[23px] xl:text-[20px] lg:text-[16px] md:text-[14px] sm:text-[16px] drop-shadow-lg py-1 px-12 sm:px-10 md:px-7 lg:px-8 xl:px-12 border-2 rounded-2xl border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
              >
                รายระเอียด
              </button>
            </div>
          </div>

          <!-- แถว2 -->
          <div
            class="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 md:gap-8 sm:gap-10 gap-6 m-10"
          >
            <div
              class="border-2 rounded-xl drop-shadow-lg p-5 border-[#BABABA] dark:border-[#545454] bg-[#FEFEFE] dark:bg-[#3D3D3D]"
            >
              <p
                class="text-[#000000] dark:text-[#FEFEFE] pb-4 text-[17px] 2xl:text-[28px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px]"
              >
                ชื่อคนทำ
              </p>

              <button
                class="text-[#000000] dark:text-[#E6E6E6] pb-3 text-[15px] 2xl:text-[24px] xl:text-[22px] lg:text-[18px] md:text-[15px] sm:text-[8px]"
              >
                <font-awesome-icon
                  :icon="['fab', 'python']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#E6E6E6]"
                />
                ภาษา
              </button>
              <p
                class="text-[#000000] dark:text-[#C8C8C8] pb-5 text-[15px] 2xl:text-[18px] xl:text-[18px] lg:text-[12px] md:text-[10px] sm:text-[15px]"
              >
                <font-awesome-icon
                  :icon="['fas', 'calendar-days']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#C8C8C8]"
                />
                15:00:56 24/02/2024
              </p>
              <button
                class="text-[15px] 2xl:text-[23px] xl:text-[20px] lg:text-[16px] md:text-[14px] sm:text-[16px] drop-shadow-lg py-1 px-12 sm:px-10 md:px-7 lg:px-8 xl:px-12 border-2 rounded-2xl border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
              >
                รายระเอียด
              </button>
            </div>

            <div
              class="border-2 rounded-xl drop-shadow-lg p-5 border-[#BABABA] dark:border-[#545454] bg-[#FEFEFE] dark:bg-[#3D3D3D]"
            >
              <p
                class="text-[#000000] dark:text-[#FEFEFE] pb-4 text-[17px] 2xl:text-[28px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px]"
              >
                ชื่อคนทำ
              </p>

              <button
                class="text-[#000000] dark:text-[#E6E6E6] pb-3 text-[15px] 2xl:text-[24px] xl:text-[22px] lg:text-[18px] md:text-[15px] sm:text-[8px]"
              >
                <font-awesome-icon
                  :icon="['fab', 'python']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#E6E6E6]"
                />
                ภาษา
              </button>
              <p
                class="text-[#000000] dark:text-[#C8C8C8] pb-5 text-[15px] 2xl:text-[18px] xl:text-[18px] lg:text-[12px] md:text-[10px] sm:text-[15px]"
              >
                <font-awesome-icon
                  :icon="['fas', 'calendar-days']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#C8C8C8]"
                />
                15:00:56 24/02/2024
              </p>
              <button
                class="text-[15px] 2xl:text-[23px] xl:text-[20px] lg:text-[16px] md:text-[14px] sm:text-[16px] drop-shadow-lg py-1 px-12 sm:px-10 md:px-7 lg:px-8 xl:px-12 border-2 rounded-2xl border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
              >
                รายระเอียด
              </button>
            </div>

            <div
              class="border-2 rounded-xl drop-shadow-lg p-5 border-[#BABABA] dark:border-[#545454] bg-[#FEFEFE] dark:bg-[#3D3D3D]"
            >
              <p
                class="text-[#000000] dark:text-[#FEFEFE] pb-4 text-[17px] 2xl:text-[28px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px]"
              >
                ชื่อคนทำ
              </p>

              <button
                class="text-[#000000] dark:text-[#E6E6E6] pb-3 text-[15px] 2xl:text-[24px] xl:text-[22px] lg:text-[18px] md:text-[15px] sm:text-[8px]"
              >
                <font-awesome-icon
                  :icon="['fab', 'python']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#E6E6E6]"
                />
                ภาษา
              </button>
              <p
                class="text-[#000000] dark:text-[#C8C8C8] pb-5 text-[15px] 2xl:text-[18px] xl:text-[18px] lg:text-[12px] md:text-[10px] sm:text-[15px]"
              >
                <font-awesome-icon
                  :icon="['fas', 'calendar-days']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#C8C8C8]"
                />
                15:00:56 24/02/2024
              </p>
              <button
                class="text-[15px] 2xl:text-[23px] xl:text-[20px] lg:text-[16px] md:text-[14px] sm:text-[16px] drop-shadow-lg py-1 px-12 sm:px-10 md:px-7 lg:px-8 xl:px-12 border-2 rounded-2xl border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
              >
                รายระเอียด
              </button>
            </div>

            <div
              class="border-2 rounded-xl drop-shadow-lg p-5 border-[#BABABA] dark:border-[#545454] bg-[#FEFEFE] dark:bg-[#3D3D3D]"
            >
              <p
                class="text-[#000000] dark:text-[#FEFEFE] pb-4 text-[17px] 2xl:text-[28px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px]"
              >
                ชื่อคนทำ
              </p>

              <button
                class="text-[#000000] dark:text-[#E6E6E6] pb-3 text-[6px] 2xl:text-[24px] xl:text-[14px] lg:text-[18px] md:text-[10px] sm:text-[8px]"
              >
                <font-awesome-icon
                  :icon="['fab', 'python']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#E6E6E6]"
                />
                ภาษา
              </button>
              <button
                class="text-[#000000] dark:text-[#C8C8C8] pb-5 text-[15px] 2xl:text-[18px] xl:text-[18px] lg:text-[12px] md:text-[14px] sm:text-[15px]"
              >
                <font-awesome-icon
                  :icon="['fas', 'calendar-days']"
                  class="pr-2 text-[22px] xl:text-[28px] dark:text-[#C8C8C8]"
                />
                15:00:56 24/02/2024
              </button>
              <button
                class="text-[15px] 2xl:text-[23px] xl:text-[20px] lg:text-[16px] md:text-[16px] sm:text-[16px] drop-shadow-lg py-1 px-12 sm:px-10 md:px-9 lg:px-8 xl:px-12 border-2 rounded-2xl border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
              >
                รายระเอียด
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LazyFooter />
  </NuxtLayout>
</template>
