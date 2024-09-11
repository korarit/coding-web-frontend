<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl underline font-bold mb-4">เริ่มสร้างโจทย์</h1>
    <p class="text-gray-600 mb-6">สร้างโจทย์สุดเจ๋งเลย :3</p>

    <div class="border border-gray-600 mb-6 p-4 rounded-lg">
      <div class="flex mt-3 mb-6">
        <div class="flex items-center space-x-4">
          <label for="topic" class="block text-gray-700 font-medium"
            >หัวข้อของโจทย์</label
          >
          <select
            id="topic"
            v-model="selectedTopic"
            class="border border-gray-300 rounded-lg px-2 py-1"
          >
            <option value="Topic">Topic</option>
          </select>
        </div>

        <div class="flex items-center space-x-4 ml-4">
          <label for="difficulty" class="block text-gray-700 font-medium"
            >ระดับความยาก</label
          >
          <select
            id="difficulty"
            v-model="difficulty"
            class="border border-gray-300 rounded-lg px-2 py-1"
          >
            <option value="easy">ง่าย</option>
            <option value="medium">ปานกลาง</option>
            <option value="hard">ยาก</option>
          </select>
        </div>
      </div>

      <div class="mb-6">
        <input
          type="text"
          v-model="problemName"
          placeholder="ชื่อโจทย์"
          class="border border-gray-300 rounded-lg w-full px-3 py-2"
        />
      </div>

      <!-- แถบเครื่องมือสีเขียว -->
      <div class="mb-6">
        <div class="bg-[#E4F3F1] p-2 rounded-t-lg flex space-x-5 i tems-center">
          <button>
            14
            <font-awesome-icon :icon="['fas', 'chevron-up']" />
            <font-awesome-icon :icon="['fas', 'chevron-down']" />
          </button>

          <div class="border-l border-gray-400 h-6"></div>
          <button class="text-gray-700 hover:text-gray-900" @click="applyBold">
            <font-awesome-icon :icon="['fas', 'bold']" />
          </button>
          <button
            class="text-gray-700 hover:text-gray-900"
            @click="applyItalic"
          >
            <font-awesome-icon :icon="['fas', 'italic']" />
          </button>
          <button
            class="text-gray-700 hover:text-gray-900"
            @click="applyUnderline"
          >
            <font-awesome-icon :icon="['fas', 'underline']" />
          </button>
          <div class="border-l border-gray-400 h-6"></div>
          <button class="text-gray-700 hover:text-gray-900" @click="alignLeft">
            <font-awesome-icon :icon="['fas', 'align-left']" />
          </button>
          <button
            class="text-gray-700 hover:text-gray-900"
            @click="alignCenter"
          >
            <font-awesome-icon :icon="['fas', 'align-center']" />
          </button>
          <button class="text-gray-700 hover:text-gray-900" @click="alignRight">
            <font-awesome-icon :icon="['fas', 'align-right']" />
          </button>
          <div class="border-l border-gray-400 h-6"></div>
          <button
            class="text-gray-700 hover:text-gray-900"
            @click="insertUnorderedList"
          >
            <font-awesome-icon :icon="['fas', 'list-ul']" />
          </button>
          <!-- list-ol button -->
          <button
            class="text-gray-700 hover:text-gray-900"
            @click="insertOrderedList"
          >
            <font-awesome-icon :icon="['fas', 'list-ol']" />
          </button>
          <div class="border-l border-gray-400 h-6"></div>
          <button
            class="text-gray-700 hover:text-gray-900"
            @click="insertImage"
          >
            <font-awesome-icon :icon="['fas', 'image']" />
          </button>
        </div>
        <textarea
          id="problemDescription"
          v-model="description"
          rows="10"
          placeholder="รายละเอียดของโจทย์"
          class="border border-gray-300 rounded-b-lg w-full px-3 py-2"
        ></textarea>
      </div>

      <div class="mb-6">
        <label class="inline-flex items-center">
          <span class="mr-2 text-gray-700"
            >LLM Prompt ตรวจสอบตัว code ที่ส่งมา</span
          >
          <input
            type="checkbox"
            v-model="isLLMChecked"
            class="form-checkbox h-5 w-5 text-blue-600"
          />
        </label>
        <textarea
          v-if="isLLMChecked"
          v-model="llmPrompt"
          placeholder="LLM Prompt ที่ต้องการ"
          class="border border-gray-300 rounded w-full px-3 py-2 mt-4"
        ></textarea>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold mb-4">สร้าง Test Case</h2>
          <div class="flex items-center space-x-4">
            <label for="mode" class="block text-gray-700 font-medium"></label>
            <select
              id="mode"
              v-model="selectedMode"
              class="border border-gray-300 rounded-lg px-2 py-1"
            >
              <option value="Random">แบบ Random</option>
              <option value="Custom">แบบ Custom</option>
            </select>
            <button
              @click="addTestCase"
              class="bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] text-white py-2 px-6 rounded-lg"
            >
              เพิ่ม Test Case
            </button>
          </div>
        </div>

        <div
          v-for="(testCase, testCaseIndex) in testCases"
          :key="testCaseIndex"
          class="container mx-auto w-full border rounded-lg shadow-md bg-white mb-4"
        >
          <!-- Header with green background and "ลบ" button -->
          <div class="relative bg-[#E4F3F1] py-2 px-4 rounded-t-lg">
            <h2 class="text-lg font-semibold">
              Test Case {{ testCaseIndex + 1 }}
            </h2>
            <button
              @click="removeTestCase(testCaseIndex)"
              class="absolute top-1 right-2 bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-lg"
            >
              ลบ
            </button>
          </div>

          <!-- Form section -->
          <div class="grid grid-cols-5 gap-4 p-4">
            <!-- Input Fields Section -->
            <div class="col-span-3 space-y-2">
              <div
                v-for="(input, inputIndex) in testCase.inputs"
                :key="inputIndex"
                class="flex items-center space-x-2"
              >
                <label
                  :for="'input-' + inputIndex"
                  class="w-1/6 text-sm font-medium"
                >
                  input line {{ inputIndex + 1 }} :
                </label>
                <div class="flex items-center w-[85%]">
                  <input
                    :id="'input-' + inputIndex"
                    v-model="testCase.inputs[inputIndex]"
                    type="text"
                    class="flex-grow p-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    @click="removeInput(testCaseIndex, inputIndex)"
                    class="text-red-500 hover:text-red-700 ml-2"
                  >
                    <font-awesome-icon :icon="['fas', 'trash']" />
                  </button>
                </div>
              </div>
              <!-- Add input button aligned with the input fields -->
              <div class="flex items-center space-x-2">
                <label class="w-1/6"></label>
                <!-- Empty label to match the input label space -->
                <button
                  @click="addInput(testCaseIndex)"
                  class="w-[85%] bg-gray-700 hover:bg-gray-900 text-white py-2 rounded-lg"
                >
                  เพิ่ม input
                </button>
              </div>
            </div>

            <!-- Textarea Section -->
            <div class="col-span-2">
              <textarea
                rows="6"
                class="w-full p-2 border border-gray-300 rounded-lg resize-none"
                placeholder="Textarea content"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center space-x-4">
        <button
          @click="saveProblem"
          class="border border-black bg-white hover:bg-[#00C7A3] hover:text-white active:bg-[#199c80] text-black rounded-lg px-6 py-2"
        >
          บันทึกโจทย์
        </button>
        <button
          @click="cancel"
          class="border border-black bg-red-500 hover:bg-red-700 text-white rounded-lg px-6 py-2"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTopic: '',
      difficulty: '',
      problemName: '',
      description: '',
      isLLMChecked: false,
      llmPrompt: '',
      selectedMode: '', // เพิ่มแบบ Random หรือ Custom
      testCases: [
        {
          inputs: Array(4).fill(''), // 4 inputs initially
        },
      ],
    };
  },
  methods: {
    applyBold() {
      this.formatText('bold');
    },
    applyItalic() {
      this.formatText('italic');
    },
    applyUnderline() {
      this.formatText('underline');
    },
    alignLeft() {
      this.formatText('justifyLeft');
    },
    alignCenter() {
      this.formatText('justifyCenter');
    },
    alignRight() {
      this.formatText('justifyRight');
    },
    alignJustify() {
      this.formatText('justifyFull');
    },
    insertImage() {
      const url = prompt('ใส่ URL รูปภาพที่ต้องการ:');
      if (url) {
        document.execCommand('insertImage', false, url);
      }
    },
    formatText(command) {
      document.execCommand(command, false, null);
    },
    addTestCase() {
      this.testCases.push({
        inputs: Array(4).fill(''),
      });
    },
    removeTestCase(index) {
      this.testCases.splice(index, 1);
    },
    addInput(testCaseIndex) {
      this.testCases[testCaseIndex].inputs.push('');
    },
    removeInput(testCaseIndex, inputIndex) {
      this.testCases[testCaseIndex].inputs.splice(inputIndex, 1);
    },
    saveProblem() {
      console.log('โจทย์บันทึกแล้ว:', this.problemName);
    },
    cancel() {
      console.log('ยกเลิกการบันทึกโจทย์');
    },
  },
};
</script>

<style scoped>
/* Your custom styles here */
</style>
