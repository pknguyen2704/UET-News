const imageInput = document.getElementById('imageInput')
const imagePreview = document.getElementById('imagePreview')

const generateImage = document.getElementById('newsCreate')
const generateCaption = document.getElementById('newsCreate');

const downloadButton = document.getElementById('downloadButton');
const newsTitle = document.getElementById('newsTitle');
const fontSizeTitle = document.getElementById('fontSizeTitle');

const newsCaption = document.getElementById('newsInput');

const captionPreview = document.getElementById('captionPreview');
const clearImgBtn = document.getElementById('clearImgBtn');

let img = new Image();
let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d');
let template = new Image();
template.src = "css/img/template.png"

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

document.body.addEventListener('paste', (event) => {
    const items = event.clipboardData.items;
    for (let item of items) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            const reader = new FileReader();
            reader.onload = (e) => displayImage(e.target.result);
            reader.readAsDataURL(file);
        }
    }
});

function displayImage(src) {
    imagePreview.src = src;
    imagePreview.style.display = 'block';
    clearImgBtn.style.display = 'block'; 
}

generateImage.addEventListener('click', () => {
    img.src = imagePreview.src;
    img.onload = () => {
        const scale = Math.min(template.width / img.width);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        // Đặt kích thước canvas theo kích thước hình ảnh
        canvas.width = template.width;
        canvas.height = template.height;
        // Vẽ hình ảnh lên canvas
        ctx.drawImage(img, 0, 0,newWidth, newHeight);
        ctx.drawImage(template, 0, 0);

        const textToDraw = newsTitle.value || 'Chữ mặc định'; // Nếu không có chữ nhập vào, dùng chữ mặc định
        // const fontSize = fontSizeTitle.value || 40;
        // Vẽ chữ lên canvas
        // ctx.font = '33px'; // Sử dụng font tùy chỉnh
        ctx.font = '40px UTM-Neutra';
        ctx.fillStyle = 'white'; // Màu chữ
        ctx.fillText(textToDraw, 90, 750);
        fontSizeTitle.style.display = 'block';
        canvas.style.display = 'block'; // Hiển thị canvas

        downloadButton.style.display = 'block'; // Hiển thị nút tải xuống
        canvas.style.display = 'block';

    };
});

generateCaption.addEventListener('click', function(event){
    event.preventDefault(); // Ngăn trang tự load lại
    const caption = newsCaption.value;
    if(caption) {
        captionPreview.textContent = caption;
    } else {
        captionPreview.textContent = "Vui lòng nhập caption!"
    }
})

// Download the canvas as an image
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});