<template>
    <NuxtLayout name="defaultmain" page_name="">
      <div :class="`min-h-[calc(100dvh-65px)] h-fit max-w-[100%] ${isFullscreen ? 'pt-[48px] sm:h-[64px]' : 'pt-[32px] sm:pt-[64px]'} flex flex-col`" id="main_screen">
        <div class="min-h-full h-fit px-4 xl:px-16 2xl:px-[96px] gap-x-5 gap-y-8 flex-grow">
          <!-- Your content here -->
            <splitpanes @resized="onResizedWidth" :style="`${isFullscreen ? 'height: calc(100dvh - 100px)' : 'height: calc(100dvh - 195px)'}`">
                <pane :size="paneLeftWidth" class="min-w-9 rounded-md overflow-hidden drop-shadow-md pane-discription">
                    <QuestionLeftLayout 
                        :paneLeftWidth="paneLeftWidth"
                        :isVerticalLeftMode="isVerticalLeftMode"
                        :LanguageListName="LanguageListName"
                        :submission_status="submission_status"
                        :Desciption="DesciptionQuestion"

                        v-model:submission_status_id="submission_status_id"
                        v-model:submission_type_id="submission_type_id"

                        @set-width-pane-left="setWidthPaneLeft"
                    />
                </pane>

                <pane :size="paneRightWidth" class="min-w-9">
                    <splitpanes @resized="resizedHeight" horizontal>
                    <pane :size="paneEditor" class="min-h-9">
                        <QuestionCodeLayout 
                            :paneEditor="paneEditor"
                            :isVerticalRightMode="isVerticalRightMode"
                            :LanguageEditor="LanguageEditor"
                            :EditorHidden="EditorHidden"
                            :statusShowTitle="statusShowTitle[0]"
                            :isFullscreen="isFullscreen"

                            v-model:is-lang-expanded="isLangExpanded"
                            v-model:submission_status_id="submission_status_id"
                            @expandButtonShow="expandButtonShow"
                            @set-height-editor="setHeightEditor"
                            @full-screen="fullScreen"
                        />

                    </pane>

                    <pane :size="paneTest" class="min-h-[36px]">
                        <QuestionTestLayout
                            :paneTest="paneTest"
                            :isVerticalRightMode="isVerticalRightMode"
                            :TestHidden="TestHidden"
                            :statusShowTitle="statusShowTitle[1]"

                            v-model:ShowTestCase="ShowTestCase"
                            @expandButtonShow="expandButtonShow"
                            @set-height-test="setHeightTest"
                        />
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

definePageMeta({
    auth: { unauthenticatedOnly: false, navigateAuthenticatedTo: '/' }
})

const { status, data} = useAuth()
const route = useRoute()

//get list of language name
const LanguageListName = ref([]);
LanguageListName.value.push('ภาษา');
EditorLang.filter((data) => {
    LanguageListName.value.push(data.name);
})

const isLangExpanded = ref(false);

const isVerticalLeftMode = ref(false);
const isVerticalRightMode = ref(false);


const paneLeftWidth = ref(50);
const paneLeftWidthOld = ref(0);
const paneRightWidth = ref(50);
const paneRightWidthOld = ref(0);


const paneEditorOld = ref(0);
const paneTestOld = ref(0);

const paneEditor = ref(58);
const EditorHidden = ref(false);

const paneTest = ref(42);
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
watch(LanguageEditor, ()=> {
    isLangExpanded.value = false;
})

const dropdownRefLang = ref(null);
const closeDropdown = (event) => {
  if (dropdownRefLang.value && !dropdownRefLang.value.contains(event.target)) {
    isLangExpanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})


//////////////////////// Discription And Submission //////////////////////////
const ShowDiscription = ref(true);

// submission status table select
const submission_type_id = ref(0);
const submission_status_id = ref(0);



//////////////////////// Test case , Test Result //////////////////////////
const ShowTestCase = ref(true);


////////////////////////////////// Summit Code ////////////////////////////////////
async function SummitCode() {
    const user_session = data.value

    const response = await fetch(config.public.backendApi + '/question/summit', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/event-stream;charset=UTF-8',
            'Accept': 'text/event-stream',
            'Authorization': 'Bearer ' + user_session.sessionToken
        },
        body: JSON.stringify({
            code: codeSave.value,
            language_id: LanguageEditor.value.lang,
            question_id: route.params.id,
        })
    })
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
    while (true) {
        const {value, done} = await reader.read();
        if (done) break;
        console.log('Received', value);
    }
}

const DesciptionQuestion = ref('')
const getQuestionData = async () => {
    const config = useRuntimeConfig();
    const request = await fetch( config.public.backendApi + '/question/data/'+route.params.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    if (request.status === 200) {
        const data = await request.json()
        console.log(data.data.description)

        //set Discription
        DesciptionQuestion.value = await data.data.description
    }
} 

onMounted(async () => {
    await getQuestionData();
})
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
/* CSS เพื่อลบกรอบสีฟ้า */
.monaco-editor {
  --vscode-focusBorder: transparent !important;
}

@media (prefers-color-scheme: dark) {
    .monaco-editor {
        --vscode-editor-background: #262626 !important;
        --vscode-editorGutter-background: #262626 !important;
        --vscode-editorLineNumber-activeForeground: #FFFFFF !important;
    }
}

</style>
  