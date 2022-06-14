// import React, { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
//
// export default function App() {
//
//     const editorRef = useRef(null);
//
//     return (
//         <>
//             <Editor
//                 apiKey='7vg6ljyq1brs6eapvpt76mhps7wgko123tgdlrw40ve47amn'
//                 onInit={(evt, editor) => editorRef.current = editor}
//                 initialValue="<p>** 이미지를 드래그 앤 드랍해보세요! **</p>"
//                 init={{
//                     height: 500,
//                     menubar: false,
//                     plugins: [
//                         'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//                         'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                         'insertdatetime', 'media', 'table', 'help', 'wordcount'
//                     ],
//                     toolbar: 'undo redo | blocks | ' +
//                         'image | bold italic underline backcolor | alignleft aligncenter ' +
//                         'alignright alignjustify | bullist numlist outdent indent | ' +
//                         'table code help',
//                     content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//                 }}
//             />
//         </>
//     );
// }