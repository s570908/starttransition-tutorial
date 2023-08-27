// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith("/posts")) {
    return await getPosts();
  } else {
    throw Error("Not implemented");
  }
}

export async function getPosts() {
  let posts = [];
  for (let i = 0; i < 500; i++) {
    posts.push({
      id: i,
      title: "Post #" + (i + 1),
    });
  }
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  return posts;
}

// Fetch external data
export async function fetchPosts() {
  //let url = `https://jsonplaceholder.typicode.com/posts${userId ? "?userId=" + userId : ""}`;
  let url = `https://dummyjson.com/posts`;
  let fetching = fetch(url)
    .then((res) => res.json())
    .then((res) => res.posts);
  // Fetch request has gone well
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  return fetching;
}
