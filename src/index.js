const renderDogs = async () => {
  const request = await fetch("http://localhost:3000/dogs");
  const dogs = await request.json();

  const tableBody = document.getElementById("table-body");
  const formName = document.getElementById("name");
  const formBreed = document.getElementById("breed");
  const formSex = document.getElementById("sex");
  let currentID = "";

  dogs.forEach((dog) => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    const breed = document.createElement("td");
    const sex = document.createElement("td");
    const editContainerTd = document.createElement("td");
    const edit = document.createElement("button");

    name.textContent = dog.name;
    breed.textContent = dog.breed;
    sex.textContent = dog.sex;
    edit.textContent = "EDIT";

    edit.addEventListener("click", () => {
      formName.value = dog.name;
      formBreed.value = dog.breed;
      formSex.value = dog.sex;
      currentID = dog.id;
    });

    editContainerTd.append(edit);
    tr.append(name, breed, sex, editContainerTd);
    tableBody.append(tr);
  });
  const editForm = document.getElementById("dog-form");
  editForm.addEventListener("submit", (e) => {
    const formName = document.getElementById("name");
    const formBreed = document.getElementById("breed");
    const formSex = document.getElementById("sex");

    fetch(`http://localhost:3000/dogs/${currentID}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: formName.value,
        breed: formBreed.value,
        sex: formSex.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  });
};

document.addEventListener("DOMContentLoaded", renderDogs());
