import Image from "next/image";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    DocumentData,
    getDocs,
    collection,
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

require("dotenv").config();
import Navbar from "@/components/Navbar";
import { initializeApp } from "firebase/app";
import Card from "@/components/Card";


interface CardProps {
    title: string;
    category: string;
    dueDate: string;
    link: string;
    upvotes: number;
    type: string;
    id: string;
}

export default async function Home() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();

    const postSnap = await getDocs(collection(db, "posts"));
    const posts = postSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    } as CardProps) );
    return (
        <main className="w-11/12 max-w-8xl mx-auto my-12">
            <Navbar />
            <div className="mt-12 flex flex-col gap-4">
                {posts.map((post) => (
                    <Card
                        key={post.title}
                        title={post.title}
                        category={post.category}
                        dueDate={post.dueDate}
                        link={post.link}
                        type={post.type}
                        id={post.id}
                    />
                ))}
            </div>
        </main>
    );
}
