<template>
  <NuxtLayout name="main">
    <div
      class="bg-[#FBFBFB] dark:bg-black pt-6 sm:px-[50px] sm:mt-[5px] md:mt-[10px] md:px-[60px] lg:mt-[15px] lg:px-[70px] xl:mt-[20px] xl:px-[80px] 2xl:mt-[25px] 2xl:px-[150px]"
    >
      <div class="relative min-h-[80px] h-fit w-full">
        <div class="bg-[#FBFBFB] ml-8 sm:ml-0">
          <div class="relative min-h-[80px] h-fit w-full">
            <div
              class="absolute z-0 top-1/2 -translate-y-1/2 w-full h-fit pr-[4px] flex gap-3 sm:gap-5 pb-4 items-center overflow-hidden"
            >
              <button
                class="sm:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] active:bg-[#199c80] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[3px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]"
              >
                <font-awesome-icon
                  :icon="['fas', 'box-archive']"
                  class="text-[0px] text-[#FFFFFF] dark:text-[#0F0F0F] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] sm:mr-2"
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
        </div>
      </div>

      <div
        class="relative h-fit w-full sm:mt-5 lg:mt-10 pb-5 sm:border-2 sm:border-b-0 sm:rounded-b-sm sm:rounded-2xl sm:border-[#9C9C9C] dark:border-[#545454]"
      >
        <b
          class="flex justify-center sm:pt-10 dark:text-[#FEFEFE] text-[20px] 2xl:text-[30px] xl:text-[28px] lg:text[26px] md:text-[24px] sm:text-[22px]"
          ><font-awesome-icon
            :icon="['fas', 'ranking-star']"
            class="text-[#03B796] dark:text-[#3DD6BA] fa-lg pr-2 drop-shadow-lg"
          />TOP USER RANKING</b
        >
        <hr
          class="mx-20 mt-5 drop-shadow-lg mb-5 border-[#9C9C9C] dark:border-[#626262]"
        />
        <div
          class="flex flex-row border-2 rounded-2xl mx-10 sm:mx-20 lg:mx-28 mt-6 drop-shadow-lg h-fit border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:border-[#00B191]"
        >
          <b
            class="basis-1/4 flex justify-center text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]"
          >
            No.
          </b>
          <b
            class="basis-3/4 border-l-2 border-[#00B191] flex justify-center text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]"
          >
            User
          </b>
          <b
            class="basis-3/4 border-l-2 border-[#00B191] flex justify-center text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]"
          >
            Point
          </b>
        </div>

        <div
          class="flex flex-row border-2 rounded-2xl mx-10 sm:mx-20 lg:mx-28 mt-6 h-fit text-[#000000] border-[#BABABA] bg-[#FEFEFE] dark:text-[#FEFEFE] dark:bg-[#262626] dark:border-[#626262]"
        >
          <b
            class="basis-1/4 flex flex-col text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
          >
            <font-awesome-icon
              :icon="['fas', 'crown']"
              class="text-[#FFDF00] w-fit mx-auto"
            />
            <p class="mx-auto">1</p></b
          >
          <b
            class="basis-3/4 flex pt-3 text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex pt-3 justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row rounded-2xl mx-10 sm:mx-20 lg:mx-28 h-fi text-[#000000] dark:text-[#FEFEFE]"
        >
          <b
            class="basis-1/4 flex flex-col text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
          >
            <font-awesome-icon
              :icon="['fas', 'crown']"
              class="text-[#b8c9d5] w-fit mx-auto"
            />
            <p class="mx-auto">2</p></b
          >
          <b
            class="basis-3/4 flex pt-3 text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex pt-3 justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row border-2 rounded-2xl mx-10 sm:mx-20 lg:mx-28 h-fit text-[#000000] border-[#BABABA] bg-[#FEFEFE] dark:text-[#FEFEFE] dark:bg-[#262626] dark:border-[#626262]"
        >
          <b
            class="basis-1/4 flex flex-col text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
          >
            <font-awesome-icon
              :icon="['fas', 'crown']"
              class="text-[#8c4f4f] w-fit mx-auto"
            />
            <p class="mx-auto">3</p></b
          >
          <b
            class="basis-3/4 flex pt-3 text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex pt-3 justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row rounded-2xl py-2.5 mx-10 sm:mx-20 lg:mx-28 h-fit text-[#000000] dark:text-[#FEFEFE]"
        >
          <b
            class="basis-1/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >4</b
          >
          <b
            class="basis-3/4 flex text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row border-2 rounded-2xl py-2.5 mx-10 sm:mx-20 lg:mx-28 h-fit text-[#000000] border-[#BABABA] bg-[#FEFEFE] dark:text-[#FEFEFE] dark:bg-[#262626] dark:border-[#626262]"
        >
          <b
            class="basis-1/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >5</b
          >
          <b
            class="basis-3/4 flex text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row rounded-2xl mx-10 sm:mx-20 lg:mx-28 py-2.5 h-fit text-[#000000] dark:text-[#FEFEFE]"
        >
          <b
            class="basis-1/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >6</b
          >
          <b
            class="basis-3/4 flex text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row border-2 rounded-2xl py-2.5 mx-10 sm:mx-20 lg:mx-28 h-fit text-[#000000] border-[#BABABA] bg-[#FEFEFE] dark:text-[#FEFEFE] dark:bg-[#262626] dark:border-[#626262]"
        >
          <b
            class="basis-1/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >7</b
          >
          <b
            class="basis-3/4 flex text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row rounded-2xl mx-10 sm:mx-20 lg:mx-28 py-2.5 h-fit text-[#000000] dark:text-[#FEFEFE]"
        >
          <b
            class="basis-1/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >8</b
          >
          <b
            class="basis-3/4 flex text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row border-2 rounded-2xl py-2.5 mx-10 sm:mx-20 lg:mx-28 h-fit text-[#000000] border-[#BABABA] bg-[#FEFEFE] dark:text-[#FEFEFE] dark:bg-[#262626] dark:border-[#626262]"
        >
          <b
            class="basis-1/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >9</b
          >
          <b
            class="basis-3/4 flex text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row rounded-2xl mx-10 sm:mx-20 lg:mx-28 py-2.5 h-fit text-[#000000] dark:text-[#FEFEFE]"
        >
          <b
            class="basis-1/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >10</b
          >
          <b
            class="basis-3/4 flex text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>

        <div
          class="flex flex-row border-2 rounded-2xl py-2.5 mx-10 sm:mx-20 lg:mx-28 h-fit text-[#000000] border-[#BABABA] bg-[#FEFEFE] dark:text-[#FEFEFE] dark:bg-[#262626] dark:border-[#626262]"
        >
          <b
            class="basis-1/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >11</b
          >
          <b
            class="basis-3/4 flex text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            ><font-awesome-icon
              :icon="['fas', 'user']"
              class="basis-1/3"
            />___Name___</b
          >
          <b
            class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]"
            >0000</b
          >
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
