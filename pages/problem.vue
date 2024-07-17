<template>
    <NuxtLayout name="main">
      <div :class="`min-h-[calc(100dvh-65px)] h-fit max-w-[100%] ${isFullscreen ? 'pt-[48px] sm:h-[64px]' : 'pt-[32px] sm:pt-[64px]'} flex flex-col`" id="main_screen">
        <div class="min-h-full h-fit px-4 xl:px-16 2xl:px-[96px] gap-x-5 gap-y-8 flex-grow">
          <!-- Your content here -->
            <splitpanes @resized="onResizedWidth" :style="`${isFullscreen ? 'height: calc(100dvh - 100px)' : 'height: calc(100dvh - 195px)'}`">
                <pane :size="paneLeftWidth" class="min-w-9 rounded-md overflow-hidden drop-shadow-md pane-discription" ref="paneRef">
                    <div class="w-full h-full bg-[#FFFFFF] border border-[#B0B0B0] rounded-md overflow-hidden drop-shadow-md">
                        <div :class="`w-full bg-[#F6F6F6] border-b border-[#B0B0B0] flex ${isVerticalLeftMode ? 'h-full justify-between vertical-mode' : 'h-9 items-center justify-between px-1'}`">
                            <div class="flex h-fit items-center gap-[2px] w-full">
                                <button class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'xmark']" class="text-[28px] text-[#6B6B6B]" />
                                </button>
                                <button :class="`hover:bg-[#e4e4e4] rounded-md ${isVerticalLeftMode ? 'h-fit py-2' : 'h-8 px-2'} flex items-center gap-2`">
                                    <font-awesome-icon :icon="['fas', 'file-lines']" class="text-[20px] text-[#00C7A3]" />
                                    <span class="text-[#000000] text-[16px] font-medium">Description</span>
                                </button>

                                <div :class="`${isVerticalLeftMode ? 'h-[1px] w-[20px]' : 'h-5 w-[1px] '} bg-[#B0B0B0]`"></div>

                                <button :class="`hover:bg-[#e4e4e4] rounded-md ${isVerticalLeftMode ? 'h-fit py-2' : 'h-8 px-2'} flex items-center gap-2`">
                                    <font-awesome-icon :icon="['fas', 'clock-rotate-left']" class="text-[20px] text-[#FFDA7A]" />
                                    <span class="text-[#6B6B6B] text-[16px] font-light">Submissions</span>
                                </button>
                            </div>

                            <div class="flex items-center gap-[4px]">
                                <button class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'share']" class="text-[24px] text-[#6B6B6B]" />
                                </button>
                                <button @click="setWidthPaneLeft(0)" v-if="paneLeftWidth > 1.5" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-[24px] text-[#6B6B6B]" />
                                </button>
                                <button @click="setWidthPaneLeft(null)" v-if="paneLeftWidth < 1.5" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-[24px] text-[#6B6B6B]" />
                                </button>
                            </div>

                        </div>
                    </div>
                </pane>
                <pane :size="paneRightWidth" class="min-w-9">
                    <splitpanes @resized="resizedHeight" horizontal>
                    <pane :size="paneEditor" class="min-h-9">
                        <div class="w-full h-full bg-[#FFFFFF] border border-[#B0B0B0] rounded-md overflow-hidden drop-shadow-md">
                            <div class="w-full bg-[#F6F6F6] border-b border-[#B0B0B0] h-9 px-1 flex items-center justify-between">
                                <div class="flex h-full items-center gap-[2px]">
                                    <div class="hover:bg-[#e4e4e4] rounded-md h-8 px-2 flex items-center gap-2">
                                        <font-awesome-icon :icon="['fas', 'code']" class="text-[20px] text-[#00C7A3]" />
                                        <span class="text-[#000000] text-[16px] font-medium">Editor</span>
                                    </div>
                                </div>

                                <div class="flex items-center gap-[4px]">
                                    <button  @click="() => setHeightEditor(0)" v-if="paneEditor > 1.5 && EditorHidden == false"  class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[24px] text-[#6B6B6B]" />
                                    </button>
                                    <button  @click="() => setHeightEditor(null)" v-if="paneEditor < 1.5 || EditorHidden == true"  class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-[24px] text-[#6B6B6B]" />
                                    </button>
                                </div>
                            </div>
                            <div class="w-full border-b border-[#B0B0B0] h-9 pl-3 pr-1 flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="relative w-fit">
                                        <button class="px-[4px] h-6 rounded-[4px] border border-[#C9C9C9] flex items-center"
                                            @click="isLangExpanded = !isLangExpanded"
                                            @blur="isLangExpanded = false"
                                        >
                                            <p class="text-[14px] text-[#6B6B6B] leading-4 mr-2">Python 3</p>
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
                                                class="absolute z-20 left-0 right-0 mt-1 w-fit bg-white border border-[#8c8c8c] divide-y rounded-md shadow-lg overflow-hidden"
                                            >
                                                <DropdownEditorLang />
                                            </div>
                                        </transition>
                                    </div>
                                    
                                    <div class="relative w-fit">
                                        <button 
                                            @click="isVersionExpanded = !isVersionExpanded"
                                            @blur="isVersionExpanded = false"
                                            class="px-[4px] h-6 rounded-[4px] border border-[#C9C9C9] flex items-center" 
                                        >
                                            <p class="text-[14px] text-[#6B6B6B] leading-4 mr-2">3.12.10</p>
                                            <font-awesome-icon :icon="['fas', 'caret-down']" class="text-[18px] h-4 text-[#6B6B6B] transition duration-300" 
                                            :class="isVersionExpanded ? 'rotate-180' : 'rotate-0'"
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
                                            v-show="isVersionExpanded"
                                            class="absolute z-20 left-0 right-0 mt-1 w-fit bg-white border border-[#8c8c8c] divide-y rounded-md shadow-lg overflow-hidden"
                                        >
                                            <DropdownLangversion />
                                        </div>
                                        </transition>
                                    </div>

                                </div>
                                <div class="flex items-center gap-[4px]">
                                    <button class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'rotate-right']" class="text-[20px] text-[#6B6B6B]" />
                                    </button>
                                    <button @click="fullScreen()" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']" v-if="isFullscreen == false" class="text-[18px] text-[#6B6B6B]" />
                                        <font-awesome-icon :icon="['fas', 'down-left-and-up-right-to-center']" v-if="isFullscreen == true" class="text-[18px] text-[#6B6B6B]" />
                                    </button>
                                </div>
                            </div>

                            <!-- Editor -->
                            <div class="w-full h-[90%] p-1">
                                <MonacoEditor lang="python" class="min-h-full border-[#000000] " :options="{overviewRulerBorder: false}" />
                            </div>
                        </div>
                    </pane>

                    <pane :size="paneTest" class="min-h-[36px]">
                        <div class="w-full h-full bg-[#FFFFFF] border border-[#B0B0B0] rounded-md overflow-hidden drop-shadow-md">
                            <div class="w-full bg-[#F6F6F6] border-b border-[#B0B0B0] h-9 px-1 flex items-center justify-between">
                                <div class="flex items-center gap-[2px]">
                                    <button class="hover:bg-[#e4e4e4] rounded-md h-8 px-2 flex items-center gap-2">
                                        <font-awesome-icon :icon="['far', 'square-check']" class="text-[20px] text-[#00C7A3]" />
                                        <span class="text-[#000000] text-[16px] font-medium">Test Case</span>
                                    </button>

                                    <div class="h-5 w-[1px] bg-[#B0B0B0]"></div>

                                    <button class="hover:bg-[#e4e4e4] rounded-md h-8 px-2 flex items-center gap-2">
                                        <font-awesome-icon :icon="['fas', 'terminal']" class="text-[20px] text-[#7FDBC1]" />
                                        <span class="text-[#6B6B6B] text-[16px] font-light">Test Result</span>
                                    </button>
                                </div>

                                <div class="flex items-center gap-[4px]">
                                    <button @click="setHeightTest(0)" v-if="paneTest > 2 && TestHidden == false" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[24px] text-[#6B6B6B]" />
                                    </button>
                                    <button @click="setHeightTest(null)" v-if="paneTest < 2  || TestHidden == true" class="hover:bg-[#e4e4e4] rounded-md h-8 w-8 flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-[24px] text-[#6B6B6B]" />
                                    </button>
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
const isLangExpanded = ref(false);
const isVersionExpanded = ref(false);

const isVerticalLeftMode = ref(false);

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


const resizedHeight = (sizes) => {
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
}

function setHeightEditor(value) {
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
}

function setHeightTest(value) {
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
}


watch(paneLeftWidth, (value) => {
    if (value <= 1.5) {
        isVerticalLeftMode.value = true;
    }else {
        isVerticalLeftMode.value = false;
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
    } else {
      console.log('No sizes data available');
    }
  });
};


function setWidthPaneLeft(value) {
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
}

const isFullscreen = ref(false);
function fullScreen() {
  const fullscreen = document.querySelector("#main_screen");

  if (!isFullscreen.value) fullscreen.requestFullscreen();
  else document.exitFullscreen();

  isFullscreen.value = !isFullscreen.value;
}


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
  