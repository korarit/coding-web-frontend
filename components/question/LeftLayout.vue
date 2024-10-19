<template>
  <div
    class="flex flex-col w-full h-full bg-[#FFFFFF] dark:bg-[#262626] border border-[#B0B0B0] dark:border-[#545454] rounded-md overflow-hidden drop-shadow-md">
    <div
      :class="`flex-none w-full bg-[#F6F6F6] dark:bg-[#3D3D3D] border-b border-[#B0B0B0] dark:border-[#545454]  flex ${isVerticalLeftMode ? 'h-full justify-between vertical-mode' : 'h-9 items-center justify-between px-1'}`">
      <div class="flex h-fit items-center gap-[2px] w-full">
        <NuxtLink :to="linkBack" class="hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 w-8 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'xmark']" class="text-[28px] text-[#6B6B6B] dark:text-[#b3b2b2]" />
        </NuxtLink>
        <button @click="ShowDiscription = true"
          :class="`hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md ${isVerticalLeftMode ? 'h-fit py-2' : 'h-8 px-2'} flex items-center gap-2`">
          <font-awesome-icon :icon="['fas', 'file-lines']" class="text-[20px] text-[#00C7A3]" />
          <span :class="`text-[16px] ${ShowDiscription ? 'text-[#000000] dark:text-[#E6E6E6] font-medium' : 'text-[#6B6B6B] dark:text-[#c8c8c8] font-light'}`">Description</span>
        </button>

        <div :class="`${isVerticalLeftMode ? 'h-[1px] w-[20px]' : 'h-5 w-[1px] '} bg-[#B0B0B0]`"></div>

        <button @click="ShowDiscription = false"
          :class="`hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md ${isVerticalLeftMode ? 'h-fit py-2' : 'h-8 px-2'} flex items-center gap-2`">
          <font-awesome-icon :icon="['fas', 'clock-rotate-left']" class="text-[20px] text-[#FFDA7A]" />
          <span
            :class="`text-[16px] ${!ShowDiscription ? 'text-[#000000] dark:text-[#E6E6E6] font-medium' : 'text-[#6B6B6B] dark:text-[#c8c8c8] font-light'}`">Submissions</span>
        </button>
      </div>

      <div class="flex items-center gap-[4px]">
        <button class="hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 w-8 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'share']" class="text-[24px] text-[#6B6B6B] dark:text-[#b3b2b2]" />
        </button>
        <button @click="setWidthPaneLeft(0)" v-show="paneLeftWidth > 1.5"
          class="hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 w-8 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-[24px] text-[#6B6B6B] dark:text-[#b3b2b2]" />
        </button>
        <button @click="setWidthPaneLeft(null)" v-show="paneLeftWidth < 1.5"
          class="hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 w-8 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-[24px] text-[#6B6B6B] dark:text-[#b3b2b2]" />
        </button>
      </div>

    </div>

    <!-- Discription Box -->
    <div v-if="ShowDiscription" class="flex-auto w-full h-full px-2 pt-4 dark:text-white DiscriptionHTML"
      v-html="DiscriptionHTML">
    </div>
    <div v-else class="flex-auto flex flex-col w-full h-full">
      <div class="flex-none min-w-fit px-3 border-b border-[#d9d9d9] flex gap-x-3 py-2">
        <div class="w-[160px]">
          <DropdownCheckSelect block-class="w-full" heightList="200px" customclass="w-full flex items-center gap-x-2 text-[#616161] dark:text-[#cecece] hover:text-[#353535] dark:hover:text-[#FEFEFE] text-[18px] font-light leading-5"
          v-model="selectIndexType" :list_data="TypeListName" @select="filterSubmit" />
        </div>
        
        <div class="w-[164px]">
          <DropdownCheckSelect block-class="w-full" heightList="200px"  customclass="flex items-center gap-x-2 text-[#616161] dark:text-[#cecece] hover:text-[#353535] dark:hover:text-[#FEFEFE] text-[18px] font-light leading-5"
          v-model="selectIndexLang" :list_data="LanguageListName" @select="filterSubmit" />
        </div>
       

        <div class="flex items-center gap-x-2 text-[#616161] dark:text-[#cecece] hover:text-[#353535] dark:hover:text-[#FEFEFE] w-[100px]">
          <p class="text-[18px] font-light leading-5">เวลา (Sec)</p>
        </div>
        <div class="flex items-center gap-x-2 text-[#616161] dark:text-[#cecece] hover:text-[#353535] dark:hover:text-[#FEFEFE] w-[140px]">
          <p class="text-[18px] font-light leading-5">หน่วยความจำ (KB)</p>
        </div>
      </div>

      <div v-if="ListFilter == null" class="flex-auto w-full">
        <div class="w-full h-full flex items-center justify-center">
          <p class="text-[20px] font-light text-[#303030]">ไม่มีข้อมูลการส่ง</p>
        </div>
      </div>
      <div v-else class="flex-auto w-full flex flex-col divide-y divide-gray-300 overflow-y-auto">
        <div class="px-3 py-2 min-w-fit flex gap-x-3" v-for="data in ListFilter">

          <div class="w-[160px]">
            <p v-if="data.status == 'success'" class="text-[16px] font-light text-green-500 capitalize">{{ data.status
              }}</p>
            <p v-else class="text-[16px] font-light text-red-500 capitalize">{{ data.status }}</p>
          </div>
          <div class="w-[164px] font-light text-gray-600">
            {{ data.lang_name }}
          </div>
          <div class="w-[100px] font-light text-gray-600">
            <p v-if="data.time_usage != null">{{ Number(data.time_usage / 1000) }}</p>
            <p v-else>-</p>
          </div>
          <div class="w-[100px] font-light text-gray-600">
            <p v-if="data.memory_usage != null">{{ data.memory_usage }}</p>
            <p v-else>-</p>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import Youtube from '@tiptap/extension-youtube'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading';
import HardBreak from '@tiptap/extension-hard-break';
import Strike from '@tiptap/extension-strike';
import CodeBlock from '@tiptap/extension-code-block';
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Italic from '@tiptap/extension-italic';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import StarterKit from '@tiptap/starter-kit'

import TextStyle from '@tiptap/extension-text-style'
import FontSizeLib from 'tiptap-extension-font-size'

import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import Dropcursor from '@tiptap/extension-dropcursor'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'

import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import rust from 'highlight.js/lib/languages/rust'
import php from 'highlight.js/lib/languages/php'
import go from 'highlight.js/lib/languages/go'
import lua from 'highlight.js/lib/languages/lua'

import { generateHTML } from '@tiptap/html'


import submission_status from '~/assets/json/submission_status.json'
import EditorLang from '~/assets/json/editor_lang.json';

// create a lowlight instance
const lowlight = createLowlight(all)

// you can also register languages
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('python', python)
lowlight.register('java', java)
lowlight.register('c', c)
lowlight.register('cpp', cpp)
lowlight.register('csharp', csharp)
lowlight.register('rust', rust)
lowlight.register('php', php)
lowlight.register('go', go)
lowlight.register('lua', lua)


type submitData = {
  status: string,
  question_id: number,
  lang_id: number
  lang_name: string
  memory_usage: number | null,
  time_usage: number | null,

}
const props = defineProps<{
  linkBack: string
  submitList: submitData[] | null
  paneLeftWidth: number
  isVerticalLeftMode: boolean
  Desciption: string
}>()

const submission_type_id = defineModel('submission_type_id')
const emit = defineEmits(['setWidthPaneLeft'])

///////////////////////////////// control pane left width /////////////////////////////////
const ShowDiscription = ref<boolean>(true);

function setWidthPaneLeft(width: number | null) {
  emit('setWidthPaneLeft', width)
}

/////////////////////// DropdownCheckSelect ///////////////////////
//get list of language name
const LanguageListName = ref<any>([]);
LanguageListName.value.push('ภาษา');
EditorLang.filter((data) => {
  LanguageListName.value.push(data.name);
})

//get list of submission status
const TypeListName = ref<any>([]);
submission_status.filter((data) => {
  TypeListName.value.push(data.name);
})


const ListFilter = ref<submitData[]|null>(null)

///////////////////////////////// filter submit Lang /////////////////////////////////
const selectIndexType = ref<number>(0)
const selectIndexLang = ref<number>(0)
const filterSubmit = () => {
  //index to lang name
  const lang_name: string = LanguageListName.value[selectIndexLang.value]
  const submit_select = submission_status[selectIndexType.value].eng;

  if (!props.submitList) {
    return
  }
  if (selectIndexLang.value != 0 && selectIndexType.value != 0) {
    ListFilter.value = props.submitList.filter((data) => {
      return data.lang_name.toLowerCase() == lang_name.toLowerCase() && data.status.toLowerCase() == submit_select.toLowerCase()
    })
  } else if (selectIndexLang.value == 0 && selectIndexType.value != 0) {
    ListFilter.value = props.submitList.filter((data) => {
      return data.status.toLowerCase() == submit_select.toLowerCase()
    })
  } else if (selectIndexLang.value != 0 && selectIndexType.value == 0) {
    ListFilter.value = props.submitList.filter((data) => {
      return data.lang_name.toLowerCase() == lang_name.toLowerCase()
    })
  } else {
    ListFilter.value = props.submitList
  }
}

watch(() => props.submitList, (val) => {
  if (val) {
    ListFilter.value = val
  }
})




///////////////////////////////// Control description  /////////////////////////////////
async function processNodeHasImage(node: any) {
  if (node.type === 'image' && node.attrs.src !== null && !node.attrs.src.includes('question')) {
    node.attrs.src = "https://pub-3d57d68059384f598b7ac0875ccf93db.r2.dev/question/" + node.attrs.src
  }

  if (node.content) {
    // วนซ้ำไปใน content ที่ซ้อนอยู่
    for (const childNode of node.content) {
      await processNodeHasImage(childNode);
    }
  }
}

const DiscriptionHTML = ref<string>('')

watch(() => props.Desciption, async (val) => {

  const DesciptionJson = JSON.parse(val)
  await processNodeHasImage(DesciptionJson);

  DiscriptionHTML.value = generateHTML(DesciptionJson, [CodeBlockLowlight.configure({lowlight}),FontSizeLib,TextStyle, Youtube.configure({ controls: false, nocookie: true }), Document, Paragraph, Text, Underline, TextAlign.configure({ types: ['heading', 'paragraph'], }), Heading, HardBreak, Strike, CodeBlock, Code, Blockquote, Bold, BulletList, OrderedList.configure({ HTMLAttributes: { class: 'list-decimal' } }), ListItem, Italic, HorizontalRule, StarterKit, Image.configure({ allowBase64: true }), ImageResize, Dropcursor])
})

</script>

<style scoped lang="scss">
/* Basic editor styles */
.tiptap {
  outline: none;
}

.tiptap {
    :first-child {
        margin-top: 0;
    }

    @media (prefers-color-scheme: dark) {
        p {
            color: #FEFEFE;
        }
    }

    blockquote {
        border-left: 3px solid var(--gray-3);
        margin: 1.5rem 0;
        padding-left: 1rem;
    }

    /* List styles */
    ul{
        padding: 0 1rem;
        margin: 0.4rem 1rem 0.4rem 0.4rem;
        li p {
        margin-top: 0.25em;
        margin-bottom: 0.25em;
        }
    }
    ol {

        padding: 0 0.4rem;
        margin: 0.4rem 1rem 0.4rem 0.4rem;

        li p {
        margin-top: 0.25em;
        margin-bottom: 0.25em;
        }
    }

    ol {
        list-style-type: decimal;
    }

    ul {
        list-style-type: disc;
    }

    /* Heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
        margin-top: 0.5rem;
        text-wrap: pretty;
    }

    h1,
    h2 {
        margin-top: 0.5rem;
    }

    h1 {
        font-size: 3.2rem;
    }

    h2 {
        font-size: 2.8rem;
    }

    h3 {
        font-size: 2.4rem;
    }

    h4 {
        font-size: 2.2rem;
    }

    h5 {
        font-size: 2rem;
    }

    h6 {
        font-size: 1.8rem;
    }

    @media (prefers-color-scheme: dark) {
        pre {
            background: #565656;
            border-radius: 0.5rem;
            color: #202020;
            font-family: 'JetBrainsMono', monospace;
            margin: 0.5rem 0;
            padding: 0.5rem;

            code {
                background: none;
                color: inherit;
                font-size: 0.8rem;
                padding: 0;
            }

            /* Code styling */
            .hljs-comment,
            .hljs-quote {
                color: #616161;
            }

            .hljs-variable,
            .hljs-template-variable,
            .hljs-attribute,
            .hljs-tag,
            .hljs-name,
            .hljs-regexp,
            .hljs-link,
            .hljs-name,
            .hljs-selector-id,
            .hljs-selector-class {
                color: #f98181;
            }

            .hljs-number,
            .hljs-meta,
            .hljs-built_in,
            .hljs-builtin-name,
            .hljs-literal,
            .hljs-type,
            .hljs-params {
                color: #f77f1d;
            }

            .hljs-string,
            .hljs-symbol,
            .hljs-bullet {
                color: #9ece7a;
            }

            .hljs-title,
            .hljs-section {
                color: #d6cc08;
            }

            .hljs-keyword,
            .hljs-selector-tag {
                color: #64bbe0;
            }

            .hljs-emphasis {
                font-style: italic;
            }

            .hljs-strong {
                font-weight: 700;
            }

        }
    }

    @media screen and (prefers-color-scheme: light) {
        pre {
            background: #202020;
            border-radius: 0.5rem;
            color: #FEFEFE;
            font-family: 'JetBrainsMono', monospace;
            margin: 0.5rem 0;
            padding: 0.5rem;

            code {
                background: none;
                color: inherit;
                font-size: 0.8rem;
                padding: 0;
            }

            /* Code styling */
            .hljs-comment,
            .hljs-quote {
                color: #616161;
            }

            .hljs-variable,
            .hljs-template-variable,
            .hljs-attribute,
            .hljs-tag,
            .hljs-name,
            .hljs-regexp,
            .hljs-link,
            .hljs-name,
            .hljs-selector-id,
            .hljs-selector-class {
                color: #f98181;
            }

            .hljs-number,
            .hljs-meta,
            .hljs-built_in,
            .hljs-builtin-name,
            .hljs-literal,
            .hljs-type,
            .hljs-params {
                color: #fbbc88;
            }

            .hljs-string,
            .hljs-symbol,
            .hljs-bullet {
                color: #b9f18d;
            }

            .hljs-title,
            .hljs-section {
                color: #faf594;
            }

            .hljs-keyword,
            .hljs-selector-tag {
                color: #70cff8;
            }

            .hljs-emphasis {
                font-style: italic;
            }

            .hljs-strong {
                font-weight: 700;
            }

        }
    }

  blockquote {
    border-left: 3px solid #dddddd;
    margin: 1.5rem 0;
    padding-left: 0.75rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>