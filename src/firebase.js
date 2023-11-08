import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, addDoc, getDoc, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDgAPT7g2IXlAgYw6TR8DHPBcoyKqMNo8o',
  authDomain: 'system-usability-scale.firebaseapp.com',
  projectId: 'system-usability-scale',
  storageBucket: 'system-usability-scale.appspot.com',
  messagingSenderId: '748075587206',
  appId: '1:748075587206:web:610397deb69e3ab889a307',
  measurementId: 'G-34MHGKLS7J',
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const resultsCollection = collection(db, 'results')

export const createResult = async result => {
  try {
    const docRef = await addDoc(resultsCollection, { ...result })
    return docRef.id
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getResultById = async id => {
  try {
    const docSnap = await getDoc(doc(db, 'results', id))
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log('Document does not exist')
    }
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const useLoadResults = async () => {
  const results = []
  const querySnapshot = await getDocs(resultsCollection)
  querySnapshot.forEach(doc => {
    results.push({
      id: doc.id,
      ...doc.data(),
    })
  })
  return results
}
