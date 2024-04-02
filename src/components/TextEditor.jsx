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
        initialValue={editorInput}
        onEditorChange={(newValue, editor) =>
          handleOnChangeInput(label, newValue)
        }
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="yrts0vwgndyeh7evrtmrr652qrug4to4qd8cvub6wt1by4mw"
        init={{
          menubar: false,
          plugins: "autolink link lists wordcount autolink",
          toolbar: "bold italic underline insertLink bullist ",
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
