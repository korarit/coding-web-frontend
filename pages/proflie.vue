<template>
  <div class="h-screen dark:bg-[#0F0F0F]">
    <div class="container mx-auto p-4 max-w-5xl dark:bg-[#0F0F0F]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Profile Section - Adjusted to span two rows -->
        <div
          class="border border-[#BABABA] bg-white dark:bg-[#262626] dark:border-[#262626] rounded-xl shadow p-6 md:row-span-2 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center mb-6">
              <div
                class="w-20 h-20 bg-gray-300 border border-gray-300 mr-4 rounded-xl"
              ></div>
              <div>
                <h2 class="text-xl font-bold dark:text-[#fefefe]">พี่หน่วง</h2>
                <p class="text-gray-600 dark:text-[#ececec]">Rank 1 - 5000</p>
              </div>
            </div>
            <button
              class="border border-[#199c80] w-full bg-[#00C7A3] text-white py-2 px-4 rounded-xl hover:bg-[#199c80] active:bg-[#199c80] dark:bg-[#3DD6BA] dark:hover:bg-[#00c7a3] dark:active:bg-[#00c7a3] dark:text-[#0f0f0f]"
            >
              <font-awesome-icon :icon="['fas', 'edit']" /> Edit Profile
            </button>
            <div class="my-6">
              <h3 class="font-bold mb-2 dark:text-[#fefefe]">Languages</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  class="bg-gray-200 dark:bg-[#3d3d3d] dark:text-[#fefefe] rounded-xl px-3 py-1 text-sm"
                  >JAVA</span
                >
                <span
                  class="bg-gray-200 dark:bg-[#3d3d3d] dark:text-[#fefefe] rounded-xl px-3 py-1 text-sm"
                  >PYTHON</span
                >
                <span
                  class="bg-gray-200 dark:bg-[#3d3d3d] dark:text-[#fefefe] rounded-xl px-3 py-1 text-sm"
                  >JAVASCRIPT</span
                >
                <span
                  class="bg-gray-200 dark:bg-[#3d3d3d] dark:text-[#fefefe] rounded-xl px-3 py-1 text-sm"
                  >Algorithm</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Status Section -->
        <div
          class="border border-[#BABABA] bg-white dark:bg-[#262626] dark:border-[#262626] rounded-xl shadow p-6 flex flex-col md:flex-row gap-6"
        >
          <!-- Difficulty buttons -->
          <div class="flex flex-col gap-4">
            <div
              class="bg-green-500 text-white py-2 px-4 rounded-lg text-[10px] leading-[10px]"
            >
              Easy
              <p class="text-[8px] leading-[10px]">0/0</p>
            </div>
            <div
              class="bg-yellow-500 text-white py-2 px-4 rounded-lg text-[10px] leading-[10px]"
            >
              Medium
              <p class="text-[8px] leading-[10px]">0/0</p>
            </div>
            <div
              class="bg-red-500 text-white py-2 px-4 rounded-lg text-[10px] leading-[10px]"
            >
              Hard
              <p class="text-[8px] leading-[10px]">0/0</p>
            </div>
          </div>
          <!-- SVG and text -->
          <div class="flex-1 flex items-center justify-center md:justify-end">
            <div class="text-center md:text-right">
              <!-- SVG with 3 colors -->
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                class="relative h-40 w-40 fill-transparent"
              >
                <defs>
                  <clipPath id="bar-mask">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.3622 21.3622C5.54592 37.1784 5.54592 62.8216 21.3622 78.6378C21.9479 79.2236 21.9479 80.1734 21.3622 80.7591C20.7764 81.3449 19.8266 81.3449 19.2408 80.7591C2.25303 63.7713 2.25303 36.2287 19.2408 19.2409C36.2286 2.25305 63.7713 2.25305 80.7591 19.2409C97.7469 36.2287 97.7469 63.7713 80.7591 80.7591C80.1733 81.3449 79.2236 81.3449 78.6378 80.7591C78.052 80.1734 78.052 79.2236 78.6378 78.6378C94.454 62.8216 94.454 37.1784 78.6378 21.3622C62.8216 5.54594 37.1784 5.54594 21.3622 21.3622Z"
                    ></path>
                  </clipPath>
                </defs>

                <g clip-path="url(#bar-mask)">
                  <!-- Easy -->
                  <g
                    class="duration-400 origin-center translate-x-0 transition-all ease-[cubic-bezier(.6,1.37,.81,.97)]"
                    style="--tw-rotate: 225deg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      class="fill-transparent"
                      style="
                        stroke-width: 3;
                        stroke-linecap: round;
                        stroke-dasharray: 46.7, 217.3;
                        stroke-dashoffset: 66;
                        stroke: #14ff00;
                      "
                    ></circle>
                  </g>
                  <!-- Medium -->
                  <g
                    class="duration-400 origin-center translate-x-0 transition-all ease-[cubic-bezier(.6,1.37,.81,.97)]"
                    style="--tw-rotate: 296.78185140073083deg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      class="fill-transparent"
                      style="
                        stroke-width: 3;
                        stroke-linecap: round;
                        stroke-dasharray: 97.3673, 166.633;
                        stroke-dashoffset: 66;
                        stroke: #ffeb3b;
                      "
                    ></circle>
                  </g>
                  <!-- Hard -->
                  <g
                    class="duration-400 origin-center translate-x-0 transition-all ease-[cubic-bezier(.6,1.37,.81,.97)]"
                    style="--tw-rotate: 437.6554202192448deg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      class="fill-transparent"
                      style="
                        stroke-width: 3;
                        stroke-linecap: round;
                        stroke-dasharray: 42.0527, 221.947;
                        stroke-dashoffset: 66;
                        stroke: #f44336;
                      "
                    ></circle>
                  </g>
                </g>

                <!-- Text in the center -->
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  font-size="12"
                  font-weight="bold"
                  class="fill-black dark:fill-white"
                >
                  0/0
                </text>
                <text
                  x="50%"
                  y="58%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  font-size="8"
                  fill="gray"
                >
                  Solved
                </text>
                <text
                  x="50%"
                  y="80%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  font-size="8"
                  fill="gray"
                >
                  0 Attempting
                </text>
              </svg>
            </div>
          </div>
        </div>

        <!-- Badges Section -->
        <div
          class="border border-[#BABABA] bg-white dark:bg-[#262626] dark:border-[#262626] rounded-xl shadow p-6 flex justify-between items-center"
        >
          <div class="badge-details">
            <h3 class="text-lg font-bold dark:text-[#fefefe]">Badges</h3>
            <p class="text-sm text-gray-600 dark:text-[#ececec] mb-6">0</p>
            <div>
              <p class="text-lg font-medium dark:text-[#fefefe]">
                Locked Badge
              </p>
              <p class="text-sm text-gray-500 dark:text-[#ececec]">
                Next LeetCoding Challenge
              </p>
            </div>
          </div>

          <div class="w-20 h-20 bg-gray-200 badge-placeholder"></div>
        </div>

        <div
          class="border border-[#BABABA]dark:bg-[#262626] dark:border-[#262626] col-span-full md:col-span-2 bg-white rounded-xl shadow"
        >
          <h3
            class="text-xl font-bold text-white bg-[#00C7A3] dark:bg-[#3DD6BA] dark:text-[#0f0f0f] py-3 px-4 text-center rounded-t-lg"
          >
            โจทย์ที่ทำแล้ว
          </h3>
          <ul
            class="divide-y divide-gray-300 dark:bg-[#262626] dark:border-[#262626]"
          >
            <li v-for="n in 7" :key="n" class="flex py-3 px-4 items-center">
              <span
                class="text-lg font-medium w-8 text-right dark:text-[#fefefe]"
                >{{ n }}.</span
              >
              <span class="text-lg font-medium flex-1 ml-4 dark:text-[#fefefe]">
                โจทย์____________________________________
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
