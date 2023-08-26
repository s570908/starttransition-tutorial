import { useState, useTransition } from "react";
import TabButton from "./TabButton.js";
import AboutTab from "./AboutTab.js";
import PostsTab from "./PostsTab.js";
import ContactTab from "./ContactTab.js";

export default function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    // scope function: setState function들로 구성된다. state update로 인해서 렌더되는 컴포넌트는, 여기서는 TabContainer, transition될 수 있다.
    // transition이 될 수 있다는 말은 non-blocking, interruptible, changeable이라는 의미이다. TabContainer는 다른 렌더되는 컴포넌트에 의해서
    // 취소될 수 있다. 그리고 나중에 다시 렌더된다.
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton isActive={tab === "contact"} onClick={() => selectTab("contact")}>
        Contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
}
