"use client";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    DocumentData,
} from "firebase/firestore";

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
    const [user, setUser] = useState<DocumentData | null>(null);
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const toGet = await getDoc(doc(db, "users", user.uid));

            setUser(toGet.data() || null);
        } else {
            setUser(null);
        }
    });

    return (
        <div className="flex justify-between font-bold">
            <Link href="/">Opportunities</Link>
            <div className="flex gap-24">
                {user && <Link href="/create">Add</Link>}
                <Link href={user ? "/profile" : "/login"}>
                    {user ? user.name : "Login"}
                </Link>
            </div>
        </div>
    );
}
