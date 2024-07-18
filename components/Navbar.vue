<template>
    <div class="min-w-full bg-[#FEFEFE] border-b border-[#cecece] drop-shadow-md h-[64px] flex justify-between px-4 xl:px-16 2xl:px-[96px]">

        <!-- logo -->
        <div>

        </div>

        <!-- menu -->
        <div class="items-center w-fit gap-x-5 hidden xl:flex">
            <p class="text-[24px] text-[#00C7A3] font-normal text-center"> 
                หน้าหลัก
            </p>
            <p class="text-[24px] text-[#606060] font-normal text-center"> 
                โจทย์
            </p>
            <p class="text-[24px] text-[#606060] font-normal text-center"> 
                การแข่ง
            </p>
            <p class="text-[24px] text-[#606060] font-normal text-center"> 
                ชั้นเรียน
            </p>
            <button class="rounded-md drop-shadow-md bg-[#606060] hover:bg-[#303030] active:bg-[#303030] text-[20px] text-white font-medium px-3 py-[6px]">
                Sing Up
            </button>
            <button class="rounded-md drop-shadow-md bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] text-[20px] text-white font-medium px-3 py-[6px]">
                Log In
            </button>
        </div>
        <!-- mobile menu -->
        <div class="flex xl:hidden">
            <button class="text-[40px] text-[#00C7A3] hover:text-[#199c80] active:text-[#199c80] font-medium px-3 py-[6px]">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </button>
        </div>
    </div>
</template>