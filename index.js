const apiURL = 'http://localhost:3000/monsters'
const monsterListEl = document.querySelector('#monster-container')
const monsterFormEl = document.querySelector('#monster-form')
const monsterNameEl = document.querySelector('input[name=monster-name]')
const monsterAgeEl = document.querySelector('input[name=monster-age]')
const monsterDescEl = document.querySelector('input[name=monster-description]')
const backButton = document.querySelector('#back')
const nextButton = document.querySelector('#forward')
const monstersObject = {
  allMonsters: [ ],
  startIndex: 0,
  limit: 50
}

function fetchMonsters() {
  fetch(apiURL)
    .then(response => response.json())
    .then(renderMonsters)
}

  function renderMonsters(monsterArray) {
      console.log(monsterArray)
    if(monsterArray) {
    monstersObject['allMonsters'] = monsterArray
  }
    monstersObject['allMonsters'].slice(monstersObject['startIndex'],monstersObject['limit']).forEach(renderSingleMonster)
  }

  function renderSingleMonster(monster) {
    const monsterEl = document.createElement('ul')
    monsterEl.innerHTML = `<h2>${monster.name}</h2> \n <h3>${monster.age}</h3> \n <p>${monster.description} </p>`

    monsterListEl.appendChild(monsterEl)
  }

  monsterFormEl.addEventListener('submit', saveNewMonster)

  function saveNewMonster(e) {
    e.preventDefault()
    console.log(e)
    const name = monsterNameEl.value
    const age = monsterAgeEl.value
    const description = monsterDescEl.value

    renderSingleMonster({
      name: name,
      age: age,
      description: description
    })

    fetch(apiURL, {
   method: 'POST',
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
     name: name,
     age: age,
     description: description
   })
 }).then(console.log)
}

backButton.addEventListener('click', loadPrevPage)
nextButton.addEventListener('click', loadNextPage)

function loadNextPage() {
  monsterListEl.innerHTML = ''
  monstersObject.startIndex += 50
  monstersObject.limit +=50
  console.log(monstersObject.startIndex)
  renderMonsters()
}

function loadPrevPage() {
  monsterListEl.innerHTML = ''
  if (monstersObject.startIndex > 0) {
    monstersObject.startIndex -= 50
    monstersObject.limit -=50
    console.log(monstersObject.startIndex)
    renderMonsters()
  }
}





  fetchMonsters()
