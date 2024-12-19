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

  logout() {
    signOut(this.auth);
  }

  loginWhithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    signInWithPopup(this.auth, provider)
    .then((result) => {
      GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      if (user.uid) router.push('/home');
    }).catch((error) => {
      alert('Credentials error');
      console.log(error);
    });
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
        return user;
      } else {
        router.push('/login');
      }
    });
  }
}
