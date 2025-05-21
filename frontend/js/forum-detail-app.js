// js/forum-detail-app.js
import { getPostById, addComment } from './forum-api.js';

// ID user tạm
const currentUserId = 1;
// Lấy postId từ querystring
const params = new URLSearchParams(window.location.search);
const postId = Number(params.get('id'));

// Element trong page
const titleEl         = document.querySelector('.topic-card .topic-header h5');
const bodyEl          = document.querySelector('.topic-card .topic-content p');
const commentsCountEl = document.getElementById('comments-count');
const commentsListEl  = document.getElementById('comments-list');
const newCommentInput = document.getElementById('new-comment-text');
const postCommentBtn  = document.getElementById('btn-post-comment');

/**
 * Load chi tiết post + comments, render lên UI
 */
async function loadDetail() {
  try {
    const post = await getPostById(postId);
    // Render post
    titleEl.textContent         = post.title;
    bodyEl.textContent          = post.body;
    commentsCountEl.textContent = post.comments.length;
    // Render comments
    commentsListEl.innerHTML = '';
    post.comments.forEach(c => {
      const div = document.createElement('div');
      div.className = 'comment mb-3';
      div.innerHTML = `
        <div class="d-flex align-items-center mb-1">
          <img src="${c.author.avatarUrl||'img/default.jpg'}" class="user-avatar me-2" alt="Avatar">
          <strong>${c.author.username}</strong>
          <span class="ms-2 text-muted">${new Date(c.createdAt).toLocaleString()}</span>
        </div>
        <p>${c.text}</p>
      `;
      commentsListEl.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading detail:', err);
    alert('Không thể tải nội dung bài viết.');
  }
}

/**
 * Gửi bình luận mới lên server rồi reload
 */
postCommentBtn.addEventListener('click', async () => {
  const text = newCommentInput.value.trim();
  if (!text) {
    alert('Viết gì đó rồi mới gửi.');
    return;
  }
  try {
    await addComment({ text, postId, authorId: currentUserId });
    newCommentInput.value = '';
    await loadDetail();
  } catch (err) {
    console.error('Error adding comment:', err);
    alert('Không thể thêm bình luận.');
  }
});

// Chạy khi page sẵn sàng
document.addEventListener('DOMContentLoaded', loadDetail);
