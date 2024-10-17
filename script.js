document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  let editingRow = null;
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const product = {
      name: form.name.value,
      description: form.description.value,
      price: parseFloat(form.price.value),
      category: form.category.value,
    };

    if (editingRow) {
      updateProduct(editingRow, product);
      editingRow = null;
    }
    else displayProduct(product);

    form.reset();
  });

  function displayProduct(product) {
    const addressResultsContent = document.getElementById(
      "address-results-content"
    );
    const tbody = addressResultsContent.querySelector("tbody");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
                        <td>${product.name || "N/A"}</td>
                        <td>${product.description || "N/A"}</td>
                        <td>${product.category || "N/A"}</td>
                        <td>${product.price || "N/A"}</td>
                        <td>
                          <button class="edit-btn">Editar</button>
                          <button class="remove-btn">Remover</button>
                        </td>
                      `;

    tbody.appendChild(newRow);

    const removeButton = newRow.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      newRow.remove();
    });

    const editButton = newRow.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      // take current row(newRow) and data(product)
      editProduct(newRow, product);
    });

    showResults();
  }

  function editProduct(row, product) {
    form.name.value = product.name;
    form.description.value = product.description;
    form.price.value = product.price;
    form.category.value = product.category;

    // !!!!!!!!!! here where whe set the editing ROW!!!!!!!!
    editingRow = row;

    submitButton.textContent = "Atualizar";

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateProduct(row, updatedProduct) {
    row.innerHTML = `
      <td>${updatedProduct.name || "N/A"}</td>
      <td>${updatedProduct.description || "N/A"}</td>
      <td>${updatedProduct.category || "N/A"}</td>
      <td>${updatedProduct.price || "N/A"}</td>
      <td>
        <button class="edit-btn">Editar</button>
        <button class="remove-btn">Remover</button>
      </td>
    `;

    const removeButton = row.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      row.remove();
    });

    const editButton = row.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      editProduct(row, updatedProduct);
    });

    showResults();
  }

  function showResults() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";
    resultsDiv.scrollIntoView({ behavior: "smooth" });
  }
});
