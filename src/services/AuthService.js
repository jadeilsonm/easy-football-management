import { default as router } from "@/router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

export class AuthService {
  constructor() {
    this.auth = getAuth();
  }

  async login(email, password) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password)
      if (user.user.uid) router.push('/home');
    } catch (error) {
      console.error("Error signing in: ", error);
      alert('Credentials error');
    }

  }

  async logout() {
    await signOut(this.auth);
  }

  async loginWhithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    await signInWithPopup(this.auth, provider);
  }

  async register(email, password) {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  }

  async getUser() {
    await onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('User logged in', user);
        return user;
      } else {
        router.push('/login');
      }
    });
  }
}
