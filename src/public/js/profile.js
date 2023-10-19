
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.onclick = async () => {
  try {
    const loadingElement = document.createElement('div');
    loadingElement.textContent = 'Loading...';
    document.body.appendChild(loadingElement);
    localStorage.removeItem('cartID');
    await fetch('/api/sessions/logout');
    document.body.removeChild(loadingElement);
    const successElement = document.createElement('div');
    successElement.textContent = 'Loading page...';
    document.body.appendChild(successElement);
    setTimeout(() => {
      document.body.removeChild(successElement);
      window.location.href = '/?login=true';
    }, 2500);
  } catch (error) {
    const errorElement = document.createElement('div');
    errorElement.textContent = 'Something went wrong!';
    document.body.appendChild(errorElement);
    setTimeout(() => {
      document.body.removeChild(errorElement);
    }, 2500);
  }
};

function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user??')) {
    fetch(`/api/users/delete/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          window.location.reload();
        } else {
          alert('Error deleting user.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
