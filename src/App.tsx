import { Component, createSignal, createUniqueId, For } from "solid-js";
import { TextInput } from "./components/text-input";
import { Button } from "./components/button";
import { Toast, type ToastRef } from "./components/toast";

type Task = {
  id: string;
  title: string;
  createdAt: Date;
};

const [taskList, setTaskList] = createSignal<Task[]>([]);

const sortedTaskList = () =>
  taskList().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

export const App: Component = () => {
  const [title, setTitle] = createSignal("");

  let toastRef: ToastRef | undefined;

  return (
    <div class="p-12">
      <div class="flex gap-4">
        <TextInput
          value={title()}
          onValueChange={(value) => {
            setTitle(value);
          }}
        />
        <Button
          title="Add"
          onClick={() => {
            const id = createUniqueId();

            setTaskList((prev) => [
              ...prev,
              { id: id, title: title(), createdAt: new Date() },
            ]);

            toastRef?.addToast?.({ id: id, title: title() });

            setTitle("");
          }}
        />
      </div>

      <div class="h-8" />

      <ul class="space-y-4">
        <For each={sortedTaskList()}>
          {(task) => (
            <li class="flex gap-4 items-center">
              <Button
                title="X"
                onClick={() => {
                  setTaskList((prev) => [
                    ...prev.filter((val) => val.id !== task.id),
                  ]);
                }}
              />
              <p>{task.id}</p>
              <p>{task.title}</p>
            </li>
          )}
        </For>
      </ul>

      <div class="fixed bottom-10 right-10">
        <Toast ref={toastRef}></Toast>
      </div>
    </div>
  );
};
