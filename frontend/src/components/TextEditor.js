import ReactQuill from "react-quill";

// code is modified version of code provided by React-Quill https://github.com/zenoamaro/react-quill

// snow theme adds all the selected functionality listed below

export default function TextEditor({ value, onChange }) {
  const modules = {
    toolbar: [
      // ["bold", "italic", "underline", "strike", "blockquote"], // blockquote wasn't really working
      ["bold", "italic", "underline", "strike", "code-block"], // code block allows ability to type code
      [{ header: [1, 2, false] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "check" }, // check-list ability but checks only work when editing
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }],
      // [{ 'color': [] }, { 'background': [] }], // denied ability to change background color of posts
      [{ font: [] }],
      [{ align: [] }],
      // ["formula"], // for math formatting - not great
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "code-block",
    //"blockquote",
    "header",
    "list",
    "bullet",
    "indent",
    "color",
    //"background",
    "font",
    "align",
    //"formula",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="TBox">
      <ReactQuill
        value={value}
        formats={formats}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
        autoFocus
      />
    </div>
  );
}
