<template>
  <div class="flex flex-col space-y-4 w-full">
    <div class="w-full">
      <input v-model="name" type="text" class="bg-slate-300 shadow-inner shadow-black/10 rounded-lg w-full text-5xl px-3 py-2" />
    </div>
    <div v-if="editor" class="flex gap-x-2">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        code
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        undo
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        redo
      </button>
      <label for="imageProfile">
        อัพโหลด
      </label>
      <input id="imageProfile" type="file" hidden @change="add_image" />
      <button @click="getJSON()">Get JSON</button>
    </div>

    <div class="p-2 w-full min-h-9  mb-4 text-black">
      <EditorContent :editor="editor" />
    </div>

    <div>{{ json }}</div>

    <div class="w-full">
      <button @click="send" class="w-full bg-green-500 hover:bg-green-600 rounded-lg">ส่ง</button>
    </div>
  </div>
</template>

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

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  /* List styles */
  ul,
  ol {

    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

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

  /* Code and preformatted text styles */
  code {
    background-color: #767676;
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: #a5a5a5;
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 0.5rem 0;
    padding: 0.5rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
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

import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import Dropcursor from '@tiptap/extension-dropcursor'

import { v7 as uuidv7 } from 'uuid';



const editor = ref(useEditor({
  content: "",
  extensions: [Youtube.configure({ controls: false, nocookie: true }), Document, Paragraph, Text, Underline, TextAlign.configure({ types: ['heading', 'paragraph'], }), Heading, HardBreak, Strike, CodeBlock, Code, Blockquote, Bold, BulletList, OrderedList.configure({ HTMLAttributes: { class: 'list-decimal' } }), ListItem, Italic, HorizontalRule, StarterKit, Image.configure({ allowBase64: true }), ImageResize, Dropcursor],
}));

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

const name = ref<string>("");
async function send() {

  if (!editor.value) return;

  if (!name.value) {
    alert("กรุณากรอกชื่อ");
    return;
  }
  formdata.append('name', name.value);
  formdata.append('description', await getJSON());
  formdata.append('type', 'public');
  formdata.append('mem_limit', '3000');
  formdata.append('test_type', 'random');

  const config = useRuntimeConfig();
  const res = await fetch(config.public.backendApi+'/question/data', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjU2NDQ0NTYwMjksImxvZ2luX2lkIjo2MzAwMjUsImxvZ2luX3Rva2VuIjoiNmY2ZTNjNmQtOWQzZS00YjM0LWE2YmQtNjRhNTA3Njc2NTJmIiwidGltZXN0YW1wIjoxNzI1MjEyNDU0OTg3fQ.btNQ9QWYnjA58kaceCIkWWHSPA7ttE4H0tSiFhyikFs`,
    },
    body: formdata,
  });
}

onBeforeUnmount(() => {
  if (editor.value)
    unref(editor.value).destroy();
});

</script>