<template>
  <div class="p-8 dark:bg-[#0F0F0F]">
    <div class="flex justify-center space-x-16 mb-8 max-w-full">
      <div
        class="flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 flex w-56 h-60 dark:bg-[#262626]"
      >
        <h3 class="text-black text-base font-bold mb-2 dark:text-[#fefefe]">
          ผู้สมัครทั้งหมด
        </h3>
        <div class="flex items-center justify-center">
          <div class="relative">
            <svg class="w-32 h-32 transform rotate-180" viewBox="0 0 36 36">
              <path
                class="text-[#b7fff3]"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="text-[#27DEBF]"
                stroke-dasharray="75, 100"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            <span
              class="absolute inset-0 flex items-center justify-center font-semibold text-lg dark:text-[#fefefe]"
              >10000</span
            >
          </div>
        </div>
      </div>

      <div
        class="flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 flex w-56 h-60 dark:bg-[#2E2E2E]"
      >
        <h3 class="text-black text-base font-bold mb-2 dark:text-[#fefefe]">
          โจทย์ทั้งหมด
        </h3>
        <div class="flex items-center justify-center">
          <div class="relative">
            <svg class="w-32 h-32 transform rotate-180" viewBox="0 0 36 36">
              <path
                class="text-[#b7fff3]"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="text-[#27DEBF]"
                stroke-dasharray="75, 100"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            <span
              class="absolute inset-0 flex items-center justify-center font-semibold text-lg dark:text-[#fefefe]"
              >10000</span
            >
          </div>
        </div>
      </div>

      <div
        class="flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 flex w-56 h-60 dark:bg-[#2E2E2E]"
      >
        <h3 class="text-black text-base font-bold mb-2 dark:text-[#fefefe]">
          โจทย์ที่ทำทั้งหมด
        </h3>
        <div class="flex items-center justify-center">
          <div class="relative">
            <svg class="w-32 h-32 transform rotate-180" viewBox="0 0 36 36">
              <path
                class="text-[#b7fff3]"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="text-[#27DEBF]"
                stroke-dasharray="75, 100"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            <span
              class="absolute inset-0 flex items-center justify-center font-semibold text-lg dark:text-[#fefef1]"
              >10000</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="p-2 flex justify-center dark:bg-[#0F0F0F]">
    <div class="w-[65%]">
      <h2 class="text-xl font-semibold mb-4 dark:text-[#fefefe]">
        โจทย์ที่ถูกทำมากที่สุด
      </h2>
      <div class="overflow-x-auto rounded-xl">
        <table class="min-w-full table-auto rounded-lg dark:border-[#0f0f0f]">
          <thead>
            <tr
              class="bg-[#00C7A3] dark:bg-[#3DD6BA] text-white dark:text-[#0f0f0f]"
            >
              <th class="border px-4 py-2">No.</th>
              <th class="border px-4 py-2">รายการโจทย์</th>
              <th class="border px-4 py-2">จำนวนผู้เข้าทำโจทย์</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="index in 9"
              :key="index"
              class="bg-white border-b dark:border-[#0f0f0f] hover:bg-gray-500 dark:bg-[#262626] dark:text-[#fefefe] dark:hover:bg-[#343434]"
            >
              <td class="border px-4 py-2 text-center">{{ index }}</td>
              <td class="border px-4 py-2">
                โจทย์ _________________________________________
              </td>
              <td class="border px-4 py-2 text-center">000,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
};
</script>

<style scoped>
.table-auto th,
.table-auto td {
  text-align: center;
}
</style>
