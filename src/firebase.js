import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore'

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
const projectsCollection = collection(db, 'projects')

// 新增測試結果
export const createResult = async (code, input) => {
  try {
    const docRef = await addDoc(resultsCollection, { 
      projectCode: code,
      ...input, 
      testDate: new Date() 
    })
    console.log(docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

// 查詢測試紀錄
export const useLoadResults = async (code) => {
  console.log(code);
  try {
    const returnVal = []
    const codeQuery = query(resultsCollection, where('projectCode', '==', code));
    // const codeQuery = query(resultsCollection, where('projectCode', '==', code), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(codeQuery);
    querySnapshot.forEach((doc) => {
      returnVal.push({
        id: doc.id,
        ...doc.data(),
      })
    });
    return returnVal
  } catch(e) {
    console.error("Error: ", e);
  }
}

// 查詢專案下拉選項
export const useLoadProjects = async () => {
  try {
    const returnVal = []
    const querySnapshot = await getDocs(projectsCollection);
    querySnapshot.forEach((doc) => {
      returnVal.push({
        ...doc.data(),
      })
    });
    return returnVal
  } catch(e) {
    console.error("Error: ", e);
  }
}
