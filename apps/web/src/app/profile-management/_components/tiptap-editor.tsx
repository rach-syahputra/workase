import * as React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Heading } from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import Underline from '@tiptap/extension-underline';
import { IUpdateForm } from '@/types/profile';
import { FormikProps } from 'formik';
type Props = {
  onChange: (value: string) => void;
  formik: FormikProps<IUpdateForm>;
};
export const TiptapEditor: React.FC<Props> = ({ onChange, formik }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Underline,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: formik.values.description || '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[250px] border rounded-lg p-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && formik.values.description !== editor?.getHTML()) {
      editor?.commands.setContent(formik.values.description);
    }
  }, [formik.values.description, editor]);

  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(e.target.value);
    if (level === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor
        ?.chain()
        .focus()
        .toggleHeading({ level: level as any })
        .run();
    }
  };
  return (
    <div className="mx-auto space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg shadow-sm bg-gray-50">
        {/* Heading Select */}
        <select
          onChange={handleHeadingChange}
          className="p-1 text-sm transition bg-white border rounded-md hover:bg-gray-100"
          defaultValue={''}
        >
          {' '}
          <option value="" disabled>
            Heading
          </option>
          <option value="0">Normal Text</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>
        {/* Other buttons */}
        {[
          {
            label: 'Bullet',
            action: () => editor?.chain().focus().toggleBulletList().run(),
            isActive: editor?.isActive('bulletList'),
          },
          {
            label: 'Numbered',
            action: () => editor?.chain().focus().toggleOrderedList().run(),
            isActive: editor?.isActive('orderedList'),
          },
          {
            label: 'Underline',
            action: () => editor?.chain().focus().toggleUnderline().run(),
            isActive: editor?.isActive('underline'),
          },
          {
            label: 'Bold',
            action: () => editor?.chain().focus().toggleBold().run(),
            isActive: editor?.isActive('bold'),
          },
          {
            label: 'Italic',
            action: () => editor?.chain().focus().toggleItalic().run(),
            isActive: editor?.isActive('italic'),
          },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className={`rounded-md border px-3 py-1 text-sm transition ${item.isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Editor Content*/}
      <div className="w-full max-w-full overflow-x-auto bg-white border rounded-lg shadow-sm">
        <EditorContent
          editor={editor}
          className="min-h-[250px] max-w-full break-words p-4"
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        />
      </div>
    </div>
  );
};
