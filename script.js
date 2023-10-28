const firebaseApp = firebase.initializeApp({
    apiKey: "[YOUR_API_KEY]",
    authDomain: "fir-1dab4.firebaseapp.com",
    projectId: "fir-1dab4",
    storageBucket: "fir-1dab4.appspot.com",
    messagingSenderId: "368072289827",
    appId: "1:368072289827:web:5f9d695f033d966fa6cb96"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const register = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    auth.createUserWithEmailAndPassword(email, password)
        .then((response) => {
            console.log(response.user)
        })
        .catch((error) => {
            alert(error.message)
            console.log(error.code)
            console.log(error.message)
        })
        saveData()
}

const signIn = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
        console.log(response.user)
    })
    .catch((error) => {
        alert(error.message)
        console.log(error.code)
        console.log(error.message)
    })
}

const saveData = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    db.collection('users')
    .add({
        email: email,
        password: password
    })
    .then((docRef) => {
        console.log("Document Added with ID: ", docRef.id)
    })
    .catch((error) => {
        console.error("Error: ", error)
    })
}

const readData = () => {
    db.collection('users')
    .get()
    .then((data) => {
        console.log(data.docs.map((item) => {
            return {...item.data(), id: item.id}
        }))
    })
}

const updateData = () => {
    db.collection('users').doc('nXeTzqpGqZhULocp7ucw')
    .update({
        email: "220200143000@gecrajkot.ac.in",
        password: "dks@1213"
    })
    .then( () => {
        alert('Data Update')
    })
}

const deleteData = () => {
    db.collection('users').doc('nXeTzqpGqZhULocp7ucw').delete()
    .then(() => {
        alert('Data Deleted')
    })
}