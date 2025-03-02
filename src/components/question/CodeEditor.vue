<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits, computed } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { EditorView, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { materialLight, materialDark } from '@uiw/codemirror-theme-material';

// Props และ Emits
const props = defineProps<{
  language: string;
  modelValue: string;
  line: number; // เพิ่ม prop สำหรับ v-model:line
  col: number;  // เพิ่ม prop สำหรับ v-model:col
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:line', value: number): void; // เพิ่ม emit สำหรับ v-model:line
  (e: 'update:col', value: number): void;  // เพิ่ม emit สำหรับ v-model:col
}>();

// Reactive state
const code = ref(props.modelValue);
const customBgLight = ref('#FEFEFE');
const customBgDark = ref('#1a1a1a');
const customGutterBgLight = ref('#e0e0e0');
const customGutterBgDark = ref('#2a2a2a');
let editorView: any = null; // ตัวแปรสำหรับเก็บ EditorView

// ตรวจสอบว่าเป็นอุปกรณ์มือถือหรือไม่
const isMobile = ref(false);
const checkIfMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor;
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  console.log('Is mobile:', isMobile.value);
};

// ฟังก์ชันเพื่อตรวจสอบว่าเป็น dark mode หรือไม่
const isDarkMode = ref(false);
const updateDarkMode = () => {
  isDarkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log('Dark mode updated:', isDarkMode.value);
  // อัปเดต class dark ใน <html>
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// ตั้งค่าเริ่มต้นและตรวจจับการเปลี่ยนแปลง prefers-color-scheme
onMounted(() => {
  checkIfMobile();
  updateDarkMode();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDarkMode);
});

// Cleanup listener
onUnmounted(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateDarkMode);
});

// กำหนด extensions สำหรับภาษา
const languageExtension = computed(() => {
  const lang = props.language.toLowerCase();
  switch (lang) {
    case 'javascript':
      return javascript({ jsx: false });
    case 'python':
      return python();
    default:
      return javascript({ jsx: false });
  }
});

// กำหนด extensions ทั้งหมด
const extensions = computed(() => {
  const exts = [
    languageExtension.value,
    lineNumbers(),
    indentUnit.of("    "),
    EditorState.tabSize.of(4),
    EditorState.allowMultipleSelections.of(true),
  ];
  exts.push(isDarkMode.value ? materialDark : materialLight);
  return exts;
});

// ดึง cursor position เมื่อ editor พร้อม
const handleReady = (payload: { view: EditorView }) => {
  editorView = payload.view;
  console.log('Editor ready');
  updateCursorPosition();
};

// อัปเดต cursor position เมื่อมีการเปลี่ยนแปลงใน editor
const handleUpdate = (payload: { view: EditorView }) => {
  console.log('Editor updated');
  updateCursorPosition();
};

// ฟังก์ชันสำหรับดึง cursor position และ emit ไปที่ parent
const updateCursorPosition = () => {
  if (!editorView) return;

  const state = editorView.state;
  const selection = state.selection.main;
  const pos = selection.from;

  // ดึง line และ column จากตำแหน่งเคอร์เซอร์
  const line = state.doc.lineAt(pos);
  const lineNumber = line.number;
  const col = pos - line.from + 1; // Column เริ่มจาก 1

  console.log('Cursor position:', { line: lineNumber, col });
  emit('update:line', lineNumber);
  emit('update:col', col);
};

// อัปเดต code เมื่อ props.modelValue เปลี่ยน
watch(() => props.modelValue, (newValue) => {
  if (newValue !== code.value) {
    code.value = newValue;
  }
});

// อัปเดต modelValue เมื่อ code เปลี่ยน
watch(code, (newCode) => {
  emit('update:modelValue', newCode);
});

// อัปเดต theme เมื่อโหมดเปลี่ยน
watch(isDarkMode, () => {
  console.log('Dark mode changed, updating extensions');
});
</script>

<template>
  <div class="editor-wrapper">
    <Codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '100%' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="4"
      :extensions="extensions"
      @ready="handleReady"
      @update="handleUpdate"
      @change="() => console.log('Editor changed')"
      @focus="() => console.log('Editor focused')"
      @blur="() => console.log('Editor blurred')"
    />
  </div>
</template>

<style scoped>
.editor-wrapper {
  width: 100%;
  height: 100%;
  --custom-bg-light: v-bind(customBgLight);
  --custom-bg-dark: v-bind(customBgDark);
  --caret-color: #000000;
  --gutter-bg: v-bind(customGutterBgLight);
}

.dark .editor-wrapper {
  --caret-color: #ffffff;
  --gutter-bg: v-bind(customGutterBgDark);
}

.cm-editor {
  height: 100% !important;
  width: 100% !important;
  display: flex;
  flex-direction: row;
  touch-action: none;
  background-color: var(--custom-bg-light) !important;
}

.dark .cm-editor {
  background-color: var(--custom-bg-dark) !important;
}

.cm-scroller {
  overflow: auto;
  height: 100% !important;
  flex: 1;
  touch-action: pan-y;
}

.cm-content,
.cm-gutter {
  height: 100% !important;
}

.cm-gutters {
  height: 100% !important;
  min-width: 30px;
  margin: 0;
  padding: 0;
  position: sticky !important;
  top: 0 !important;
  bottom: 0 !important;
  background-color: var(--gutter-bg) !important;
}

.cm-gutterElement {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.cm-line {
  background-color: transparent !important;
}
</style>