const firebaseApp = firebase.initializeApp({
    apiKey: "[YOUR_API_KEY]",
    authDomain: "firestore-d3cdb.firebaseapp.com",
    projectId: "firestore-d3cdb",
    storageBucket: "firestore-d3cdb.appspot.com",
    messagingSenderId: "604506942293",
    appId: "1:604506942293:web:b98954119da375d7159ddc",
    measurementId: "G-0W2YDYD6Q1"
  })

// Initialize Firebase  
const db = firebaseApp.firestore()
db.settings({ timestampInSnapshot: true })

const cafeList = document.querySelector('#cafe-list')
const addCafeForm = document.querySelector('#add-cafe-form')

function renderCafe(doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'X'

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)

    cafeList.appendChild(li)

    cross.addEventListener('click', (e) => {
        e.stopPropagation()
        let id = e.target.parentElement.getAttribute('data-id')
        db.collection('cafes').doc(id).delete()
    })

}

// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     });
// })


// Make Query
// db.collection('cafes').where('city', '==', 'NewYork').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     });
// })

db.collection('cafes').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
            renderCafe(change.doc);
        } else if (change.type === "removed") {
            // Handle removal
            const removedLi = cafeList.querySelector(`[data-id="${change.doc.id}"]`);
            if (removedLi) {
                cafeList.removeChild(removedLi);
            }
        }
    });
});


addCafeForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    db.collection('cafes').add({
        name: addCafeForm.cafe.value,
        city: addCafeForm.city.value
    })
    addCafeForm.cafe.value = ''
    addCafeForm.city.value = ''
})

