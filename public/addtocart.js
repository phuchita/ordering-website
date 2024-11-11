// เมนูที่สามารถปรับเปลี่ยนจำนวนและรายละเอียดได้
const product = [
  {
    id: 0,
    image: "images/ไก่-og.png",
    title: "ไก่ทอดหาดใหญ่สูตรดั้งเดิม",
    price: 29,
  },
  {
    id: 1,
    image: "images/ไก่-พริก.png",
    title: "ไก่ทอดหาดใหญ่สูตรพริกแห้ง",
    price: 39,
  },
  {
    id: 2,
    image: "images/ข้าวโปะไก่ทอด.png",
    title: "ข้าวโปะไก่ทอด",
    price: 69,
  },
  {
    id: 3,
    image: "images/ข้าวยำไก่ทอดแซ่บ.png",
    title: "ข้าวยำไก่ทอดแซ่บ",
    price: 79,
  },
  {
    id: 4,
    image: "images/หอมทอด.png",
    title: "หอมทอด",
    price: 59,
  },
  {
    id: 5,
    image: "images/เฟรนฟราย.png",
    title: "เฟรนซ์ฟรายส์",
    price: 59,
  },
  {
    id: 6,
    image: "images/ข้าวสวย.png",
    title: "ข้าวสวยหอมมะลิ",
    price: 15,
  },
  {
    id: 7,
    image: "images/ข้าวเหนียวมะม่วง.png",
    title: "ข้าวเหนียวมะม่วง",
    price: 60,
  },
  {
    id: 8,
    image: "images/ขนมเบื้องฝอยทอง.png",
    title: "ขนมเบื้องฝอยทอง",
    price: 49,
  },
  {
    id: 9,
    image: "images/coke.png",
    title: "โค้ก 32 oz",
    price: 29,
  },
  {
    id: 10,
    image: "images/แดงโซดา.png",
    title: "แดงโซดา",
    price: 25,
  },
  {
    id: 11,
    image: "images/ปังเย็นนมชมพู.png",
    title: "ปังเย็นนมชมพู",
    price: 59,
  },
  {
    id: 12,
    image: "images/ปังเย็นชาไทย.png",
    title: "ปังเย็นชาไทย",
    price: 59,
  },
  {
    id: 13,
    image: "images/ปังเย็นโกโก้.png",
    title: "ปังเย็นโกโก้",
    price: 59,
  },
  {
    id: 14,
    image: "images/ปังเย็นชาเขียว.png",
    title: "ปังเย็นชาเขียว",
    price: 59,
  },
];

// คำสั่งแสดงรายการเมนู
const categories = [
  ...new Set(
    product.map((item) => {
      return item;
    })
  ),
];
let i = 0;
document.getElementById("root").innerHTML = categories
  .map((item) => {
    var { image, title, price } = item;
    return (
      `<div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image}></img>
                </div>
            <div class='bottom'>
            <p>${title}</p>
            <h2>฿ ${price}.00</h2>` +
      "<button onclick='addtocart(" +
      i++ +
      ")'>เพิ่มลงตะกร้า</button>" +
      `</div>
            </div>`
    );
  })
  .join("");

  
var cart = [];

// ตรวจสอบและดึงข้อมูลจาก localStorage
window.onload = function () {
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart")); // ดึงข้อมูลจาก localStorage
    displaycart(); // แสดงข้อมูลในตะกร้าเมื่อโหลดหน้า
  }
};

function addtocart(a) {
  cart.push({ ...categories[a] });
  localStorage.setItem("cart", JSON.stringify(cart)); // เก็บตะกร้าใน localStorage
  displaycart(); // แสดงตะกร้าหลังจากเพิ่มสินค้า
}

function delElement(a) {
  cart.splice(a, 1); // ลบสินค้าจากตะกร้า
  localStorage.setItem("cart", JSON.stringify(cart)); // อัพเดตข้อมูลตะกร้าใน localStorage
  displaycart(); // แสดงตะกร้าหลังจากลบสินค้า
}

function displaycart() {
  let j = 0,
    total = 0;
  document.getElementById("count").innerHTML = cart.length;

  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "฿ " + 0 + ".00";
  } else {
    document.getElementById("cartItem").innerHTML = cart
      .map((items) => {
        var { image, title, price } = items;
        total = total + price;
        document.getElementById("total").innerHTML = "฿ " + total + ".00";
        return (
          `<div class='cart-item'>
                  <div class='row-img'>
                      <img class='rowimg' src=${image}>
                  </div>
                  <p style='font-size:12px;'>${title}</p>
                  <h2 style='font-size: 15px;'>฿ ${price}.00</h2>` +
          "<i class='fa-solid fa-trash' onclick='delElement(" +
          j++ +
          ")'></i></div>"
        );
      })
      .join("");
  }
}
