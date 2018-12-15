const monsterContainer = document.getElementById('monster-container')
const monstersURL = `http://localhost:3000/monsters/`
const monstersLimit = `?_limit=20`
let page = 1

const nextMonsters = document.getElementById('forward')
const previousMonsters = document.getElementById('back')

const createMonster = document.getElementById('create-monster')
const monsterForm = document.createElement('form')
const monsterName = document.createElement('input')
const monsterAge = document.createElement('input')
const monsterBio = document.createElement('input')
const monsterSubmit = document.createElement('button')

monsterForm.id = 'monster-form'
monsterName.id = 'name'
monsterName.type = 'text'
monsterName.placeholder = 'Name of Monster'

monsterAge.id = 'age'
monsterAge.type = 'text'
monsterAge.placeholder = 'Age of Monster'

monsterBio.id = 'bio'
monsterBio.type = 'text'
monsterBio.placeholder = 'Describe Monster'

monsterSubmit.id = 'create-monster-btn'
monsterSubmit.innerText = 'Create Monster'

monsterForm.append(monsterName, monsterAge, monsterBio, monsterSubmit)
createMonster.appendChild(monsterForm)

function addNewMonster(event) {
  event.preventDefault()
  let name = monsterName.value
  const age = monsterAge.value
  const bio = monsterBio.value

  fetch(`${monstersURL}`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      age: age,
      bio: bio
    })
  }).then(console.log())

}

function fetchMonsters() {
  fetch(`${monstersURL}${monstersLimit}&_page=${page}`)
  .then(response => response.json())
  .then(monsters => renderMonsters(monsters))
}

function renderMonsters(monsterArray) {
  monsterArray.forEach((monster) => {
     let divMonster = document.createElement('div')
     divMonster.setAttribute('class', 'monster-item')
     divMonster.innerHTML = `
      <h2> Name: ${monster.name}</h2>
      <p> Age: ${monster.age}</p>
      <p> Bio: ${monster.description}</p>
     `
     monsterContainer.appendChild(divMonster)
  })
}

function renderNextMonsters() {
  let divMonster = document.querySelectorAll('.monster-item')
  divMonster.forEach((monster) => {
    monsterContainer.removeChild(monster)
  })
  page +=1
  fetchMonsters()
}

function renderPreviousMonsters() {
  if (page > 1){
    let divMonster = document.querySelectorAll('.monster-item')
    divMonster.forEach((monster) => {
      monsterContainer.removeChild(monster)
    })
    page -=1
    console.log(page);
    fetchMonsters()
  }
}

nextMonsters.addEventListener('click', renderNextMonsters)
previousMonsters.addEventListener('click', renderPreviousMonsters)
monsterSubmit.addEventListener('click', addNewMonster)

fetchMonsters()
