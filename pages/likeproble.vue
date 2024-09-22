<template>
  <div
    class="h-screen p-4 bg-white dark:bg-[#1A1A1A] text-black dark:text-white flex justify-center"
  >
    <div class="max-w-6xl w-full pt-6">
      <div class="flex flex-col sm:flex-row gap-4 mb-6 pb-4">
        <div class="w-full">
          <h1 class="text-2xl pt-2">
            <font-awesome-icon
              :icon="['fas', 'book-bookmark']"
              class="text-3xl text-[#00C7A3] pr-2"
            />
            โจทย์ถูกใจ
          </h1>
        </div>
        <select
          class="w-full sm:w-[20%] bg-gray-200 dark:bg-[#2D2D2D] text-black dark:text-white p-2 rounded-lg"
        >
          <option>ความยาก</option>
          <option>ง่าย</option>
          <option>ปานกลาง</option>
          <option>ยาก</option>
        </select>
        <select
          class="w-full sm:w-[20%] bg-gray-200 dark:bg-[#2D2D2D] text-black dark:text-white p-2 rounded-lg"
        >
          <option>สถานะ</option>
          <option>ทำแล้ว</option>
          <option>ยังไม่ได้ทำ</option>
        </select>
        <select
          class="w-full sm:w-[20%] bg-gray-200 dark:bg-[#2D2D2D] text-black dark:text-white p-2 rounded-lg"
        >
          <option>Tag</option>
          <option>Python</option>
          <option>Algorithm</option>
          <option>Java</option>
          <option>JavaScript</option>
        </select>
      </div>

      <div
        v-for="problem in problems"
        :key="problem.id"
        class="w-full flex flex-col gap-2 sm:flex-row sm:justify-between border-2 border-gray-300 dark:border-[#1D1D1D] bg-white dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5 mb-4"
      >
        <div class="w-full sm:w-auto">
          <h1 class="text-black dark:text-white text-xl sm:text-2xl">
            {{ problem.title }}
          </h1>
          <span class="text-[#00C7A3]">{{ problem.difficulty }}</span>
          <span class="text-black dark:text-white"
            >, Max score {{ problem.maxScore }}, Success Rate:
            {{ problem.successRate }}%</span
          >
        </div>
        <div class="w-full sm:w-auto flex items-center gap-3 sm:gap-6">
          <button
            class="flex-auto sm:flex-none text-center text-white bg-[#00C7A3] hover:bg-[#199c80] dark:text-black dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-xl px-6 py-2 drop-shadow-md"
          >
            รายละเอียด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      problems: [
        {
          id: 1,
          title: 'Head of Problem 1',
          difficulty: 'Easy',
          maxScore: 15,
          successRate: 96.12,
        },
        {
          id: 2,
          title: 'Head of Problem 2',
          difficulty: 'Easy',
          maxScore: 15,
          successRate: 96.12,
        },
        {
          id: 3,
          title: 'Head of Problem 3',
          difficulty: 'Easy',
          maxScore: 15,
          successRate: 96.12,
        },
        {
          id: 4,
          title: 'Head of Problem 4',
          difficulty: 'Easy',
          maxScore: 15,
          successRate: 96.12,
        },
        {
          id: 5,
          title: 'Head of Problem 5',
          difficulty: 'Easy',
          maxScore: 15,
          successRate: 96.12,
        },
      ],
    };
  },
};
</script>
