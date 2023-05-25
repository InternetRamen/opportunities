"use client";
import CreateForm from "@/components/Form";
import Navbar from "@/components/Navbar";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    DocumentData,
    addDoc,
    collection,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBiYeq3FhHS69uU6cx1dD59MbESb2E7Rgs",
    authDomain: "opportunities-b5dca.firebaseapp.com",
    projectId: "opportunities-b5dca",
    storageBucket: "opportunities-b5dca.appspot.com",
    messagingSenderId: "48795184246",
    appId: "1:48795184246:web:afbaf20734a14aa620c357",
    measurementId: "G-MNHWWVPMYH",
};

export default async function Create() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, []);

    return (
        <main className="w-11/12 max-w-8xl mx-auto my-12">
            <Navbar />
            <div className="mt-12">
                <CreateForm/>
            </div>
        </main>
    );
}
