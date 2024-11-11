
// ตรวจสอบสถานะการล็อกอินเมื่อโหลดหน้า
document.addEventListener("DOMContentLoaded", function () {
  // ตรวจสอบว่าเป็นหน้าที่ต้องล็อกอินหรือไม่
  const requiresAuth = document.body.hasAttribute("data-requires-auth");
  if (requiresAuth) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      // ถ้ายังไม่ได้ล็อกอิน ให้เก็บ URL ปัจจุบันและเปลี่ยนเส้นทางไปหน้า login
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = "login.html";
      return;
    }
  }

  // อัพเดทปุ่มล็อกอิน/ล็อกเอาท์
  const loginButton = document.getElementById("loginButton");
  if (!loginButton) return; // ถ้าไม่มีปุ่มล็อกอิน ไม่ต้องทำอะไร

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  if (isLoggedIn === "true") {
    // เปลี่ยนปุ่มเป็นล็อกเอาท์
    loginButton.textContent = "ออกจากระบบ";
    loginButton.href = "#";
    loginButton.onclick = function () {
      // ล็อกเอาท์
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      // ล้างตะกร้าสินค้า
      localStorage.removeItem("cart");
      // กลับไปหน้า login
      window.location.href = "login.html";
      return false;
    };

    // แสดงชื่อผู้ใช้ (ถ้ามี)
    if (username) {
      const userDisplay = document.createElement("span");
      loginButton.parentNode.insertBefore(userDisplay, loginButton);
    }
  } else {
    // เปลี่ยนกลับเป็นปุ่มล็อกอิน
    loginButton.textContent = "เข้าสู่ระบบ";
    loginButton.href = "login.html";
    loginButton.onclick = null;

    // ลบการแสดงชื่อผู้ใช้ถ้ามี
    const prevUserDisplay = loginButton.previousElementSibling;
    if (prevUserDisplay && prevUserDisplay.tagName === "SPAN") {
      prevUserDisplay.remove();
    }
  }
});

// ฟังก์ชันล็อกเอาท์
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");

  // รีเซ็ตตะกร้าสินค้า
  if (typeof cart !== "undefined") {
    cart = [];
    localStorage.removeItem("cart");
    if (typeof displaycart === "function") {
      displaycart();
    }
  }

  // อัพเดทการแสดงผลปุ่ม
  updateLoginButton();

  // รีโหลดหน้าเว็บ
  window.location.href = "login.html";
}

// ฟังก์ชันตรวจสอบการล็อกอิน
function checkLogin() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
    return false;
  }
  return true;
}
// ในส่วนที่จัดการเมื่อล็อกอินสำเร็จของหน้า login.html
function loginSuccess(username) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", username);

  // ตรวจสอบว่ามีหน้าที่ต้องการจะกลับไปหรือไม่
  const redirectUrl = localStorage.getItem("redirectAfterLogin");
  localStorage.removeItem("redirectAfterLogin"); // ลบ URL ที่เก็บไว้

  if (redirectUrl) {
    window.location.href = redirectUrl;
  } else {
    window.location.href = "login.html";
  }
}
