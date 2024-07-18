<template>
    <NuxtLayout name="main">
      <div :class="`min-h-[calc(100dvh-65px)] h-fit max-w-[100%] ${isFullscreen ? 'pt-[48px] sm:h-[64px]' : 'pt-[32px] sm:pt-[64px]'} flex flex-col`" id="main_screen">
        <div class="min-h-full h-fit px-4 xl:px-16 2xl:px-[96px] gap-x-5 gap-y-8 flex-grow">
          <!-- Your content here -->
            <splitpanes @resized="onResizedWidth" :style="`${isFullscreen ? 'height: calc(100dvh - 100px)' : 'height: calc(100dvh - 195px)'}`">
                <pane :size="paneLeftWidth" class="min-w-9 rounded-md overflow-hidden drop-shadow-md pane-discription">
                    <div class="flex flex-col w-full h-full bg-[#FFFFFF] border border-[#B0B0B0] rounded-md overflow-hidden drop-shadow-md">
                        <div :class="`flex-none w-full bg-[#F6F6F6] border-b border-[#B0B0B0] flex ${isVerticalLeftMode ? 'h-full justify-between vertical-mode' : 'h-9 items-center justify-between px-1'}`">
                            <div class="flex h-fit items-center gap-[2px] w-full">
                                <button class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'xmark']" class="text-[28px] text-[#6B6B6B]" />
                                </button>
                                <button @click="ShowDiscription = true" :class="`hover:bg-[#e4e4e4] rounded-md ${isVerticalLeftMode ? 'h-fit py-2' : 'h-8 px-2'} flex items-center gap-2`">
                                    <font-awesome-icon :icon="['fas', 'file-lines']" class="text-[20px] text-[#00C7A3]" />
                                    <span :class="`text-[16px] ${ShowDiscription ? 'text-[#000000] font-medium' : 'text-[#6B6B6B] font-light' }`">Description</span>
                                </button>

                                <div  :class="`${isVerticalLeftMode ? 'h-[1px] w-[20px]' : 'h-5 w-[1px] '} bg-[#B0B0B0]`"></div>

                                <button @click="ShowDiscription = false" :class="`hover:bg-[#e4e4e4] rounded-md ${isVerticalLeftMode ? 'h-fit py-2' : 'h-8 px-2'} flex items-center gap-2`">
                                    <font-awesome-icon :icon="['fas', 'clock-rotate-left']" class="text-[20px] text-[#FFDA7A]" />
                                    <span :class="`text-[16px] ${!ShowDiscription ? 'text-[#000000] font-medium' : 'text-[#6B6B6B] font-light' }`">Submissions</span>
                                </button>
                            </div>

                            <div class="flex items-center gap-[4px]">
                                <button class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'share']" class="text-[24px] text-[#6B6B6B]" />
                                </button>
                                <button @click="setWidthPaneLeft(0)" v-show="paneLeftWidth > 1.5" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-[24px] text-[#6B6B6B]" />
                                </button>
                                <button @click="setWidthPaneLeft(null)" v-show="paneLeftWidth < 1.5" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-[24px] text-[#6B6B6B]" />
                                </button>
                            </div>

                        </div>

                        <!-- Discription Box -->
                         <div v-if="ShowDiscription" class="flex-auto w-full h-full pt-4">
                            <p class="text-[32px] font-medium">
                                1. โจทย์
                            </p>
                         </div>
                         <div v-else class="flex-auto w-full h-full">
                            <div class="w-full px-3 border-b border-[#d9d9d9] flex gap-x-3 py-2">
                                <div class="relative w-fit" :ref="el => { if (el) dropdownRef[0] = el }">
                                    <button 
                                        @click="dropdown_table_status['submission_status'] = !dropdown_table_status['submission_status']" 
                                        class="flex items-center gap-x-2 text-[#616161] hover:text-[#353535] w-[212px]"
                                    >
                                        <p class="text-[18px] font-light leading-5">{{ submission_status[submission_type_id] }}</p>
                                        <font-awesome-icon 
                                                :icon="['fas','chevron-down']" 
                                                class="text-[18px] h-4 transition duration-300"
                                                :class="dropdown_table_status['submission_status'] ? 'rotate-180' : 'rotate-0'"
                                        />
                                    </button>
                                    <transition
                                        enter-active-class="transform transition duration-500 ease-custom"
                                        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                        enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-active-class="transform transition duration-300 ease-custom"
                                        leave-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
                                    >
                                    <div
                                        v-show="dropdown_table_status['submission_status']"
                                        tabindex="1"
                                        class="absolute z-20 left-0 right-0 mt-1 w-full bg-white border border-[#8c8c8c] divide-y rounded-md shadow-lg overflow-hidden"
                                    >
                                        <DropdownCheckSelect v-model="submission_type_id" :list_data="submission_status" />
                                    </div>
                                    </transition>
                                </div>
                                <div class="relative w-fit" :ref="el => { if (el) dropdownRef[1] = el }">
                                    <button 
                                        @click="dropdown_table_status['submission_lang'] = !dropdown_table_status['submission_lang']" 
                                        class="flex items-center gap-x-2 text-[#616161] hover:text-[#353535] w-[164px]"
                                    >
                                        <p class="text-[18px] font-light leading-5">{{ LanguageListName[submission_status_id] }}</p>
                                        <font-awesome-icon 
                                                :icon="['fas','chevron-down']" 
                                                class="text-[18px] h-4 transition duration-300"
                                                :class="dropdown_table_status['submission_lang'] ? 'rotate-180' : 'rotate-0'"
                                        />
                                    </button>
                                    <transition
                                        enter-active-class="transform transition duration-500 ease-custom"
                                        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                        enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-active-class="transform transition duration-300 ease-custom"
                                        leave-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
                                    >
                                    <div
                                        v-show="dropdown_table_status['submission_lang']"
                                        class="absolute z-20 left-0 right-0 mt-1 w-full bg-white border border-[#8c8c8c] divide-y rounded-md shadow-lg overflow-hidden"
                                    >
                                        <DropdownCheckSelect tabindex="1" v-model="submission_status_id" :list_data="LanguageListName" />
                                    </div>
                                    </transition>
                                </div>
                                <div class="flex items-center gap-x-2 text-[#616161] hover:text-[#353535] pr-12">
                                    <p class="text-[18px] font-light leading-5">Runtime</p>
                                </div>
                                <div class="flex items-center gap-x-2 text-[#616161] hover:text-[#353535] pr-12">
                                    <p class="text-[18px] font-light leading-5">Memory</p>
                                </div>
                            </div>
                         </div>

                    </div>
                </pane>

                <pane :size="paneRightWidth" class="min-w-9">
                    <splitpanes @resized="resizedHeight" horizontal>
                    <pane :size="paneEditor" class="min-h-9">
                        <div class="flex flex-col w-full h-full bg-[#FFFFFF] border border-[#B0B0B0] rounded-md overflow-hidden drop-shadow-md">

                            <div :class="`flex-none w-full bg-[#F6F6F6] border-b border-[#B0B0B0] flex   ${isVerticalRightMode ? 'h-full justify-between vertical-mode' : 'h-9 items-center justify-between px-1'}`">
                                    <div @mouseover="expandButtonShow(0, false)" v-show="statusShowTitle[0]" :class="`flex items-center hover:bg-[#e4e4e4] rounded-md gap-2 ${isVerticalRightMode ? 'h-fit py-2' : 'h-8 px-2'}`">
                                        <font-awesome-icon :icon="['fas', 'code']" :class="`text-[20px] text-[#00C7A3] ${isVerticalRightMode ? 'rotate-90	' : null}`" />
                                        <span class="text-[#000000] text-[16px] font-medium">Editor</span>
                                    </div>

                                    <button  @click="() => setHeightEditor(0)" v-show="paneEditor > 1.5 && EditorHidden == false"  class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[24px] text-[#6B6B6B]" />
                                    </button>
                                    <button @blur="expandButtonShow(0, true)" @mouseleave="expandButtonShow(0, true)"  @click="() => setHeightEditor(null)" v-show="paneEditor < 1.5 || EditorHidden == true"  class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-[24px] text-[#6B6B6B]" />
                                    </button>
                            </div>

                            <div class="flex-none w-full border-b border-[#B0B0B0] h-9 pl-3 pr-1 flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="relative w-fit" :ref="el => { if (el) dropdownRef[2] = el }">
                                        <button class="px-[4px] h-6 rounded-[4px] border border-[#C9C9C9] flex items-center"
                                            @click="isLangExpanded = !isLangExpanded"
                                        >
                                            <p class="text-[14px] text-[#6B6B6B] leading-4 mr-2">{{ LanguageEditor.name }}</p>
                                            <font-awesome-icon :icon="['fas', 'caret-down']" 
                                                class="text-[18px] h-4 text-[#6B6B6B] transition duration-300"
                                                :class="isLangExpanded ? 'rotate-180' : 'rotate-0'"
                                            />
                                        </button>

                                        <transition
                                            enter-active-class="transform transition duration-500 ease-custom"
                                            enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                            enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                            leave-active-class="transform transition duration-300 ease-custom"
                                            leave-class="translate-y-0 scale-y-100 opacity-100"
                                            leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
                                        >
                                            <div
                                                v-show="isLangExpanded"
                                                tabindex="1"
                                                class="absolute z-20 left-0 right-0 mt-1 w-fit bg-white border border-[#8c8c8c] divide-y rounded-md shadow-lg overflow-hidden"
                                            >
                                                <DropdownEditorLang v-model="LanguageEditor" />
                                            </div>
                                        </transition>
                                    </div>

                                </div>
                                <div class="flex items-center gap-[4px]">
                                    <button class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'rotate-right']" class="text-[20px] text-[#6B6B6B]" />
                                    </button>
                                    <button @click="fullScreen()" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']" v-show="isFullscreen == false" class="text-[18px] text-[#6B6B6B]" />
                                        <font-awesome-icon :icon="['fas', 'down-left-and-up-right-to-center']" v-show="isFullscreen == true" class="text-[18px] text-[#6B6B6B]" />
                                    </button>
                                </div>
                            </div>

                            <!-- Editor -->
                            <div class="flex-auto w-full p-1 overflow-hidden min-h-0">
                                <MonacoEditor ref="editorRef" :options="{minimap: { enabled: false }}" v-model="codeSave" :lang="LanguageEditor.lang" class="min-h-full border-[#000000] " />
                            </div>

                            <div class="flex-none px-3 py-2 flex items-center justify-between border-t border-[#B0B0B0]">
                                <p class="text-[14px] text-[#6B6B6B]">Line {{ currentLine }} Col {{ currentColumn }}</p>

                                <div class="flex gap-x-2">
                                    <button class=" bg-[#606060] hover:bg-[#303030] py-1 px-4 text-[#FEFEFE] text-[16px] font-medium  drop-shadow-md rounded">
                                        Run
                                    </button>

                                    <button class=" bg-[#00C7A3] hover:bg-[#199c80] py-1 px-4 text-[#FEFEFE] text-[16px] font-medium  drop-shadow-md rounded">
                                        Summit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </pane>

                    <pane :size="paneTest" class="min-h-[36px]">
                        <div class="w-full h-full bg-[#FFFFFF] border border-[#B0B0B0] rounded-md overflow-hidden drop-shadow-md">
                            
                            <!-- head title test -->
                            <div :class="`w-full bg-[#F6F6F6] border-b border-[#B0B0B0] flex ${isVerticalRightMode ? 'h-full justify-between vertical-mode' : 'h-9 items-center justify-between px-1'}`">
                                <div class="flex h-full items-center gap-[2px]" v-show="statusShowTitle[1]">
                                    <button :class="`hover:bg-[#e4e4e4] rounded-md flex items-center gap-2 ${isVerticalRightMode ? 'h-fit py-2' : 'h-8 px-2'}`">
                                        <font-awesome-icon @mouseover="expandButtonShow(1, false)" :icon="['far', 'square-check']" :class="`text-[20px] text-[#00C7A3] ${isVerticalRightMode ? 'rotate-90' : null}`" />
                                        <span class="text-[#000000] text-[16px] font-medium">Test Case</span>
                                    </button>

                                    <div class="h-5 w-[1px] bg-[#B0B0B0]"></div>

                                    <button :class="`hover:bg-[#e4e4e4] rounded-md h-8 px-2 flex items-center gap-2 ${isVerticalRightMode ? 'h-fit py-2' : 'h-8 px-2'}`">
                                        <font-awesome-icon :icon="['fas', 'terminal']" class="`text-[20px] text-[#7FDBC1] ${isVerticalRightMode ? 'rotate-90' : null}`" />
                                        <span class="text-[#6B6B6B] text-[16px] font-light">Test Result</span>
                                    </button>
                                </div>

                                <div class="flex items-center gap-[4px]">
                                    <button @click="setHeightTest(0)" v-show="paneTest > 2 && TestHidden == false" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[24px] text-[#6B6B6B]" />
                                    </button>
                                    <button @blur="expandButtonShow(1, true)" @mouseleave="expandButtonShow(1, true)" @click="setHeightTest(null)" v-show="paneTest < 2  || TestHidden == true" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-[24px] text-[#6B6B6B]" />
                                    </button>
                                </div>
                            </div>

                            <!-- test cases -->
                            <div class="w-full h-[calc(100%-36px)] p-3">
                                <div class="flex gap-x-3">
                                    <button class="bg-[#F9F9F9] hover:bg-[#e2e2e2] active:bg-[#e2e2e2] border border-[#AEAEAE] rounded-md py-[2px] px-3 text-[16px] text-[#202020]">
                                        Case 1
                                    </button>
                                    <button class="bg-[#F9F9F9] hover:bg-[#e2e2e2] active:bg-[#e2e2e2] border border-[#AEAEAE] rounded-md py-[2px] px-3 text-[16px] text-[#202020]">
                                        Case 2
                                    </button>
                                    <button class="bg-[#F9F9F9] hover:bg-[#e2e2e2] active:bg-[#e2e2e2] border border-[#AEAEAE] rounded-md py-[2px] px-3 text-[16px] text-[#202020]">
                                        Case 3
                                    </button>
                                    <button class=" hover:bg-[#e2e2e2] active:bg-[#e2e2e2] flex items-center justify-center rounded-md h-[36px] w-[36px] text-[28px] text-[#202020]">
                                        <font-awesome-icon :icon="['fas', 'plus']" />
                                    </button>
                                </div>

                                <div class="w-full h-px bg-[#AEAEAE] my-3"></div>

                                <div class="flex flex-col gap-y-3 min-w-full">
                                    <div class="flex items-center w-full gap-x-3">
                                        <p class="text-[16px] text-[#202020] flex-none leading-4">Input line</p>
                                        <input type="text" 
                                            class="flex-auto h-8 border border-[#AEAEAE] rounded-md px-2 text-[16px] text-[#202020] placeholder:text-[16px] placeholder:font-light placeholder:text-[#AEAEAE] shadow-inner"
                                            placeholder="1"
                                        />
                                    </div>
                                    <div class="flex items-center w-full gap-x-3">
                                        <p class="text-[16px] text-[#202020] flex-none leading-4">Input line</p>
                                        <input type="text" 
                                            class="flex-auto h-8 border border-[#AEAEAE] rounded-md px-2 text-[16px] text-[#202020] placeholder:text-[16px] placeholder:font-light placeholder:text-[#AEAEAE] shadow-inner"
                                            placeholder="2"
                                        />
                                    </div>
                                    <div class="flex items-center w-full gap-x-3">
                                        <p class="text-[16px] text-[#202020] flex-none leading-4">Input line</p>
                                        <input type="text" 
                                            class="flex-auto h-8 border border-[#AEAEAE] rounded-md px-2 text-[16px] text-[#202020] placeholder:text-[16px] placeholder:font-light placeholder:text-[#AEAEAE] shadow-inner"
                                            placeholder="3"
                                        />
                                    </div>
                                    <div class="flex items-center w-full gap-x-3">
                                        <p class="text-[16px] text-[#202020] flex-none leading-4">Input Add </p>
                                        <button class="flex-auto bg-[#606060] hover:bg-[#303030] active:bg-[#303030] drop-shadow-md rounded-md py-[6px] px-3 text-[16px] font-medium text-[#FEFEFE]">
                                            เพิ่ม input
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </pane>
                    </splitpanes>
                </pane>
            </splitpanes>

        </div>
      </div>
    </NuxtLayout>
  </template>
<script setup>
import submission_status from '~/assets/json/submission_status.json'
import EditorLang from '~/assets/json/editor_lang.json';

//get list of language name
const LanguageListName = ref([]);
LanguageListName.value.push('ภาษา');
EditorLang.filter((data) => {
    LanguageListName.value.push(data.name);
})

const isLangExpanded = ref(false);
const isVersionExpanded = ref(false);

const isVerticalLeftMode = ref(false);
const isVerticalRightMode = ref(false);


const paneLeftWidth = ref(50);
const paneLeftWidthOld = ref(0);
const paneRightWidth = ref(50);
const paneRightWidthOld = ref(0);


const paneEditorOld = ref(0);
const paneTestOld = ref(0);

const paneEditor = ref(60);
const EditorHidden = ref(false);

const paneTest = ref(40);
const TestHidden = ref(false);
const statusShowTitle = ref([
    true, // Editor
    true, // Test Case
]);

const resizedHeight = (sizes) => {
    nextTick(() => {
    //change height of pane

    paneEditorOld.value = sizes[0].size;
    paneTestOld.value = sizes[1].size;

    paneEditor.value = sizes[0].size;
    paneTest.value = sizes[1].size;

    if(sizes[0].size <= 1.5){
        EditorHidden.value = true;
    }else{
        EditorHidden.value = false;
    }
    console.log(sizes[1]);

    if(sizes[1].size < 1.5){
        TestHidden.value = true;
    }else{
        TestHidden.value = false;
    }
    });
}

function expandButtonShow(show, status) {
    //hide expand button
    if(paneRightWidth.value > 6 || paneRightWidthOld.value > 6){
        return;
    }
    if(paneEditor.value < 6 || paneTest.value < 6 ){
        if(status == false){
            statusShowTitle.value[show] = false;
        }else{
            statusShowTitle.value[show] = true;
        }
    }else{
        statusShowTitle.value[show] = true;
    }

}

function setHeightEditor(value) {
    nextTick(() => {
        if(value != null && paneEditorOld.value == 0 && paneTestOld.value == 0){
            paneEditorOld.value = paneEditor.value;
            paneTestOld.value = paneTest.value;
        }

        if (value != null) {
            paneEditor.value = value;
            paneTest.value = 100 - value;
        }else{

            if(paneEditorOld.value < 6 || EditorHidden.value == true){
                paneEditor.value = 60;
                paneTest.value = 40;
                EditorHidden.value = false;

                console.log('1');
            }else if (paneEditorOld.value > 6 ||  paneTestOld.value > 6){
                paneEditor.value = paneEditorOld.value;
                paneTest.value = paneTestOld.value;

                console.log('2');
            }
        }
    });
}

function setHeightTest(value) {
    nextTick(() => {
    if(value != null && paneEditorOld.value == 0 && paneTestOld.value == 0){
        paneEditorOld.value = paneEditor.value;
        paneTestOld.value = paneTest.value;
    }



    if (value != null) {
        paneEditor.value = 100 - value;
        paneTest.value = value;

        TestHidden.value = false;
    }else{
        if( paneTestOld.value < 6 || TestHidden.value == true){
            paneEditor.value = 60;
            paneTest.value = 40;

            TestHidden.value = false;
            return
        }
        if (paneTestOld.value > 6){
            paneEditor.value = paneEditorOld.value;
            paneTest.value = paneTestOld.value;

            console.log('2');

        }
        
    }
    });
}


watch(paneLeftWidth, (value) => {
    if (value <= 1.5) {
        isVerticalLeftMode.value = true;
    }else {
        isVerticalLeftMode.value = false;
    }

});

watch(paneRightWidth, (value) => {
    if (value <= 1.5) {
        isVerticalRightMode.value = true;
    }else {
        isVerticalRightMode.value = false;
    }

});

const onResizedWidth = (sizes) => {
  nextTick(() => {
    if (sizes && sizes.length > 0) {

        paneLeftWidthOld.value = sizes[0].size;
        paneRightWidthOld.value = sizes[1].size;

        paneLeftWidth.value = sizes[0].size;
        paneRightWidth.value = sizes[1].size;
      
        isVerticalLeftMode.value = sizes[0].size <= 1.5;
        isVerticalRightMode.value = sizes[1].size <= 1.5;

    } else {
      console.log('No sizes data available');
    }
  });
};


function setWidthPaneLeft(value) {
    nextTick(() => {
    if(value != null && paneLeftWidthOld.value == 0 && paneRightWidthOld.value == 0){
        paneLeftWidthOld.value = paneLeftWidth.value;
        paneRightWidthOld.value = paneRightWidth.value;
    }



    if (value != null) {
        paneRightWidth.value = 100 - value;
        paneLeftWidth.value = value;

        isVerticalLeftMode.value = false;
    }else{
        if( paneLeftWidthOld.value < 6){
            paneLeftWidth.value = 50;
            paneRightWidth.value = 50;

            isVerticalLeftMode.value = false;
            return
        }
        if (paneLeftWidthOld.value > 6){
            paneLeftWidth.value = paneLeftWidthOld.value;
            paneRightWidth.value = paneRightWidthOld.value;

            console.log('2');

        }
        
    }
    });
}

const isFullscreen = ref(false);
function fullScreen() {
  nextTick(() => {
    const fullscreenElement = document.querySelector("#main_screen");
    if (fullscreenElement) {
      fullscreenElement.requestFullscreen();
    } else {
      console.error("Element not found");
    }
  });
}





//////////////////////// Editor //////////////////////////
const LanguageEditor = ref({
    lang: "python",
    name: "Python 3",
    version: "3.9.1"
});
const codeSave = ref("");
const editorRef = ref(null);


// ตัวแปรเก็บค่า cursor และ column ปัจจุบัน
const currentLine = ref(0)
const currentColumn = ref(0)

onMounted(() => {
  nextTick(() => {
    const editorInstance = editorRef.value?.$editor;

    if (editorInstance) {

        editorInstance.onDidFocusEditorText(() => {
            const position = editorInstance.getPosition();
            currentLine.value = position.lineNumber;
            currentColumn.value = position.column;
        });

        editorInstance.onDidBlurEditorText(() => {
            currentLine.value = 0;
            currentColumn.value = 0;
        });

        editorInstance.onMouseDown((e) => {
            const position = editorInstance.getPosition();
            currentLine.value = position.lineNumber;
            currentColumn.value = position.column;
        });

    
        editorInstance.onDidChangeCursorPosition((e) => {
            const position = editorInstance.getPosition();
            currentLine.value = position.lineNumber;
            currentColumn.value = position.column;
        });

    }
  });
});


//////////////////////// Discription And Submission //////////////////////////
const ShowDiscription = ref(true);

const dropdown_table_status = ref({
    submission_status: false,
    submission_lang: false
});

const dropdownRef = ref([
    'submission_status',
    'submission_lang'
]);
const closeDropdown = (event) => {
  if (dropdownRef.value[0] && !dropdownRef.value[0].contains(event.target)) {
    dropdown_table_status.value['submission_status'] = false
  }

    if (dropdownRef.value[1] && !dropdownRef.value[1].contains(event.target)) {
        dropdown_table_status.value['submission_lang'] = false
    }

    if (dropdownRef.value[2] && !dropdownRef.value[2].contains(event.target)) {
        isLangExpanded.value = false
    }
}


onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

// submission status table select
const submission_type_id = ref(0);
const submission_status_id = ref(0);
watch(submission_type_id, (value) => {
    console.log(value);
});

</script>
<style>
.splitpanes--vertical > .splitpanes__splitter {
  min-width: 20px;
}

.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 20px;
}
.pane-description {
  transition: all 0.3s;
}

.inner-content {
  transition: all 0.3s;
}

.vertical-mode {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(0deg);
}


#main_screen {
  background-color: #FEFEFE;
}

/* CSS เพื่อลบกรอบสีฟ้า */
.monaco-editor {
  --vscode-focusBorder: transparent !important;
}


</style>
  