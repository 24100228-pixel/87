// script.js

// Lấy tham chiếu đến các phần tử HTML chính
const previewImage = document.querySelector('#preview'); 
const captionText = document.querySelector('#caption'); 

// Lưu trữ các giá trị mặc định của ảnh placeholder
const defaultSrc = previewImage.src;
const defaultAlt = previewImage.alt;
const defaultCaption = captionText.textContent;

// --- 1. Hàm Xử lý Sự kiện UpDate (MouseOver/Focus) ---
function upDate(event) {
    // Sử dụng event.currentTarget để lấy đúng thẻ <figure> đã gắn listener
    const figureElement = event.currentTarget;
    const imageElement = figureElement.querySelector('img');

    // Lấy alt text và URL từ thẻ <img> bên trong figure
    const altText = imageElement.alt;
    const imageUrl = imageElement.src;

    // Cập nhật hình ảnh xem trước
    previewImage.src = imageUrl;
    previewImage.alt = altText;

    // Cập nhật mô tả (caption)
    captionText.textContent = altText;
}

// --- 2. Hàm Xử lý Sự kiện UnDo (MouseLeave/Blur) ---
function unDo() {
    // Đặt hình ảnh xem trước về trạng thái ban đầu
    previewImage.src = defaultSrc; 
    previewImage.alt = defaultAlt; 
    captionText.textContent = defaultCaption;
}


// --- 3. Hàm Chính để Thiết lập Thư viện và Khả năng Tiếp cận ---
function setupGallery() {
    // Lấy tất cả các phần tử <figure> trong thư viện ảnh
    const figures = document.querySelectorAll('.gallery figure'); 

    figures.forEach((figure) => {
        
        // ** YÊU CẦU QUAN TRỌNG: Tự động thêm tabindex="0" **
        // Điều này cho phép phần tử được focus bằng phím Tab
        figure.setAttribute('tabindex', '0');

        // ** THÊM LISTENERS **
        
        // Sự kiện Chuột (Yêu cầu phải giữ lại)
        figure.addEventListener('mouseover', upDate);
        figure.addEventListener('mouseleave', unDo);

        // Sự kiện Bàn phím (Yêu cầu phải thêm)
        figure.addEventListener('focus', upDate); 
        figure.addEventListener('blur', unDo);   
    });
}

// Chạy hàm thiết lập sau khi toàn bộ nội dung HTML đã được tải
document.addEventListener('DOMContentLoaded', setupGallery);
