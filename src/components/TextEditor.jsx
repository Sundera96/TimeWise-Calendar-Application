import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import "../css/textEditor.css";
export default function TextEditor({
  editorInput,
  handleOnChangeInput,
  label,
}) {
  const editorRef = useRef();
  if (!editorInput) {
    editorInput = "";
  }
  return (
    <div className="textEditorContainer">
      <Editor
        value={editorInput}
        onEditorChange={(newValue, editor) =>
          handleOnChangeInput(label, newValue)
        }
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="yrts0vwgndyeh7evrtmrr652qrug4to4qd8cvub6wt1by4mw"
        init={{
          menubar: false,
          plugins: "link lists wordcount fullscreen",
          toolbar:
            "alignleft aligncenter alignright underline bullist fullscreen",
          content_style: `
                body {
                    background: #afdec9;
                }
            `,
          link_default_protocol: "https",
        }}
      />
    </div>
  );
}
