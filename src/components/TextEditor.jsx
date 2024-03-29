import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import "../css/textEditor.css";
export default function TextEditor({
  editorInput,
  handleOnChangeInput,
  label,
}) {
  const editorRef = useRef();
  return (
    <div className="textEditorContainer">
      <Editor
        onChange={(event) => {
          handleOnChangeInput(label, event);
        }}
        initialValue={editorInput}
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
    </div>
  );
}
