"use client";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import randomAdjectives from "../../public/randomAdjectives.json";
import randomAnimals from "../../public/randomAnimals.json";
const firebaseConfig = {
    apiKey: "AIzaSyBiYeq3FhHS69uU6cx1dD59MbESb2E7Rgs",
    authDomain: "opportunities-b5dca.firebaseapp.com",
    projectId: "opportunities-b5dca",
    storageBucket: "opportunities-b5dca.appspot.com",
    messagingSenderId: "48795184246",
    appId: "1:48795184246:web:afbaf20734a14aa620c357",
    measurementId: "G-MNHWWVPMYH",
};

export default function Login() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    const generateName = () => {
        const randomAnimal =
            randomAnimals[Math.floor(Math.random() * randomAnimals.length)];
        const randomAdjective =
            randomAdjectives[
                Math.floor(Math.random() * randomAdjectives.length)
            ];
        return `${randomAdjective} ${randomAnimal}`
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
    };

    const handleGoogleClick = () => {
        signInWithPopup(auth, provider).then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential === null) return;
            const user = result.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: generateName(),
                    id: user.uid,
                    posts: [],
                });
            }
            if (user) router.push("/");
        });
    };

    return (
        <main className="w-11/12 max-w-8xl mx-auto my-12">
            <h1 onClick={handleGoogleClick} className="cursor-pointer">
                Sign up with Google
            </h1>
        </main>
    );
}
