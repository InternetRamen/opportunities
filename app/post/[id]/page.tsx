import Navbar from "@/components/Navbar";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    DocumentData,
    deleteDoc,
} from "firebase/firestore";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import DeleteButton from "@/components/DeleteButton";

const firebaseConfig = {
    apiKey: "AIzaSyBiYeq3FhHS69uU6cx1dD59MbESb2E7Rgs",
    authDomain: "opportunities-b5dca.firebaseapp.com",
    projectId: "opportunities-b5dca",
    storageBucket: "opportunities-b5dca.appspot.com",
    messagingSenderId: "48795184246",
    appId: "1:48795184246:web:afbaf20734a14aa620c357",
    measurementId: "G-MNHWWVPMYH",
};

export default async function Page({ params }: { params: { id: string } }) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore();
    const data = await getDoc(doc(db, "posts", params.id));
    const post = data.data();
    if (!post)
        return {
            notFound: true,
        };
    const author = await getDoc(doc(db, "users", post.author));
    const authorData = author.data();
    console.log("post", "authorData")
    return (
        <main className="w-11/12 max-w-8xl mx-auto my-12">
            <Navbar />
            <div className="my-12">
                <h1 className="font-medium">{post.title}</h1>
                <p>{post.category}</p>
                <p>{post.type}</p>
                <p>Due {post.dueDate}</p>
                <p>Posted by {authorData ? authorData.name : "Anonymous"}</p>
                <a
                    href={post.link}
                    target="_blank"
                    className="text-blue-600 visited:text-purple-800 underline"
                >
                    Link to Apply
                </a>

                <div className="mt-4 whitespace-pre-wrap">
                    {post.description}
                </div>
            </div>
            <div>
                <DeleteButton id={params.id} post={post} />
            </div>
        </main>
    );
}
