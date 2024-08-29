// @ts-nocheck

const form = document.querySelector(".form");
const deleteButtons = document.querySelectorAll(".btn-danger");

const name = document.getElementById("name");
const description = document.getElementById("description");
const image = document.getElementById("image");
const images = document.getElementById("images");
const countInStock = document.getElementById("countInStock");
const isAvailable = document.getElementById("isAvailable");
const category = document.getElementById("category");
const brand = document.getElementById("brand");
const price = document.getElementById("price");
const discount = document.getElementById("discount");

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div dir="rtl" class="alert alert-${type} mt-3">${message}</div>`;
  document.querySelector("form").insertAdjacentHTML("afterend", markup);
  window.setTimeout(hideAlert, 5000);
};

const createProduct = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/products", data);
    if (res.data.status === "success") showAlert("success", "محصول با موفقیت ایجاد شد. صفحه را رفرش کنید!");
  } catch (err) {
    alert(err);
  }
};

const deleteProduct = async (id) => {
  const confirmDelete = confirm("آیا مطمئن هستید که می خواهید این محصول را حذف کنید؟");
  if (confirmDelete) {
    try {
      const res = await axios.delete(`http://localhost:3000/api/products/${id}`);
      if (res.status === 204) window.location.reload();
    } catch (err) {
      alert(err.response.data.message);
    }
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    description: description.value,
    image: image.value,
    images: images.value.split(","),
    countInStock: parseInt(countInStock.value),
    isAvailable: isAvailable.value === "on",
    category: category.value,
    brand: brand.value,
    price: parseFloat(price.value),
    discount: parseFloat(discount.value),
  };

  createProduct(data);
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productId = e.target.getAttribute("data-id");
    deleteProduct(productId);
  });
});
