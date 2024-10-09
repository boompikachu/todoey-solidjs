export type TextInputProps = {
  value: string;
  onValueChange?: (value: TextInputProps["value"]) => void;
};

export const TextInput = (props: TextInputProps) => {
  return (
    <input
      class="border rounded h-8"
      value={props.value}
      onChange={(e) => {
        const value = e.currentTarget.value;
        props.onValueChange?.(value);
      }}
    />
  );
};
