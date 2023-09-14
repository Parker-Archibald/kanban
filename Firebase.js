import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD9ZiSjorXn6G_U7KGQFZaSMtqXuBTaZ38",
    authDomain: "kanban-8b2c6.firebaseapp.com",
    projectId: "kanban-8b2c6",
    storageBucket: "kanban-8b2c6.appspot.com",
    messagingSenderId: "765622623729",
    appId: "1:765622623729:web:840ddcdc28947c5538b850",
    measurementId: "G-8F603443MB"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};