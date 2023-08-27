import { fetchData, getPosts, fetchPosts } from "./data.js";
import usePromise from "./usePromise.js";
import useSWR from "swr";
import fetcher from "./fetcher.js";

// Note: this component is written using an experimental API
// that's not yet available in stable versions of React.

// For a realistic example you can follow today, try a framework
// that's integrated with Suspense, like Relay or Next.js.

function PostsTab() {
  //// Mehtod 1
  // const posts = usePromise(fetchPosts);
  //// unwanted loading indicator가 사라지지 않고 나타난다. 이유는 모르겠다.
  //// Method 2와 method 3에서는 사라진다.

  //// Method 2
  // const posts = use(fetchData("/posts"));

  //// Method 3
  const { data, error } = useSWR(`https://dummyjson.com/posts`, fetcher, {
    suspense: true,
  });
  const { posts } = data;

  if (!posts) return null;
  return (
    <ul className="items">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} />
      ))}
    </ul>
  );
}

function Post({ title }) {
  console.log(`Post ${title}: rendered`);
  return <li className="item">{title}</li>;
}

export default PostsTab;

// This is a workaround for a bug to get the demo running.
// TODO: replace with real implementation when the bug is fixed.
function use(promise) {
  if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else if (promise.status === "pending") {
    throw promise;
  } else {
    promise.status = "pending";
    promise.then(
      (result) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      (reason) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
}
