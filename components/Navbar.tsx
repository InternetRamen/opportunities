"use client";
import Link from "next/link";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    DocumentData,
} from "firebase/firestore";
import LogoutButton from "./LogoutButton";
import { useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBiYeq3FhHS69uU6cx1dD59MbESb2E7Rgs",
    authDomain: "opportunities-b5dca.firebaseapp.com",
    projectId: "opportunities-b5dca",
    storageBucket: "opportunities-b5dca.appspot.com",
    messagingSenderId: "48795184246",
    appId: "1:48795184246:web:afbaf20734a14aa620c357",
    measurementId: "G-MNHWWVPMYH",
};

export default function Navbar() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore();
    const [name, setName] = useState<string | null>(null)
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(user);
            const dataName = await getName(user.uid)
            setName(dataName);
        } else {
            setName(null);
        }
    });
    const getName = async (id: string) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        if (docSnap.exists()) {
            return docSnap.data().name;
        } else {
            return null;
        }
    }
    return (
        <div className="flex justify-between font-bold">
            <Link href="/">Opportunities</Link>
            <div className="flex gap-24">
                {name && <LogoutButton />}
                {name && <Link href="/create">Add</Link>}
                {name ? (
                    <Link href={"/profile"}>{name}</Link>
                ) : (
                    <Link href={"/login"}>Login</Link>
                )}
            </div>
        </div>
    );
}
