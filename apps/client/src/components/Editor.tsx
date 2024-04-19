import {
  ForwardedRef,
  forwardRef,
  Ref,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useUnmount } from "react-use";
import Quill, { EmitterSource } from "quill";

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: string;
  onTextChange: (text: string) => void;
  onSelectionChange: (
    range: Range,
    oldRange: Range,
    source: EmitterSource,
  ) => void;
}

const Editor = forwardRef(function Editor(
  { readOnly, defaultValue, onTextChange, onSelectionChange }: EditorProps,
  ref: Ref<Quill>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    ref?.current?.enable(!readOnly);
  }, [ref, readOnly]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );

    const quill = new Quill(editorContainer, {
      theme: "snow",
    });

    ref.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });
  }, [ref]);

  useUnmount(() => {
    ref.current = null;
    container.innerHTML = "";
  });

  return <div ref={containerRef}></div>;
});

Editor.displayName = "Editor";

export default Editor;
