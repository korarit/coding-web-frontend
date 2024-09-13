<template>
    <NuxtLayout name="dashboard">
        <h1 class="text-2xl underline font-bold mb-4">เริ่มสร้างโจทย์</h1>
        <p class="text-gray-600 mb-6">สร้างโจทย์สุดเจ๋งเลย :3</p>
    
        <div class="border-t border-x border-gray-600 pt-4 px-4 pb-8 rounded-t-lg h-fit">
            <div class="flex w-full space-x-4 mb-6">
                <div class="flex w-fit items-center space-x-2">
                    <p class=" text-[#202020] text-[20px] font-medium">หัวข้อของโจทย์</p>
                    <DropdownCheckSelect 
                        block-class="w-fit"
                        customclass="w-[160px] border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-[4px] drop-shadow-md xl:text-[20px] lg:text-[16px] md:text-[16px] sm:text-[16px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                        v-model="selectIndexTopic" 
                        :list_data="TopicListName" 
                        icon="caret-down"
                        icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
                    />
                </div>
        
                <div class="flex items-center space-x-2">
                    <label for="difficulty" class="block text-[#202020] text-[20px] font-medium">ระดับความยาก</label>
                    <DropdownCheckSelect 
                        block-class="w-fit"
                        customclass="w-[160px] border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-[4px] drop-shadow-md xl:text-[20px] lg:text-[16px] md:text-[16px] sm:text-[16px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                        v-model="selectIndexTopic" 
                        :list_data="TopicListName" 
                        icon="caret-down"
                        icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
                    />
                </div>
            </div>
    
            <div class="mb-6">
            <input
                type="text"
                v-model="problemName"
                placeholder="ชื่อโจทย์"
                class="text-[20px] border border-gray-300 placeholder:text-[#8C8C8C] rounded-lg w-full px-3 py-2"
            />
            </div>
    
            <!-- แถบเครื่องมือสีเขียว -->
            <div class="mb-6">
            <div class="bg-[#E4F3F1] p-2 rounded-t-lg flex tems-center space-x-8">

                <div class="flex items-center space-x-3">

                    <div class="flex items-center h-[20px] space-x-1">
                        <input value="14" class="text-[20px] text-center leading-5 p-[2px] w-[24px] bg-transparent focus:bg-white rounded-sm">

                        <div class="flex flex-col space-y-[2px]">
                            <button class="h-[6px] flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[10px]" />
                            </button>
                            <button class="h-[6px] flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-[10px]" />
                            </button>
                        </div>
                
                    </div>

                    <button class="h-[20px] flex items-center text-gray-700 hover:text-gray-900" @click="applyBold">
                        <font-awesome-icon :icon="['fas', 'bold']" />
                    </button>

                    <button
                        class="h-[20px] flex items-center text-gray-700 hover:text-gray-900"
                        @click="applyItalic"
                    >   
                        <font-awesome-icon :icon="['fas', 'italic']" />
                    </button>
                    <button
                        class="h-[20px] flex items-center text-gray-700 hover:text-gray-900"
                        @click="applyUnderline"
                    >
                        <font-awesome-icon :icon="['fas', 'underline']" />
                    </button>

                    <button
                        class="h-[20px] flex items-center text-gray-700 hover:text-gray-900"
                        @click="applyUnderline"
                    >
                        <font-awesome-icon :icon="['fas', 'strikethrough']" />
                    </button>

                </div>


                <div class="flex items-center space-x-3">
                    <button class="h-[20px] flex items-center text-gray-700 hover:text-gray-900" @click="alignLeft">
                        <font-awesome-icon :icon="['fas', 'align-left']" />
                    </button>
                    <button
                        class="h-[20px] flex items-center text-gray-700 hover:text-gray-900"
                        @click="alignCenter"
                    >
                        <font-awesome-icon :icon="['fas', 'align-center']" />
                    </button>
                    <button class="h-[20px] flex items-center text-gray-700 hover:text-gray-900" @click="alignRight">
                        <font-awesome-icon :icon="['fas', 'align-right']" />
                    </button>
                </div>

                <div class="flex items-center space-x-3">
                    <button
                        class="h-[20px] flex items-center text-gray-700 hover:text-gray-900"
                        @click="insertUnorderedList"
                    >
                        <font-awesome-icon :icon="['fas', 'list-ul']" />
                    </button>
                    <!-- list-ol button -->
                    <button
                        class="h-[20px] flex items-center text-gray-700 hover:text-gray-900"
                        @click="insertOrderedList"
                    >
                        <font-awesome-icon :icon="['fas', 'list-ol']" />
                    </button>
                </div>

                <div class="flex items-center space-x-3">
                    <button
                        class="h-[20px] flex items-center text-gray-700 hover:text-gray-900"
                        @click="insertImage"
                    >
                        <font-awesome-icon :icon="['fas', 'code']" />
                    </button>
                    <button
                        class="h-[20px] flex items-center text-gray-700 hover:text-gray-900"
                        @click="insertImage"
                    >
                    <font-awesome-icon :icon="['fas', 'image']" />
                </button>
                </div>
            </div>
            <textarea
                id="problemDescription"
                v-model="description"
                rows="10"
                placeholder="รายละเอียดของโจทย์"
                class="border border-gray-300 placeholder:text-[#8C8C8C] rounded-b-lg w-full px-3 py-2"
            ></textarea>
            </div>
    
            <div class="mb-6">
            <label class="inline-flex items-center">
                <span class="mr-2 text-[20px]"
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
                class="border border-gray-300 placeholder:text-[#8C8C8C] rounded w-full px-3 py-2 mt-4"
            ></textarea>
            </div>
    
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-[24px] font-semibold ">สร้าง Test Case</h2>
                <div class="flex items-center space-x-4">
                <label for="mode" class="block text-gray-700 font-medium"></label>
                <select
                    id="mode"
                    class="border border-gray-300 rounded-lg px-2 py-1"
                >
                    <option value="Random">Random</option>
                    <option value="Custom">Genarate By Code</option>
                </select>
                <button
                    @click="addTestCase"
                    class="bg-[#00C7A3] border border-[#199c80] hover:bg-[#199c80] active:bg-[#199c80] text-[20px] leading-6 text-white py-2 px-6 rounded-lg"
                >
                    เพิ่ม Test Case
                </button>
                </div>
            </div>

            <div class="flex flex-col space-y-6">
                <div
                    v-for="(testCase, testCaseIndex) in testCases"
                    :key="testCaseIndex"
                    class=" w-full border rounded-lg shadow-md bg-white"
                >
                    <!-- Header with green background and "ลบ" button -->
                    <div class="flex items-center justify-between bg-[#E4F3F1] py-2 px-4 rounded-t-lg">
                        <h2 class="text-[20px] leading-5 font-semibold">
                            Test Case {{ testCaseIndex + 1 }}
                        </h2>
                        <button
                            @click="removeTestCase(testCaseIndex)"
                            class=" bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-lg"
                        >
                            ลบ
                        </button>
                    </div>
        
                    <!-- Form section -->
                    <div class="flex p-6 space-x-8">
                        <!-- Input Fields Section -->
                        <div class="w-[55%] flex flex-col gap-y-2">
                            <div
                                v-for="(input, inputIndex) in testCase.inputs"
                                :key="inputIndex"
                                class="w-full flex items-center"
                            >
                                <label :for="'input-' + inputIndex" class="mr-[1%] w-[11%] text-md font-medium">
                                    input line {{ inputIndex + 1 }} :
                                </label>
                                <input
                                    :id="'input-' + inputIndex"
                                    v-model="testCase.inputs[inputIndex]"
                                    type="text"
                                    class="flex-grow p-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    @click="removeInput(testCaseIndex, inputIndex)"
                                    class="ml-[1.5%] w-[5%] bg-red-500 hover:bg-red-700 text-white text-[18px] py-2 rounded-md"
                                >
                                <font-awesome-icon :icon="['fas', 'trash']" />
                                </button>
                            </div>
                            <!-- Add input button aligned with the input fields -->
                            <div class="flex items-center space-x-2">
                            <label class="w-[11%]"></label>
                            <!-- Empty label to match the input label space -->
                            <button
                                @click="addInput(testCaseIndex)"
                                class="w-[89%] text-md leading-5 bg-[#606060] hover:bg-[#4b4b4b] text-white py-3 rounded-lg"
                            >
                                เพิ่ม input
                            </button>
                            </div>
                        </div>
            
                        <!-- Textarea Section -->
                        <div class="w-[45%]">
                            <textarea
                            rows="6"
                            class="w-full h-full p-2 border border-gray-300 rounded-lg resize-none"
                            placeholder="Output ที่คาดหวัง"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>


            <div class="flex justify-center items-center mt-8 space-x-4">
                <button
                    @click=""
                    class="border border-black bg-white hover:bg-[#00C7A3] hover:text-white active:bg-[#199c80] text-black rounded-lg px-6 py-2"
                >
                    บันทึกโจทย์
                </button>
                <button
                    @click=""
                    class="border border-black bg-red-500 hover:bg-red-700 text-white rounded-lg px-6 py-2"
                >
                    ยกเลิก
                </button>
            </div>

            </div>
    

    </NuxtLayout>
</template>
  
<script setup lang="ts">
const selectIndexTopic = ref<number>(0);
const TopicListName = ref<any>([]);
const TopicData = ref<any>([]);
TopicListName.value.push('Topic');

const load_topic = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/topic')
  const data = await response.json()
  
  const list_data = data.data.topic_list
  TopicData.value = list_data

  list_data.forEach((element: any) => {
    TopicListName.value.push(element['name']);
  });
}

onMounted(() => {
  load_topic();
});

///////////////////////////////// Test Case //////////////////////////////////
const testCases = ref<any>([]);

const addTestCase = () => {
  testCases.value.push({
    inputs: ['','',''],
    expectedOutput: '',
  });
};

const removeTestCase = (index: number) => {
  testCases.value.splice(index, 1);
};

const addInput = (testCaseIndex: number) => {
  testCases.value[testCaseIndex].inputs.push('');
};

const removeInput = (testCaseIndex: number, inputIndex: number) => {
  testCases.value[testCaseIndex].inputs.splice(inputIndex, 1);
};

onMounted(() => {
  addTestCase();
});


const isLLMChecked = ref<boolean>(false);
const problemName = ref<string>('');
const llmPrompt = ref<string>('');
</script>