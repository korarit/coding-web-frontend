<template>
  <NuxtLayout name="main"
    ><div
      class="max-w-[100dvw] w-dvw min-h-[100dvh] h-fit flex justify-center items-center"
    >
      <div
        class="flex gap-x-[3%] justify-center xl:justify-between 2xl:justify-around w-full lg:items-center sm:items-center md:flex-col-reverse lg:flex-row px-4 xl:px-16 2xl:px-[96px] pb-[64px] lg:pb-0"
      >
        <div
          class="w-0 sm:w-[55%] lg:w-[45%] hidden md:flex items-center justify-center"
        >
          <img
            class="hidden sm:hidden md:block xl:h-[60dvw] 2xl:h-[30dvw] 2xl:max-w-[100%] lg:w-[30dvw] lg:h-[80dvw] md:w-[35dvw] md:h-[35dvw] md:mt-[50px] xl:mt-0"
            src="/img_programmer.svg"
            alt="imageprogrammer"
          />
        </div>

        <div
          class="flex h-min-[100%] items-center w-full sm:w-fit lg:w-[30%] xl:w-[42%] 2xl:w-[30%] justify-center sm:justify-normal"
        >
          <forget />
        </div>
      </div></div
  ></NuxtLayout>
</template>
