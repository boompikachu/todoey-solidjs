export type ButtonProps = {
  title: string;
  onClick?: () => void;
};
export const Button = (props: ButtonProps) => {
  return (
    <button
      class="h-8 px-4 flex items-center justify-center rounded bg-gray-200"
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};
