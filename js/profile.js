document.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  if (!user) return;
  document.getElementById('profileName').value = user.name || '';
  document.getElementById('profileEmailInput').value = user.email || '';
  document.getElementById('company').value = user.company || '';
  document.getElementById('profileForm').addEventListener('submit', event => {
    event.preventDefault();
    const updated = updateCurrentUser({ name: document.getElementById('profileName').value.trim(), email: document.getElementById('profileEmailInput').value.trim(), company: document.getElementById('company').value.trim() });
    document.getElementById('profileHeading').textContent = updated.name;
    document.getElementById('profileEmail').textContent = updated.email;
    document.querySelectorAll('[data-user-initials]').forEach(element => element.textContent = userInitials(updated));
    showToast('Profile berhasil diperbarui.');
  });
  const logoutModal = document.getElementById('logoutModal');
  document.getElementById('logoutButton').addEventListener('click', () => logoutModal.classList.add('show'));
  document.getElementById('cancelLogout').addEventListener('click', () => logoutModal.classList.remove('show'));
  document.getElementById('confirmLogout').addEventListener('click', () => {
    logoutModal.classList.remove('show');
    document.getElementById('logoutScreen').classList.add('show');
    setTimeout(logoutUser, 900);
  });
});
