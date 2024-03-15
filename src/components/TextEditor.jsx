import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import "../css/textEditor.css";
export default function TextEditor() {
  const editorRef = useRef();
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="textEditorContainer">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="yrts0vwgndyeh7evrtmrr652qrug4to4qd8cvub6wt1by4mw"
        init={{
          menubar: false,
          plugins:
            "autolink link lists wordcount checklist tinymcespellchecker autolink",
          toolbar: "bold italic underline | insertLink | bullist checklist ",
          icons: "thin",
          content_style: `
                body {
                    background: #afdec9;
                }
            `,
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>
  );
}
