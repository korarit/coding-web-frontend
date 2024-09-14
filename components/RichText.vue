<template>
    <div class="flex flex-col overflow-hidden rounded-lg border border-gray-300 dark:border-[#101010]" v-if="editor">
        <div class="bg-[#E4F3F1] dark:bg-[#262626] p-2 flex tems-center space-x-8">

            <div class="flex items-center space-x-[6px]">

                <div class="flex items-center h-[20px] space-x-1">
                    <input  v-model="selectedFontSize"
                        class="dark:text-[#FEFEFE]  text-[20px] text-center leading-3 py-[1px] px-[2px] w-[24px] bg-transparent dark:focus:bg-[#424242] focus:outline-none focus:bg-white rounded-sm">

                    <div class="flex flex-col space-y-[2px]">
                        <button class="h-[6px] flex items-center justify-center" @click="AddFontSize()">
                            <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[10px] dark:text-[#FEFEFE] dark:hover:text-gray-200" />
                        </button>
                        <button class="h-[6px] flex items-center justify-center" @click="delFontSize()">
                            <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-[10px] dark:text-[#FEFEFE] dark:hover:text-gray-200" />
                        </button>
                    </div>

                </div>

                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive('bold')}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="editor.chain().focus().toggleBold().run()">
                    <font-awesome-icon :icon="['fas', 'bold']" />
                </button>

                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive('italic')}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="editor.chain().focus().toggleItalic().run()">
                    <font-awesome-icon :icon="['fas', 'italic']" />
                </button>
                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive('underline')}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="editor.isActive('underline') ? editor.chain().focus().toggleUnderline().run() : editor.chain().focus().setUnderline().run()">
                    <font-awesome-icon :icon="['fas', 'underline']" />
                </button>

                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive('strike')}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="editor.chain().focus().toggleStrike().run()">
                    <font-awesome-icon :icon="['fas', 'strikethrough']" />
                </button>

            </div>


            <div class="flex items-center space-x-[6px]">
                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive({ textAlign: 'left' })}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="editor.chain().focus().setTextAlign('left').run()">
                    <font-awesome-icon :icon="['fas', 'align-left']" class="[transform:rotateX(180deg)]" />
                </button>
                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive({ textAlign: 'center' })}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="editor.chain().focus().setTextAlign('center').run()">
                    <font-awesome-icon :icon="['fas', 'align-center']" />
                </button>
                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive({ textAlign: 'right' })}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="editor.chain().focus().setTextAlign('right').run()">
                    <font-awesome-icon :icon="['fas', 'align-right']" class="[transform:rotateX(180deg)]" />
                </button>
            </div>

            <div class="flex items-center space-x-[6px]">
                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive('bulletList')}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200"
                    @click="editor.chain().focus().toggleBulletList().run()">
                    <font-awesome-icon :icon="['fas', 'list-ul']" />
                </button>
                <!-- list-ol button -->
                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive('orderedList')}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="editor.chain().focus().toggleOrderedList().run()">
                    <font-awesome-icon :icon="['fas', 'list-ol']" />
                </button>
            </div>

            <div class="flex items-center space-x-[6px]">
                <button :class="{'bg-[#bcd4d2] dark:bg-[#484848]': editor.isActive('codeBlock')}" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200" @click="!editor.isActive('codeBlock') ?  editor.chain().focus().setCodeBlock().run() : editor.chain().focus().toggleCodeBlock().run()">
                    <font-awesome-icon :icon="['fas', 'code']" />
                </button>

                <label for="imageProfile" class="h-[24px] w-[24px] flex justify-center items-center rounded text-gray-700 dark:text-[#FEFEFE] hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'image']" />
                </label>
                <input id="imageProfile" type="file" hidden @change="add_image" />
            </div>
        </div>
        <div class=" bg-[#FEFEFE] dark:bg-[#2E2E2E] rounded-b-lg w-full px-3 py-2 min-h-[160px]">
            <EditorContent :editor="editor" class="focus:outline-none" />
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
import { useEditor, EditorContent } from '@tiptap/vue-3'
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

import { v7 as uuidv7 } from 'uuid';

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


const selectedFontSize = ref<number>(14)
const editor = ref(useEditor({
    content: "",
    extensions: [CodeBlockLowlight.configure({lowlight}),FontSizeLib,TextStyle, Youtube.configure({ controls: false, nocookie: true }), Document, Paragraph, Text, Underline, TextAlign.configure({ types: ['heading', 'paragraph'], }), Heading, HardBreak, Strike, CodeBlock, Code, Blockquote, Bold, BulletList, OrderedList.configure({ HTMLAttributes: { class: 'list-decimal' } }), ListItem, Italic, HorizontalRule, StarterKit, Image.configure({ allowBase64: true }), ImageResize, Dropcursor],
    onSelectionUpdate({ editor }) {
        const { from, to } = editor.state.selection
        let fontSize:string|null = null
        let hasMixedFontSize = false

        // ตรวจสอบโหนดระหว่างตำแหน่งที่เลือก
        editor.state.doc.nodesBetween(from, to, (node, pos) => {
        const mark = node.marks.find(mark => mark.type.name === 'textStyle')
        if (mark && mark.attrs.fontSize) {
            if (fontSize === null) {
                fontSize = mark.attrs.fontSize
            }
        }
        })

        selectedFontSize.value = hasMixedFontSize ? 0 : Number(fontSize?.replace('px','')) || selectedFontSize.value
    }

}));

const AddFontSize = () => {
    selectedFontSize.value++
    editor.value?.chain().focus().setFontSize(selectedFontSize.value+'px').run()
}
const delFontSize = () => {
    selectedFontSize.value--
    editor.value?.chain().focus().setFontSize(selectedFontSize.value+'px').run()
}   

const json = ref<string>("");

const formdata = new FormData();
async function base64ToFile(base64Url: string) {
  try {
    // ตรวจสอบว่า URL เป็น base64 Data URL จริงหรือไม่
    if (!base64Url.startsWith('data:')) {
      throw new Error('URL ที่ให้มาไม่ใช่ base64 Data URL');
    }

    // ใช้ fetch เพื่อแปลง base64 Data URL เป็น Blob
    const response = await fetch(base64Url);
    const blob = await response.blob();

    // ดึง contentType ออกจาก Base64
    let contentType: RegExpMatchArray | null = base64Url.match(/data:(.*?);base64,/);

    if (!contentType) {
      throw new Error('ไม่สามารถระบุ contentType จาก base64 Data URL ได้');
    }

    let FileType = contentType[1];

    // สร้าง mapping ระหว่าง contentType กับนามสกุลไฟล์
    const extensionMapping: { [key: string]: string } = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/gif": "gif",
      "image/webp": "webp",
      "image/svg+xml": "svg",
      // เพิ่ม contentType อื่นๆ ที่ต้องการได้ที่นี่
    };

    const extension: string = extensionMapping[FileType] || '';

    const fileName = `${uuidv7()}.${extension}`;

    // สร้าง File object จาก Blob และตั้งชื่อไฟล์
    const file = new File([blob], fileName, { type: blob.type });

    formdata.append('image_file', file, fileName);


    return fileName;
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
  }
}


async function processNodeHasImage(node: any) {
  if (node.type === 'image' && node.attrs.src.startsWith('data:image/')) {
    node.attrs.src = await base64ToFile(node.attrs.src);
  }

  if (node.content) {
    // วนซ้ำไปใน content ที่ซ้อนอยู่
    for (const childNode of node.content) {
      await processNodeHasImage(childNode);
    }
  }
}

async function getJSON() {

  const data = editor.value?.getJSON();
  await processNodeHasImage(data);

  console.log(data);

  return JSON.stringify(data);
}

function add_image(events: Event) {
  if (!events) return;
  const el = events.target as HTMLInputElement;
  if (!el.files) {
    return;
  }
  const file = el.files[0];
  const reader = new FileReader();
  reader.onload = (e: any) => {
    editor.value?.chain().focus().setImage({ src: e.target.result }).run();
  };
  reader.readAsDataURL(file);

  // ล้างค่า input file
  el.value = '';
}

onBeforeUnmount(() => {
  if (editor.value)
    unref(editor.value).destroy();
});

</script>
<style scoped>
.is-active {
  background-color: #e08484;
}
</style>
<style lang="scss">
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