"use client"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

const firebaseConfig = {
    apiKey: "AIzaSyBiYeq3FhHS69uU6cx1dD59MbESb2E7Rgs",
    authDomain: "opportunities-b5dca.firebaseapp.com",
    projectId: "opportunities-b5dca",
    storageBucket: "opportunities-b5dca.appspot.com",
    messagingSenderId: "48795184246",
    appId: "1:48795184246:web:afbaf20734a14aa620c357",
    measurementId: "G-MNHWWVPMYH",
};

export default function LogoutButton() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const router = useRouter();
    const handleLogout = () => {
        auth.signOut();
        router.push("/");
    };

    return <button onClick={handleLogout}>Log out</button>;
}
