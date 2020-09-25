let globalUsers = [];
let globalFilteredUser = [];
let globalStatisticMale = null;
let globalStatisticFemale = null;
let globalStatisticSumAges = null;
let globalStatisticAverageAges = null;

async function start() {
  await fetchUsers();
  hideSpinner();
  render();

  configFilter();
}

async function fetchUsers() {
  const resource = await fetch('http://localhost:3001/users');
  const json = await resource.json();

  globalUsers = json.map(({ name, picture, dob, gender }) => {
    return {
      userName: `${name.first} ${name.last}`,
      userPicture: picture.large,
      userAge: dob.age,
      userGender: gender,
    };
  });

  console.log(globalUsers);
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');

  // A class hide faz parte do Materialize
  spinner.classList.add('hide');
}

function configFilter() {
  const buttonFilter = document.querySelector('#buttonFilter');
  const inputFilter = document.querySelector('#inputFilter');

  inputFilter.addEventListener('keyup', handleFilterKeyUp);
  buttonFilter.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  const inputFilter = document.querySelector('#inputFilter');
  const filterValue = inputFilter.value.toLowerCase().trim();

  globalFilteredUser = globalUsers.filter((item) => {
    return item.userName.toLowerCase().includes(filterValue);
  });

  if (globalFilteredUser.length > 0) {
    globalFilteredUser.sort((a, b) => a.userName.localeCompare(b.userName));

    globalStatisticMale = globalFilteredUser.filter((item) => {
      return item.userGender.toLowerCase() === 'male';
    }).length;

    globalStatisticFemale = globalFilteredUser.filter((item) => {
      return item.userGender.toLowerCase() === 'female';
    }).length;

    globalStatisticSumAges = globalFilteredUser.reduce(function (
      accumulator,
      currentValue
    ) {
      return accumulator + currentValue.userAge;
    },
    0);

    globalStatisticAverageAges =
      globalStatisticSumAges / globalFilteredUser.length;
  }

  render();
}

function handleFilterKeyUp({ key }) {
  //const { key } = event;
  const buttonFilter = document.querySelector('#buttonFilter');

  if (key !== 'Enter') {
    buttonFilter.disabled = false;
    return;
  }

  handleButtonClick();
}

function render() {
  console.log(globalFilteredUser);

  const divUsersFund = document.querySelector('#usersFund');
  const divStatistic = document.querySelector('#statistic');

  if (globalFilteredUser.length === 0) {
    divUsersFund.innerHTML = '<span>Nenhum usuário filtrado</span>';
    divStatistic.innerHTML = '<span>Nada a ser exibido</span>';
    return;
  }

  divUsersFund.innerHTML = `
    <div class='row'>
      <span>${globalFilteredUser.length} usuário(s) encontrado(s)</span>
      ${globalFilteredUser
        .map(({ userName, userPicture, userAge }) => {
          return `
            <div class='col s12 m12 l12'>
              <div class='flex-row bordered'>
                <img class='avatar' src='${userPicture}' alt='${userName}' />
                <div class='flex-row'>
                  <span>${userName} , ${userAge} anos</span>
                </div>
              </div>
            </div>        
        `;
        })
        .join('')}
    </div>  
  `;

  divStatistic.innerHTML = `
  <div class='flex-column'>
    <span>Estatísticas</span>
    <span>Sexo masculino: ${globalStatisticMale}</span>
    <span>Sexo feminino: ${globalStatisticFemale}</span>
    <span>Soma das idades: ${globalStatisticSumAges}</span>
    <span>Média das idades: ${globalStatisticAverageAges.toFixed(2)}</span>
  </div> `;
}

start();
