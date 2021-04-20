
import { useEffect, useState, useCallback } from 'react';
import * as firebase from 'firebase';

import 'firebase/auth'
import 'firebase/firestore'
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "xxxxxx",
  authDomain: "xxxxxxx",
  projectId: "xxxxxxx",
  storageBucket: "xxxxxx",
  messagingSenderId: "xxxxx",
  appId: "xxxxxxxx",
  measurementId: "xxxxxxx"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const useFirebase = () => {
  const [authUser, setAuthUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    const unsubscribe = firebase.auth()
      .onAuthStateChanged((user) => setAuthUser(user))
    return () => {
      unsubscribe()
    };

  }, []);

  const getBanner = (documentPath, onUpdate) => {
    firebase.firestore()
      .collection('Banner')
      .doc(documentPath)
      .onSnapshot(onUpdate);
  }

  const setCollection = (collectionref, docref, obj) => {
    firebase.firestore()
      .collection(collectionref)
      .doc(docref)
      .set(obj);
  }
  const updateBanner = (doc) => {
    firebase.firestore()
      .collection('Banner')
      .doc('Promoções')
      .update(doc);
  }

  const getDataExplorer = (category, limit, onUpdate) => {

    firebase.firestore()
      .collection('Produtos')
      .where("category", "==", category)
      .orderBy('data', 'desc')
      .limit(limit)
      .onSnapshot(onUpdate);

  }
  const getmoreDataExplorer = (category, limit, lastVisible, onUpdate) => {

    firebase.firestore()
      .collection('Produtos')
      .where("category", "==", category)
      .orderBy('data', 'desc')
      .startAfter(lastVisible.data().data)
      .limit(limit)
      .onSnapshot(onUpdate);

  }

  const getMyrequest = (onUpdate) => {

    firebase.firestore()
      .collection('Pedidos')
      .orderBy('data', 'desc')
      .onSnapshot(onUpdate);
  }

  const getDocument = (documentPath, onUpdate) => {
    firebase.firestore()
      .collection('users')
      .doc(documentPath)
      .onSnapshot(onUpdate);
  }

  const getDocumentFrete = (documentPath, onUpdate) => {
    firebase.firestore()
      .collection('Frete')
      .doc(documentPath)
      .onSnapshot(onUpdate);
  }

  const getColletionFrete = (onUpdate) => {
    firebase.firestore()
      .collection('Frete')
      .onSnapshot(onUpdate);
  }

  const saveDocument = (documentPath, document) => {
    firebase.firestore()
      .collection('users')
      .doc(documentPath)
      .update(document);
  }

  const saveDocumentPedidos = (documentPath, document) => {
    firebase.firestore()
      .collection('Pedidos')
      .doc(documentPath)
      .set(document);
  }

  const addProduct = (title, price, data, description, remoteUri, status, category) => {
    firebase.firestore()
      .collection('Produtos')
      .set({
        title: title,
        descricao: description,
        valor: price,
        img: remoteUri,
        status: status,
        category: category,
        data: data
      });
  }

  const editStatus = (collPath, documentPath, status) => {
    firebase.firestore()
      .collection(collPath,)
      .doc(documentPath)
      .update(status);
  }

  //delete item to wallet 
  const deleteItembyId = async (collectionref, id) => {

    firebase.firestore()
      .collection(collectionref)
      .doc(id)
      .delete()
  };

  const login = useCallback((email, password) => firebase.auth()
    .signInWithEmailAndPassword(email, password), []);

  const logout = useCallback(() => firebase.auth().signOut(), [])

  return {
    login,
    authUser,
    logout,
    getDocumentFrete,
    getColletionFrete,
    addProduct,
    getDocument,
    saveDocument,
    deleteItembyId,
    saveDocumentPedidos,
    getMyrequest,
    getDataExplorer,
    getmoreDataExplorer,
    getBanner,
    editStatus,
    updateBanner,
    setCollection
  }
}

export { useFirebase }

export default firebaseConfig;
