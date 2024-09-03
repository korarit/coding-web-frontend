<template>
  <div
    class="w-[20%] h-dvh sm:w-[15%] lg:w-[10%] bg-[#00C7A3] border-1 border-[#00C7A3] dark:bg-[#3DD6BA] dark:border-[#00B191] flex flex-col"
  >
    <button
      class="justify-center py-4 drop-shadow-md bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] dark:bg-[#3DD6BA]"
    >
      <font-awesome-icon
        :icon="['fas', 'bars']"
        class="text-[#FFFFFF] dark:text-[#0F0F0F] text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]"
      />
    </button>
    <hr class="border-2 border-[#FFFFFF] dark:border-[#C8C8C8]" />
    <button
      class="bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] border-1 rounded-2xl my-5 px-3 mx-4 py-2"
    >
      <font-awesome-icon
        :icon="['fas', 'house']"
        class="text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
      />
    </button>
    <button
      class="bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] border-1 rounded-2xl mb-5 px-3 mx-4 py-2"
    >
      <font-awesome-icon
        :icon="['fas', 'arrow-up-short-wide']"
        class="text-[20px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
      />
    </button>
    <button
      class="bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] border-1 border-[#000000] border-1 rounded-2xl mb-5 px-3 mx-4 py-2"
    >
      <font-awesome-icon
        :icon="['fas', 'business-time']"
        class="text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
      />
    </button>
    <button
      class="bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] border-1 rounded-2xl mb-5 px-4 mx-4 py-2"
    >
      <font-awesome-icon
        :icon="['fas', 'file-lines']"
        class="text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
      />
    </button>
    <button
      class="bg-[#FFFFFF] drop-shadow-md hover:bg-[#199c80] active:bg-[#199c80] border-1 rounded-2xl px-4 mx-4 py-2"
    >
      <font-awesome-icon
        :icon="['fas', 'plus']"
        class="text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]"
      />
    </button>
  </div>
</template>
