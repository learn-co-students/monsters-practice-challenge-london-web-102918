const monsterContainer = document.querySelector('#monster-container')
const monsterFormContainer = document.querySelector('#create-monster')
const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')
let page = 1

function fetchMonsters () {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(json => showMonsters(json))
}

function showSingleMonster (monster) {
  let monsterDiv = document.createElement('div')
  monsterDiv.innerHTML = `<br><strong>Name:</strong> ${monster['name']} <strong>Age:</strong> ${monster.age}<br><strong>Description:</strong> ${monster.description}`
  monsterContainer.append(monsterDiv)
}

function showMonsters (data) {
  for (const monster of data) {
    showSingleMonster(monster)
    console.log(monster)
  }
}

(function showForm () {
  let monsterForm = document.createElement('form')
  monsterForm.setAttribute('id', 'monster-form')
  monsterForm.innerHTML = `
    First name: <input type="text" id="monster-name" placeholder="Name your monster!">
    Age: <input type="text" id="monster-age" placeholder="Add it's age!">
    Description: <input type="text" id="monster-description" placeholder="Describe it!">
    <input type="submit" id="submit" value="Add Monster">`.trim()
  monsterFormContainer.append(monsterForm)
})()

function saveNewMonster (event) {
  event.preventDefault()
  // debugger
  const name = document.querySelector('#monster-name').value
  const age = document.querySelector('#monster-age').value
  const description = document.querySelector('#monster-description').value
  showSingleMonster({
    name: name,
    age: age,
    description: description
  })
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    })
  }).then(console.log)
}

function previousMonsters () {
  if (page > 1) {
    while (monsterContainer.firstChild) {
      monsterContainer.removeChild(monsterContainer.firstChild)
    }
    page -= 1
    fetchMonsters()
  }
}

function nextMonsters () {
  while (monsterContainer.firstChild) {
    monsterContainer.removeChild(monsterContainer.firstChild)
  }
  page += 1
  fetchMonsters()
}

monsterFormContainer.addEventListener('submit', saveNewMonster)
backButton.addEventListener('click', previousMonsters)
forwardButton.addEventListener('click', nextMonsters)

fetchMonsters()
