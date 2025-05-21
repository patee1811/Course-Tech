// js/forum-api.js
const API_BASE = 'http://localhost:3003/forum';

/**
 * Lấy danh sách posts, có thể kèm search query
 */
export async function getPosts(search = '') {
  const url = search
    ? `${API_BASE}/posts?search=${encodeURIComponent(search)}`
    : `${API_BASE}/posts`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error fetching posts: ${res.status}`);
  return res.json();
}

/**
 * Tạo bài viết mới
 * @param {{ title: string, body: string, authorId: number }} dto
 */
export async function createPost(dto) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error(`Error creating post: ${res.status}`);
  return res.json();
}

/**
 * Lấy chi tiết 1 post theo id
 */
export async function getPostById(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error(`Error fetching post ${id}: ${res.status}`);
  return res.json();
}

/**
 * Gửi bình luận mới lên server
 * @param {{ text: string, postId: number, authorId: number }} dto
 */
export async function addComment(dto) {
  const res = await fetch(`${API_BASE}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error(`Error adding comment: ${res.status}`);
  return res.json();
}
