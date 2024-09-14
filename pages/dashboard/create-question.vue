<template>
    <NuxtLayout name="dashboard">
        <h1 class="text-4xl underline font-bold mb-4 dark:text-[#FEFEFE]">เริ่มสร้างโจทย์</h1>
        <p class="text-gray-600 dark:text-[#FEFEFE] mb-6">สร้างโจทย์สุดเจ๋งเลย :3</p>
    
        <div class="border-t border-x border-gray-600 pt-10 px-12 pb-8 rounded-t-lg h-fit">
            <div class="flex w-full space-x-4 mb-6">
                <div class="flex w-fit items-center space-x-2">
                    <p class=" text-[#202020] dark:text-[#FEFEFE] text-[20px] font-medium">หัวข้อของโจทย์</p>
                    <DropdownCheckSelect 
                        block-class="w-fit"
                        customclass="w-[160px] border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between py-[2px] px-[8px] drop-shadow-md xl:text-[20px] lg:text-[16px] md:text-[16px] sm:text-[16px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                        v-model="selectIndexTopic" 
                        :list_data="TopicListName" 
                        icon="caret-down"
                        icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
                    />
                </div>
        
                <div class="flex items-center space-x-2">
                    <label for="difficulty" class="block text-[#202020] dark:text-[#FEFEFE] text-[20px] font-medium">ระดับความยาก</label>
                    <DropdownCheckSelect 
                        block-class="w-fit"
                        customclass="w-[160px] border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between py-[2px] px-[8px] drop-shadow-md xl:text-[20px] lg:text-[16px] md:text-[16px] sm:text-[16px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
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
                class="dark:bg-[#2E2E2E] border dark:border-[#282828] border-gray-300 text-[20px] placeholder:text-[#8C8C8C] dark:placeholder:text-[#A9A9A9] rounded-lg w-full px-3 py-2 focus:outline-none"
            />
            </div>
    
            <!-- แถบเครื่องมือสีเขียว -->
            <div class="mb-6">
                <RichText />
            </div>
    
            <div class="flex items-center justify-between mb-4">
                <h2 class="dark:text-[#FEFEFE] text-[24px] font-semibold ">สร้าง Test Case</h2>
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
                    class="dark:bg-[#3DD6BA] bg-[#00C7A3] border border-[#199c80] dark:border-[#066C5A] hover:bg-[#199c80] active:bg-[#199c80] text-[20px] leading-6 text-white dark:text-[#0F0F0F] py-2 px-6 rounded-lg"
                >
                    เพิ่ม Test Case
                </button>
                </div>
            </div>

            <div class="flex flex-col space-y-6 ">
                <div
                    v-for="(testCase, testCaseIndex) in testCases"
                    :key="testCaseIndex"
                    class=" w-full border overflow-hidden rounded-lg dark:border-[#2E2E2E]"
                >
                    <!-- Header with green background and "ลบ" button -->
                    <div class="flex items-center justify-between dark:text-[#FEFEFE] bg-[#E4F3F1]  dark:bg-[#262626] py-2 px-4">
                        <h2 class="text-[20px] leading-5 font-semibold">
                            Test Case {{ testCaseIndex + 1 }}
                        </h2>
                        <button
                            @click="removeTestCase(testCaseIndex)"
                            class="dark:bg-[#CC2B2D] bg-red-500 hover:bg-red-700 text-white px-6 py-[4px] text-[20px] leading-5 rounded-lg"
                        >
                            ลบ
                        </button>
                    </div>
        
                    <!-- Form section -->
                    <div class="flex p-6 space-x-8 dark:bg-[#3D3D3D]">
                        <!-- Input Fields Section -->
                        <div class="w-[55%] flex flex-col space-y-2">
                            <div class="w-full flex">
                                <div class="flex-none flex flex-col w-fit gap-y-2 mr-1">
                                    <label v-for="(input, inputIndex) in testCase.inputs" class="dark:text-[#FEFEFE] p-2 leading-[26px] w-fit text-[16px] font-medium">
                                        input line {{ inputIndex + 1 }} :
                                    </label>
                                </div>
                                <div class="flex-auto flex flex-col gap-y-2">
                                    <input
                                        v-for="(input, inputIndex) in testCase.inputs"
                                        v-model="testCase.inputs[inputIndex]"
                                        type="text"
                                        class="w-full text-[#FEFEFE] p-2 border border-gray-300 dark:border-[#1D1D1D] rounded-lg dark:bg-[#2E2E2E]"
                                    />
                                </div>
                                <!-- re input button aligned with the input fields -->
                                <div class="flex-none flex flex-col space-y-2 ml-3">
                                    <button
                                        v-for="(input, inputIndex) in testCase.inputs"
                                        @click="removeInput(testCaseIndex, inputIndex)"
                                        class="w-[40px] h-[42px] bg-red-500 hover:bg-red-700 text-white text-[18px] py-2 rounded-md"
                                    >
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                    </button>
                                </div>
                            </div>
                            <!-- Add input button aligned with the input fields -->
                            <div class="flex items-center space-x-1">
                            <label class="flex-none p-2 leading-[26px] w-fit text-[16px] font-medium opacity-0">input line 3 :</label>
                            <!-- Empty label to match the input label space -->
                            <button
                                @click="addInput(testCaseIndex)"
                                class="flex-auto w-full text-md leading-5 bg-[#606060] dark:bg-[#3DD6BA] hover:bg-[#4b4b4b] text-white dark:text-[#0F0F0F] py-3 rounded-lg"
                            >
                                เพิ่ม input
                            </button>
                            </div>
                        </div>
            
                        <!-- Textarea Section -->
                        <div class="w-[45%]">
                            <textarea
                            rows="6"
                            class="w-full h-full p-2 bg-[#2E2E2E] border border-gray-300 dark:border-[#1D1D1D] dark:placeholder:text-[#6b6b6b] rounded-lg resize-none"
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