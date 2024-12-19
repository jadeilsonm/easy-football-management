import { db } from "@/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
export class DAOService {
  constructor(path) {
    if (!path) {
      throw new Error("Path is required");
    }
    this.collection = collection(db, path);
  }

  async create(data) {
    try {
      const docRef = await addDoc(this.collection, data);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async update(id, data) {
    try {
      const docRef = doc(this.collection, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  async delete(id) {
    try {
      const docRef = doc(this.collection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  async getAll() {
    try {
      const querySnapshot = await getDocs(this.collection);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

  async getById(id) {
    try {
      const docRef = doc(this.collection, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  }

  async getByField(field, value) {
    try {
      const q = query(this.collection, where(field, "==", value));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

  async search(fields) {
    try {
      console.log(fields)
      let q;
      fields.forEach((field) => {
        q = query(
          this.collection,
          where(field.field, field.operator, field.value)
        );
        console.log(q);
      });
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

  async getByIds(ids) {
    let idChunks;
    if (ids.length >= 10) {

      const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
          chunks.push(array.slice(i, i + size));
        }
        return chunks;
      };

      idChunks = chunkArray(ids, 10);
    } else {
      idChunks = [ids];
    }

    const allDocs = [];

    for (const chunk of idChunks) {
      const q = query(
        this.collection,
        where("__name__", "in", chunk)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allDocs.push({ id: doc.id, ...doc.data() });
      });
    }

    return allDocs;
  }
}
