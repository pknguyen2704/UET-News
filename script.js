imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result; // Thiết lập src cho hình ảnh preview
            imagePreview.style.display = 'block'; // Hiển thị hình ảnh preview
        };
        reader.readAsDataURL(file); // Đọc file hình ảnh
    }
});

document.getElementById('newsSubmitBtn').addEventListener('click', function() {
    const userInput = document.getElementById('newsInput').value;
    const previewText = document.getElementById('previewText');

    if (userInput) {
        previewText.textContent = userInput; // Hiển thị nội dung người dùng nhập
    } else {
        previewText.textContent = 'Vui lòng nhập văn bản để hiển thị preview!'; // Thông báo nếu không có văn bản
    }
});


