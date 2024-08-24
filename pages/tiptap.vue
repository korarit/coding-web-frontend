<template>
    <div>
        <div v-if="editor" class="flex gap-x-2">
            <button @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
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
                :disabled="!editor.can().chain().focus().toggleCode().run()"
                :class="{ 'is-active': editor.isActive('code') }">
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
            <button @click="getJSON()">Get JSON</button>
        </div>

        <div class="h-fit w-full mb-4">
            <EditorContent :editor="editor" />
        </div>
        <div>{{ json }}</div>
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

  h4{
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
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
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

const editor = ref(useEditor({
    content: "",
    extensions: [Youtube.configure({controls: false,nocookie: true}),Document,Paragraph,Text,Underline,TextAlign.configure({types: ['heading', 'paragraph'],}),Heading,HardBreak,Strike,CodeBlock,Code,Blockquote,Bold,BulletList,OrderedList,ListItem,Italic,HorizontalRule,TiptapStarterKit],
}));

const json = ref<string>("");
function getJSON() {
    if (editor.value)
        console.log(editor.value.getJSON());

    //json to string
    json.value = JSON.stringify({
            'test': JSON.stringify(editor.value?.getJSON())
    })
}

onBeforeUnmount(() => {
    if (editor.value)
        unref(editor.value).destroy();
});
</script>