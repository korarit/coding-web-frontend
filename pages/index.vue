<template>
    <NuxtLayout name="defaultmain" page_name="หน้าหลัก">
        <div class=" min-h-[calc(100dvh-65px)] max-w-[100%] pt-[32px] sm:pt-[64px]">
            
            <div class="px-4 xl:px-16 2xl:px-[128px] grid grid-cols-12 content-center gap-x-5 gap-y-8 mb-[72px]">

                <div class="col-span-12 sm:col-span-7 h-fit my-auto">
                    <p class="text-[32px] sm:text-[28px] md:text-[32px] xl:text-[40px] text-[#00C7A3] text-center font-medium sm:leading-10 w-fit mx-auto">
                        ฝึกฝนทักษะการเขียนโปรแกรม
                    </p>
                    <p class="text-[32px] sm:text-[28px] md:text-[32px] xl:text-[40px] text-[#000000] text-center font-medium sm:leading-[2.6rem] w-fit mx-auto my-4 md:my-4 xl:my-12">
                        ด้วยโจทย์ที่หลากหลาย
                    </p>
                    <p class="text-[16px] sm:text-[12px] md:text-[16px] xl:text-[24px] text-[#000000] sm:leading-7 w-fit mx-auto text-center">
                        เว็บไซต์นี้มีโจทย์มากกว่า x ข้อ พร้อมทั้งการแข่งเข้าร่วมมากถึง x รายการ
                    </p>

                    <div class="flex flex-col sm:flex-row gap-x-10 gap-y-4 mx-auto w-full sm:w-fit mt-6 md:mt-8 xl:mt-12">
                        <NuxtLink to="/register" class="rounded-md bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] drop-shadow-md h-full sm:px-12  text-[24px] md:text-[28px] xl:text-[32px] 2xl:text-[40px] text-[#FEFEFE] font-medium">
                            เข้าร่วม
                        </NuxtLink>
                        <NuxtLink to="/collection" class="rounded-md bg-[#606060] hover:bg-[#303030] active:bg-[#303030] drop-shadow-md h-full sm:px-12 text-[24px] md:text-[28px] xl:text-[32px]  2xl:text-[40px]  text-[#FEFEFE] font-medium">
                            ดูโจทย์
                        </NuxtLink>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-5">
                    <img src="~/assets/img/programmer.svg" class="w-[70%] sm:w-[80%] mx-auto" />
                </div>
            </div>
            <div class="w-full">
                <img src="~/assets/img/non-square-connector-white.svg" class="w-full" />
            </div>
            <div class="bg-[#FEFEFE] border-b border-[#C2C2C2] drop-shadow-md h-fit px-4 xl:px-16 2xl:px-[128px] py-[72px] flex justify-center">
                <div class="w-full md:w-[90%] xl:w-[80%] 2xl:w-[70%] grid grid-cols-2 gap-6 h-auto">

                    <div class="col-span-2 lg:col-span-1 min-h-[310px] w-full relative">
                        <div class="absolute w-full min-h-[128px]">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#00C7A3] text-[#FEFEFE] w-[128px] h-[128px] rounded-xl flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'file-circle-check']" class="text-[96px] text-center" />
                            </div>
                        </div>
                        <div class="absolute top-[64px] z-10 bg-[#FBFBFB] rounded-t-[4px] rounded-b-xl border border-[#AFAFAF] drop-shadow-md text-[#FEFEFE] w-full min-h-[128px] h-auto">
                                <div class="w-fit mx-auto mt-[80px] mb-10">
                                    <p class="text-[24px] lg:text-[20px] xl:text-[24px] text-[#606060] leading-6 font-medium text-center mb-6">
                                        ระบบตรวจคำตอบของ code ที่ทันสมัย
                                    </p>
                                    <p class="text-[16px] text-[#606060] text-center">
                                        สามารถทราบผลลัพท์ของ code ที่ส่งเพื่อทำโจทย์<br>ได้อย่าง realtime ด้วยระบบ open source ที่ถูก<br>
                                        ปรับแต่งมาเป็นพิเศษสำหรับเว็บไซต์นี้
                                    </p>
                                </div>
                            </div>
                    </div>

                    <div class="col-span-2 lg:col-span-1 min-h-[310px]  h-fit w-full relative">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#00C7A3] text-[#FEFEFE] w-[128px] h-[128px] rounded-xl flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'code']" class="text-[84px] text-center" />
                            </div>
                            <div class="absolute top-[64px] z-10 bg-[#FBFBFB] rounded-t-[4px] rounded-b-xl border border-[#AFAFAF] drop-shadow-md text-[#FEFEFE] w-full min-h-[128px] h-auto">
                                <div class="w-full sm:w-[60%] md:w-[80%] lg:w-[83%] xl:w-[85%] 2xl:w-[75%] mx-auto mt-[80px] mb-10 ">
                                    <p class="text-[24px] lg:text-[20px] xl:text-[24px] text-[#606060] leading-6 font-medium text-center mb-6">
                                        รองรับการเขียนโปรแกรมได้หลายภาษา
                                    </p>
                                    <p class="text-[16px] text-[#606060] text-center">
                                        ด้วยระบบตรวจคำตอบ และ code editor ของเว็บไซต์นี้<br>
                                        คุณสามารถฝึกได้ทั้ง C , C++ , golang , python 2 , python 3
                                        และ อื่น ๆ และ ยังมี version ของภาษาให้เลือก
                                    </p>
                                </div>
                            </div>
                    </div>

                    <div class="col-span-2 lg:col-span-1 h-auto w-full">
                        <div class="relative w-full min-h-[310px]">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#00C7A3] text-[#FEFEFE] w-[128px] h-[128px] rounded-xl flex items-center justify-center">
                                <font-awesome-icon :icon="['far', 'id-card']" class="text-[96px] text-center" />
                            </div>
                            <div class="absolute top-[64px] z-10 bg-[#FBFBFB] rounded-t-[4px] rounded-b-xl border border-[#AFAFAF] drop-shadow-md text-[#FEFEFE] w-full min-h-[128px]">
                                <div class="w-fit mx-auto mt-[80px] mb-10">
                                    <p class="text-[24px] lg:text-[20px] xl:text-[24px] text-[#606060] leading-6 font-medium text-center mb-6">
                                        แถมคุณยังสามารถแชร์ ทักษะที่คุณฝึกได้
                                    </p>
                                    <p class="text-[16px] text-[#606060] text-center">
                                        คุณสามารถแชร์ profile ที่สร้างจากข้อมูลการฝึกฝน<br>
                                        การเขียนโปรแกรมภายในเว็บไซต์ได้
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-2 lg:col-span-1 h-auto w-full">
                        <div class="relative w-full min-h-[310px]">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#00C7A3] text-[#FEFEFE] w-[128px] h-[128px] rounded-xl flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'sliders']" class="text-[96px] text-center" />
                            </div>
                            <div class="absolute top-[64px] z-10 bg-[#FBFBFB] rounded-t-[4px] rounded-b-xl border border-[#AFAFAF] drop-shadow-md text-[#FEFEFE] w-full min-h-[128px]">
                                <div class="w-fit mx-auto mt-[80px] mb-10">
                                    <p class="text-[24px] lg:text-[20px] xl:text-[24px] text-[#606060] leading-6 font-medium text-center mb-6">
                                        หากคุณอยากจัดการแข่งขันที่นี้เหมาะสุด
                                    </p>
                                    <p class="text-[16px] text-[#606060] text-center">
                                        คุณสามารถจัดการแข่งขันการเขียนโปรแกรมภายในเว็บไซต์นี้ได้<br>
                                        เรามีระบบสุดล้ำต่าง ๆ ที่อำนวยความสะดวกให้แก่คุณ
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full h-fit py-[80px] px-4 xl:px-16 2xl:px-[128px]">
                <div class="w-[90%] h-fit flex gap-5 mx-auto flex-col md:flex-row">
                    <div class="w-[100%] md:w-[40%]">
                        <img src="~/assets/img/programmer_community.svg" class="w-[70%] mx-auto" />
                    </div>
                    <div class="w-[100%] md:w-[60%] min-h-[100%] flex items-center justify-center">
                        <div class="w-fit h-fit">
                            <div class="flex flex-col xl:flex-row items-center gap-x-6 gap-y-2">
                                <p class="text-[32px] md:text-[28px] xl:text-[32px] text-[#606060] font-medium">จำนวนผู้ใช้งานกว่า</p>
                                <p class="text-[56px] leading-8 xl:text-[64px]  text-[#00C7A3] font-medium">XXXXXX</p>
                                <p class="text-[32px] md:text-[28px] xl:text-[32px] text-[#606060] font-medium">คน</p>
                            </div>
                            <div class="w-fit h-fit mx-auto mt-4 xl:mt-10">
                                <NuxtLink to="/register" class="py-1 px-12 rounded-md bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] drop-shadow-md text-[40px] text-[#FEFEFE] font-medium">
                                    เข้าร่วมกับเรา
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>

        </div>
    </NuxtLayout>
</template>
  
<script setup lang="ts">
definePageMeta({
    auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})

const {open_modal_login} = useLoginModalControl()
const {open_modal} = useModalControl()

const openLogin = () => {
    open_modal_login()
    open_modal()
}
</script>