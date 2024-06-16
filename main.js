const productElement = document.getElementById("products");

const nameInput = document.getElementById("name");
const imageInput = document.getElementById("image");
const priceInput = document.getElementById("price");

let isEdit;

const url = "http://localhost:3000/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    const row = data
      .map(
        (item) => /*html */ `<tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td><img src=${item.image}></td>
    <td>${item.price}</td>
    <td> 
    <button class="btn btn-danger" onClick="deleteProduct(${item.id})">Delete</button>
            <button class="btn btn-warning" onClick="editProduct(${item.id})">Update</button>
    </td>
    </tr>`
      )
      .join("");
    productElement.innerHTML = row;
  });

function deleteProduct(id) {
  if (confirm("Are you sure?")) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
}

function handleSubmit() {
  const name = nameInput.value;
  const image = imageInput.value;
  const price = priceInput.value;

  if (!name || !price) {
    alert("khong duoc bo trong!");
    return;
  }
  if (price < 0) {
    alert("gia khong duoc nho hon 0");
    return;
  }
  if (isEdit) {
    // logic edit
    fetch(`${url}/${isEdit}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, image, price }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  } else {
    //logic add
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, image, price }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
}

function editProduct(id) {
  isEdit = id;
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      nameInput.value = data.name;
      imageInput.value = data.image;
      priceInput.value = data.price;
    });
}
