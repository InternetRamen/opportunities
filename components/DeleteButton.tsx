"use client";
import { initializeApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { DocumentData, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
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

export default function DeleteButton({
    id,
    post,
}: {
    id: string;
    post: DocumentData;
}) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth();

    const [user, setUser] = useState<User>();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        }
    });
    const router = useRouter();
    const handleDelete = async () => {
        const answer = confirm("Are you sure you want to delete this post?");
        if (answer) {
            await deleteDoc(doc(db, "posts", id));
            router.push("/");
        }
    };

    return (
        <>
            {user && user.uid === post.author && (
                <button
                    className="text-blue-600 underline"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            )}
        </>
    );
}
