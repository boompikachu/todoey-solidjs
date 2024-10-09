import { createSignal, For, onMount, type Ref } from "solid-js";

export type ToastProps = {
  ref?: Ref<ToastRef>;
};

export type ToastRef = {
  addToast?: (_: { id: string; title: string }) => void;
};

export const Toast = (props: ToastProps) => {
  const [contentList, setContentList] = createSignal<
    { id: string; title: string }[]
  >([]);

  onMount(() => {
    if (props.ref) {
      const refObject: ToastRef = {
        addToast: (title) => {
          setContentList((prev) => [...prev, title]);
        },
      };
      typeof props.ref === "function"
        ? props.ref(refObject)
        : (props.ref = refObject);
    }
  });

  return (
    <div
      class={
        "bg-gray-200 rounded px-8 py-4 " +
        (contentList().length <= 0 && "hidden")
      }
    >
      <ul>
        <For each={contentList()}>
          {(content) => {
            return (
              <li
                ref={() => {
                  setTimeout(() => {
                    setContentList((prev) => [
                      ...prev.filter((val) => val.id !== content.id),
                    ]);
                  }, 3000);
                }}
              >
                Added: {content.title}
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
};
