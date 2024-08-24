<template>
    <div class="flex flex-col w-full h-full bg-[#FFFFFF] dark:bg-[#262626] border border-[#B0B0B0] dark:border-[#545454] rounded-md overflow-hidden drop-shadow-md">

        <div :class="`flex-none w-full bg-[#F6F6F6] dark:bg-[#3D3D3D] border-b border-[#B0B0B0] dark:border-[#545454] flex   ${isVerticalRightMode ? 'h-full justify-between vertical-mode' : 'h-9 items-center justify-between px-1'}`">
            <div @mouseover="expandButtonShow(0, false)" v-show="statusShowTitle"
                :class="`flex items-center rounded-md gap-2 ${isVerticalRightMode ? 'h-fit py-2' : 'h-8 px-2'}`">
                <font-awesome-icon :icon="['fas', 'code']"
                    :class="`text-[20px] text-[#00C7A3] ${isVerticalRightMode ? 'rotate-90	' : null}`" />
                <span class="text-[#000000] dark:text-[#E6E6E6] text-[16px] font-medium">Editor</span>
            </div>

            <button @click="() => setHeightEditor(0)" v-show="paneEditor > 1.5 && EditorHidden == false" 
                class="hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 w-8 flex items-center justify-center"
            >
                <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[24px] text-[#6B6B6B] dark:text-[#B3B2B2]" />
            </button>
            <button @blur="expandButtonShow(0, true)" @mouseleave="expandButtonShow(0, true)"
                @click="() => setHeightEditor(null)" v-show="paneEditor < 1.5 || EditorHidden == true"
                class="hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 w-8 flex items-center justify-center">
                <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-[24px] text-[#6B6B6B]" />
            </button>
        </div>

        <div class="flex-none w-full border-b border-[#B0B0B0] dark:border-[#545454] h-9 pl-3 pr-1 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="relative w-fit" ref="dropdownRefLang">
                    <button class="px-[4px] h-6 rounded-[4px] border border-[#C9C9C9] dark:border-[#A8A8A8] flex items-center"
                        @click="isLangExpanded = !isLangExpanded">
                        <p class="text-[14px] text-[#6B6B6B] dark:text-[#D0D0D0] leading-4 mr-2">{{ LanguageEditor.name }}</p>
                        <font-awesome-icon :icon="['fas', 'caret-down']"
                            class="text-[18px] h-4 text-[#6B6B6B] dark:text-[#D0D0D0] transition duration-300"
                            :class="isLangExpanded ? 'rotate-180' : 'rotate-0'" />
                    </button>

                    <transition enter-active-class="transform transition duration-500 ease-custom"
                        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                        enter-to-class="translate-y-0 scale-y-100 opacity-100"
                        leave-active-class="transform transition duration-300 ease-custom"
                        leave-class="translate-y-0 scale-y-100 opacity-100"
                        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                        <div v-show="isLangExpanded" tabindex="1"
                            class="absolute z-20 left-0 right-0 mt-1 w-fit bg-white border border-[#8c8c8c] divide-y rounded-md shadow-lg overflow-hidden">
                            <DropdownEditorLang v-model="LanguageEditor" />
                        </div>
                    </transition>
                </div>

            </div>
            <div class="flex items-center gap-[4px]">
                <button class="hover:bg-[#e4e4e4] dark:hover:bg-[#404040] rounded-md h-8 w-8 flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'rotate-right']" class="text-[20px] text-[#6B6B6B] dark:text-[#B0B0B0]" />
                </button>
                <button @click="fullScreen()"
                    class="hover:bg-[#e4e4e4] dark:hover:bg-[#404040] rounded-md h-8 w-8 flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']"
                        v-show="isFullscreen == false" class="text-[18px] text-[#6B6B6B] dark:text-[#B0B0B0]" />
                    <font-awesome-icon :icon="['fas', 'down-left-and-up-right-to-center']" v-show="isFullscreen == true"
                        class="text-[18px] text-[#6B6B6B] dark:text-[#B0B0B0]" />
                </button>
            </div>
        </div>

        <!-- Editor -->
        <div class="flex-auto w-full p-1 overflow-hidden min-h-0">
            <MonacoEditor ref="editorRef" :options="{ minimap: { enabled: false }, theme: EditorMode }" v-model="codeSave"
                :lang="LanguageEditor.lang" class="min-h-full border-[#000000] " />
        </div>

        <div class="flex-none px-3 py-2 flex items-center justify-between border-t border-[#B0B0B0] dark:border-[#545454]">
            <p class="text-[14px] text-[#6B6B6B] dark:text-[#b6b6b6]">Line {{ currentLine }} Col {{ currentColumn }}</p>

            <div class="flex gap-x-2">
                <button
                    class=" bg-[#606060] dark:bg-[#FEFEFE] hover:bg-[#303030] dark:hover:bg-[#7b7b7b] py-1 px-4 text-[#FEFEFE] dark:hover:text-[#FEFEFE] dark:text-[#0F0F0F] text-[16px] font-medium  drop-shadow-md rounded">
                    Run
                </button>

                <button
                    class=" bg-[#00C7A3] dark:bg-[#3DD6BA] hover:bg-[#199c80] dark:hover:bg-[#00C7A3] py-1 px-4 text-[#FEFEFE] dark:text-[#0F0F0F] text-[16px] font-medium  drop-shadow-md rounded">
                    Summit
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


const props = defineProps<{
    paneEditor: number
    isVerticalRightMode: boolean
    LanguageEditor: any
    EditorHidden: boolean
    statusShowTitle: boolean
    isFullscreen: boolean
}>()

const LanguageEditor = ref(props.LanguageEditor)
const isLangExpanded = defineModel<boolean>('isLangExpanded')
const submission_status_id = defineModel('submission_status_id')
const emit = defineEmits(['expandButtonShow','setHeightEditor','fullScreen'])

///////////////////////////////// control pane left width /////////////////////////////////
const ShowDiscription = ref<boolean>(true);

function expandButtonShow(index: number, status: boolean) {
    emit('expandButtonShow', index, status)
}
function setHeightEditor(height: number | null) {
    emit('setHeightEditor', height)
}
function fullScreen() {
    emit('fullScreen')
}

///////////////////////////// control Editor /////////////////////////////////
const currentLine = ref(0)
const currentColumn = ref(0)
const editorRef = ref<any>(null)
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

        editorInstance.onMouseDown(() => {
            const position = editorInstance.getPosition();
            currentLine.value = position.lineNumber;
            currentColumn.value = position.column;
        });

    
        editorInstance.onDidChangeCursorPosition(() => {
            const position = editorInstance.getPosition();
            currentLine.value = position.lineNumber;
            currentColumn.value = position.column;
        });

    }

  });
});

const EditorMode = ref<string>('vs-light')
onMounted(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        EditorMode.value = "vs-dark";
    }
})
onBeforeMount(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        EditorMode.value = event.matches ? "vs-dark" : "vs-light";
    });
})

const codeSave = ref<string>('')
</script>