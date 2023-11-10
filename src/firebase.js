import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, addDoc, getDoc, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBj0gn-Qlm1MB1wBhe_EKtHS4zk4iRWkZo",
  authDomain: "ux-sus-web.firebaseapp.com",
  projectId: "ux-sus-web",
  storageBucket: "ux-sus-web.appspot.com",
  messagingSenderId: "925643843649",
  appId: "1:925643843649:web:959186c672df893be9fec0",
  measurementId: "G-02GY434NKH"
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const resultsCollection = collection(db, 'results')

// 新增測試結果
export const createResult = async result => {
  try {
    const docRef = await addDoc(resultsCollection, { ...result, date: new Date() })
    return docRef.id
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

// export const getResultById = async id => {
//   try {
//     const docSnap = await getDoc(doc(db, 'results', id))
//     if (docSnap.exists()) {
//       return docSnap.data()
//     } else {
//       console.log('Document does not exist')
//     }
//   } catch (e) {
//     console.error('Error adding document: ', e)
//   }
// }

// 查詢所有測試結果紀錄
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
