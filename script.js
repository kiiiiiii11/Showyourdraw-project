// โหลดภาพที่บันทึกไว้
document.addEventListener("DOMContentLoaded", function () {
    loadImages();
});

// ฟังก์ชันอัปโหลดภาพ
function uploadImage() {
    const fileInput = document.getElementById("imageUpload");
    const titleInput = document.getElementById("imageTitle");

    if (fileInput.files.length === 0) {
        alert("กรุณาเลือกไฟล์ภาพก่อน!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const imageData = event.target.result;
        const title = titleInput.value || "ไม่มีชื่อ";

        saveImage(imageData, title);
        displayImage(imageData, title);
        
        fileInput.value = ""; 
        titleInput.value = "";
    };

    reader.readAsDataURL(file);
}

// ฟังก์ชันบันทึกลง LocalStorage
function saveImage(imageData, title) {
    let images = JSON.parse(localStorage.getItem("gallery")) || [];
    images.push({ imageData, title });
    localStorage.setItem("gallery", JSON.stringify(images));
}

// ฟังก์ชันโหลดภาพที่เคยบันทึก
function loadImages() {
    const images = JSON.parse(localStorage.getItem("gallery")) || [];
    images.forEach(img => displayImage(img.imageData, img.title));
}

// ฟังก์ชันแสดงภาพ
function displayImage(imageData, title) {
    const gallery = document.getElementById("gallery");
    const div = document.createElement("div");
    div.classList.add("image-card");

    const img = document.createElement("img");
    img.src = imageData;
    img.alt = title;
    img.onclick = function () {
        openFullScreen(imageData);
    };

    const p = document.createElement("p");
    p.textContent = title;

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.textContent = "×";
    delBtn.onclick = function () {
        deleteImage(div, imageData);
    };

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(delBtn);
    gallery.appendChild(div);
}

// ฟังก์ชันเปิดภาพเต็มจอ
function openFullScreen(imageSrc) {
    const fullScreen = document.createElement("div");
    fullScreen.style.position = "fixed";
    fullScreen.style.top = "0";
    fullScreen.style.left = "0";
    fullScreen.style.width = "100%";
    fullScreen.style.height = "100%";
    fullScreen.style.backgroundColor = "rgba(0,0,0,0.8)";
    fullScreen.style.display = "flex";
    fullScreen.style.justifyContent = "center";
    fullScreen.style.alignItems = "center";
    fullScreen.style.zIndex = "1000";

    const img = document.createElement("img");
    img.src = imageSrc;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    
    fullScreen.onclick = function () {
        document.body.removeChild(fullScreen);
    };

    fullScreen.appendChild(img);
    document.body.appendChild(fullScreen);
}

// ฟังก์ชันลบภาพ
function deleteImage(div, imageData) {
    let images = JSON.parse(localStorage.getItem("gallery")) || [];
    images = images.filter(img => img.imageData !== imageData);
    localStorage.setItem("gallery", JSON.stringify(images));
    
    div.remove();
}
