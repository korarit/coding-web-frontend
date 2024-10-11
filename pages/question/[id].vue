<template>
    <NuxtLayout name="defaultmain" page_name="">
      <div :class="`min-h-[calc(100dvh-65px)] h-fit max-w-[100%] ${isFullscreen ? 'pt-[48px] sm:h-[64px]' : 'pt-[32px] sm:pt-[64px]'} flex flex-col`" id="main_screen">
        <div class="min-h-full h-fit px-4 xl:px-16 2xl:px-[96px] gap-x-5 gap-y-8 flex-grow">
          <!-- Your content here -->
            <splitpanes @resized="onResizedWidth" :style="`${isFullscreen ? 'height: calc(100dvh - 100px)' : 'height: calc(100dvh - 195px)'}`">
                <pane :size="paneLeftWidth" class="min-w-9 rounded-md overflow-hidden drop-shadow-md pane-discription">
                    <QuestionLeftLayout 
                        :submitList="ListSubmit"
                        :paneLeftWidth="paneLeftWidth"
                        :isVerticalLeftMode="isVerticalLeftMode"
                        :Desciption="DesciptionQuestion"
                        linkBack="/collection"

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
                            :EditorHidden="EditorHidden"
                            :statusShowTitle="statusShowTitle[0]"
                            :isFullscreen="isFullscreen"


                            v-model:submit-loading="submitLoading"
                            v-model:test-loading="testLoading"

                            v-model:select-language-id="SelectionLanguageId"
                            v-model:code-save="codeSave"

                            @test-code="TestCode"
                            @submit-code="SubmitCode"

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

                            :TestCaseCount="CountTestCase"

                            :resultType="resultTestType"
                            :resultTest="resultTest"
                            :resultSubmit="resultSubmit"

                            :llm-check="LLMCheck"

                            v-model:submit-loading="submitLoading"
                            v-model:test-loading="testLoading"

                            v-model:test-input="TestInput"
                            v-model:test-output="TestExpected"

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
<script setup lang="ts">
const dayjs = useDayjs()

definePageMeta({
    auth: { unauthenticatedOnly: false, navigateAuthenticatedTo: '/' }
})

const { status, data} = useAuth()
const route = useRoute()

const isVerticalLeftMode = ref<boolean>(false);
const isVerticalRightMode = ref<boolean>(false);


const paneLeftWidth = ref<number>(50);
const paneLeftWidthOld = ref<number>(0);
const paneRightWidth = ref<number>(50);
const paneRightWidthOld = ref<number>(0);


const paneEditorOld = ref<number>(0);
const paneTestOld = ref<number>(0);

const paneEditor = ref<number>(58);
const EditorHidden = ref<boolean>(false);

const paneTest = ref<number>(42);
const TestHidden = ref<boolean>(false);
const statusShowTitle = ref([
    true, // Editor
    true, // Test Case
]);

const resizedHeight = (sizes:any) => {
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

function expandButtonShow(show: number, status: boolean) {
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

function setHeightEditor(value: number | null) {
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

function setHeightTest(value: number | null) {
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

const onResizedWidth = (sizes:any) => {
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


function setWidthPaneLeft(value : number | null) {
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


////////////////////////// Login Model Control //////////////////////////////////
const {open_modal_login} = useLoginModalControl()
const {open_modal} = useModalControl()

const openLogin = () =>{
    open_modal()
    open_modal_login()
}

//////////////////////// Discription And Submission //////////////////////////

// submission status table select
const submission_type_id = ref<number>(0);



//////////////////////// Test case , Test Result //////////////////////////
const ShowTestCase = ref<boolean>(true);

const SelectionLanguageId = ref<number>(1)

const resultTestType = ref<string>('')

////////////////////////////////// Summit Code ////////////////////////////////////
const config = useRuntimeConfig();
const codeSave = ref<string>('')
watch(() => codeSave.value, (val) => {
  console.log(String(val))
})
const resultSubmit = ref<resultOfSubmit[]>([])

type resultOfSubmit = {
    status:string
    memory_usage:number
    time_usage:number
    input:string
    expected:string
    args:string[]
    error:string
    code_output:string
    code_error:string
}

const submitLoading = ref<boolean>(false)
async function SubmitCode() {

    if(status.value != 'authenticated'){
        openLogin()
        return
    }

    resultTestType.value = 'submit'
    submitLoading.value = true

    //clear result
    resultSubmit.value = []

    const user_session:any = data.value
    const now_time = dayjs().tz('Asia/Bangkok').valueOf()
    const response = await fetch(config.public.backendApi + '/question/submit/'+now_time, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/event-stream;charset=UTF-8',
            'Accept': 'text/event-stream',
            'Authorization': 'Bearer ' + user_session.sessionToken
        },
        body: JSON.stringify({
            code: String(codeSave.value),
            language_id: SelectionLanguageId.value,
            question_id: Number(route.params.id),
        })
    })
    if (response.body == null) {
        console.log('Summit Fail')
        return
    }
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
    while (true) {
        const {value, done} = await reader.read();
        if (done) {
            submitLoading.value = false
            break;
        };
        console.log(value)
        const json:resultOfSubmit = JSON.parse(value.split('data: ')[1])
        resultSubmit.value.push(json)
    }
}


//////////////////////////////// Code Test //////////////////////////////////////

const TestInput = ref<string>('')
const TestExpected = ref<string>('')

type resultOfTest = {
    status:string
    memory_usage:number
    time_usage:number
    input:string
    args:string[]
    error:string
    code_output:string
    code_error:string
}
const resultTest = ref<resultOfTest|null>(null)
const testLoading = ref<boolean>(false)
async function TestCode() {

    if(status.value != 'authenticated'){
        openLogin()
        return
    }

    resultTestType.value = 'test'
    testLoading.value = true

    const user_session:any = data.value
    const now_time = dayjs().tz('Asia/Bangkok').valueOf()
    const response = await fetch(config.public.backendApi + '/question/test/'+now_time, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/event-stream;charset=UTF-8',
            'Accept': 'text/event-stream',
            'Authorization': 'Bearer ' + user_session.sessionToken
        },
        body: JSON.stringify({
            code: String(codeSave.value),
            language_id: SelectionLanguageId.value,
            question_id: Number(route.params.id),
            input: TestInput.value,
            expected: String(TestExpected.value),
            args: ["1"]
        })
    })
      
    if (response.body === null) {
        return
    } else {
        console.log('Test Fail')
    }
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
    while (true) {
        const {value, done} = await reader.read();
        if (done) break;
        
        //string to json
        console.log(value)
        console.log(JSON.parse(value.split('data: ')[1]))
        const json:resultOfTest = JSON.parse(value.split('data: ')[1])
        resultTest.value = json
        testLoading.value = false
    }
}


const DesciptionQuestion = ref<string>('')
const CountTestCase = ref<number>(0)
const LLMCheck = ref<boolean>(false)
const getQuestionData = async () => {
    const config = useRuntimeConfig();
    const request = await fetch( config.public.backendApi + '/question/data/'+route.params.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    if (request.status === 200) {
        const data = await request.json()
        console.log(data.data)

        //set Discription
        DesciptionQuestion.value = await data.data.description
        CountTestCase.value = await data.data.test_count
        LLMCheck.value = await data.data.llm_check
    }
} 

onMounted(async () => {
    await getQuestionData();
})

/////////////////////////////// Get Submit History //////////////////////////////
const ListSubmit = ref<any|null>(null)
const getSubmitHistory = async () =>{
    const user_session:any= data.value
    const config = useRuntimeConfig();
    const request = await fetch( config.public.backendApi + '/question/data/'+route.params.id+'/history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        }})
    if (request.status === 200) {
        const data = await request.json()
        console.log(data.data)
        ListSubmit.value = data.data.submit_list
    }
}


onMounted(async () => {
    if(status.value == 'authenticated'){
        await getSubmitHistory();
    }
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
  