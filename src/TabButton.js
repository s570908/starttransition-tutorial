import { useTransition } from "react";

export default function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        // onClick()은 parent component, 즉 TabContainer의 state를 update한다. 이 state update는 transition으로 marked된다.
        // 이전의 컴포넌트 렌더링은 다음 컴포넌트 렌더링에 의해서 transition, non-blocking, interruptible 하게 된다.
        startTransition(() => {
          onClick();
        });
      }}
    >
      {children}
    </button>
  );
}
