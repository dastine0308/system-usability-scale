import { getFirestore, collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore'
import { firebaseApp } from '../../../firebase/config'

const db = getFirestore(firebaseApp)
const resultsCollection = collection(db, 'results')
const projectsCollection = collection(db, 'projects')

// 新增測試結果
export const createResult = async (code, input) => {
  try {
    const docRef = await addDoc(resultsCollection, {
      projectCode: code,
      ...input,
      testDate: new Date(),
    })
    return docRef.id
  } catch (error) {
    throw error
  }
}

// 查詢測試紀錄
export const useLoadResults = async code => {
  try {
    const returnVal = []
    const codeQuery = query(resultsCollection, where('projectCode', '==', code), orderBy('testDate'))
    const querySnapshot = await getDocs(codeQuery)
    querySnapshot.forEach(doc => {
      returnVal.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    return returnVal
  } catch (error) {
    throw error
  }
}

// 查詢專案下拉選項
export const useLoadProjects = async () => {
  try {
    const returnVal = []
    const querySnapshot = await getDocs(projectsCollection)
    querySnapshot.forEach(doc => {
      returnVal.push({
        ...doc.data(),
      })
    })
    return returnVal
  } catch (error) {
    throw error
  }
}
