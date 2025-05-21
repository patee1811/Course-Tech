// js/forum-app.js
import { getPosts, createPost } from './forum-api.js';

// Thẻ chứa các topic cards
const container    = document.getElementById('topicsContainer');
// Button Post Discussion trong modal
const newBtn       = document.querySelector('#newDiscussionModal .btn-primary');
// Input trong form modal
const titleInput   = document.getElementById('topicTitle');
const bodyInput    = document.getElementById('topicContent');
// ID user tạm thời
const currentUserId = 1;

/**
 * Tải posts và render thành cards
 */
async function loadAndRender() {
  try {
    const posts = await getPosts();
    container.innerHTML = '';
    posts.forEach(p => {
      const card = document.createElement('div');
      card.className = 'topic-card';
      card.onclick = () => {
        window.location.href = `forumdetail.html?id=${p.id}`;
      };
      card.innerHTML = `
        <div class="topic-header">
          <img src="${p.author.avatarUrl || 'img/default.jpg'}" class="user-avatar" alt="Avatar">
          <div>
            <h5>${p.title}</h5>
            <p class="topic-meta">
              Latest reply from <strong>${p.latestReplyBy || p.author.username}</strong>
            </p>
          </div>
        </div>
        <div class="topic-content">
          <p>${p.body}</p>
        </div>
        <div class="topic-footer d-flex justify-content-between align-items-center">
          <span>
            <i class="far fa-comment"></i> ${p.comments.length} Comments
          </span>
          <button class="btn btn-sm btn-link">View</button>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert('Không thể tải danh sách bài viết.');
  }
}

/**
 * Xử lý tạo bài mới khi bấm nút trong modal
 */
newBtn.addEventListener('click', async () => {
  const title = titleInput.value.trim();
  const body  = bodyInput.value.trim();
  if (!title || !body) {
    alert('Vui lòng nhập cả tiêu đề và nội dung.');
    return;
  }
  try {
    await createPost({ title, body, authorId: currentUserId });
    // Đóng modal (Bootstrap 5)
    const modalEl = document.getElementById('newDiscussionModal');
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();
    // Clear form và reload
    titleInput.value = '';
    bodyInput.value  = '';
    await loadAndRender();
  } catch (err) {
    console.error(err);
    alert('Đã có lỗi khi tạo bài viết.');
  }
});

// Chạy lần đầu
document.addEventListener('DOMContentLoaded', loadAndRender);
