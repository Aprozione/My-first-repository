const input = document.querySelector('.form-input__text');
const button = document.querySelector('.main-section__btn');
const list = document.querySelector('.myCases');

let myCases = [];

function addCase() {
  const description = input.value.trim();
  if (description === '') {
    return;
  }

  const newCase = {
    id: myCases.length === 0 ? 1 : myCases.at(-1).id + 1,
    description: description,
    isCompleted: false
  };

  
  myCases.push(newCase);

  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <input type="checkbox" class="case-checkbox" id="case-${newCase.id}">
    <label for="case-${newCase.id}" class="case-label">${newCase.id}. ${newCase.description}</label>
    <button type="button" class="case-delete" data-id="${newCase.id}">Delete</button>
  `;

  list.appendChild(listItem);

  input.value = '';
}

function deleteCase(id) {
  const index = myCases.findIndex(caseItem => caseItem.id === id);
  if (index === -1) {
    return;
  }

  myCases.splice(index, 1);

  const myCases = myCases.map((item, index) => ({...item, id:index}));

  const listItem = document.querySelector(`#case-${id}`).parentNode;
  listItem.parentNode.removeChild(listItem);

  const labels = document.querySelectorAll('.case-label');
  labels.forEach((label, index) => {
    label.textContent = `${index + 1}. ${myCases[index].description}`;
    label.previousElementSibling.id = `case-${myCases[index].id}`;
    label.nextElementSibling.dataset.id = myCases[index].id;
  });
}


button.addEventListener('click', addCase);

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addCase();
  }
});



list.addEventListener('click', function(event) {
  if (event.target.classList.contains('case-checkbox')) {
    const label = event.target.nextElementSibling;
    if (event.target.checked) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
  }
});


list.addEventListener('click', function(event) {
  if (event.target.classList.contains('case-delete')) {
    const id = parseInt(event.target.dataset.id);
    deleteCase(id);
  }
});

function saveMyCases() {
  localStorage.setItem('myCases', JSON.stringify(myCases));
}

myCases.push(newCase);
saveMyCases();
