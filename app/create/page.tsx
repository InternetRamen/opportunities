"use client";
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
    const db = getFirestore();
    const ref = useRef<HTMLParagraphElement>(null);
    const auth = getAuth();
    const router = useRouter();
    const user = auth.currentUser;
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        if (!user) {
            router.push("/login");
        }
        data.author = user!.uid;
        await addDoc(collection(db, "posts"), data);
        if (ref.current) {
            ref.current.textContent = "Successfully Added!";
        }
        return Promise.resolve();
    };
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, []);

    return (
        <main className="w-11/12 max-w-8xl mx-auto my-12">
            <Navbar />
            <div className="mt-12">
                <form
                    className="flex flex-col gap-2"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="field flex gap-2 flex-col">
                        <label>Title</label>
                        <input
                            className="border-2 border-black p-1 focus:outline-none"
                            type="text"
                            placeholder="e.g. Johns Hopkins Aspire Program"
                            name="title"
                            required
                        />
                    </div>
                    <div className="flex flex-wrap gap-8">
                        <div className="field flex gap-2 flex-col min-w-xs flex-grow">
                            <label>Category</label>
                            <input
                                className="border-2 border-black p-1 focus:outline-none"
                                type="text"
                                placeholder="e.g. Business, Computer Science"
                                name="category"
                                required
                            />
                        </div>
                        <div className="field flex gap-2 flex-col min-w-xs flex-grow">
                            <label>Type</label>
                            <input
                                className="border-2 border-black p-1 focus:outline-none"
                                type="text"
                                placeholder="e.g. Internship, Scholarship, Leadership Opportunity"
                                name="type"
                                required
                            />
                        </div>
                        <div className="field flex gap-2 flex-col min-w-xs flex-grow">
                            <label>Due Date</label>
                            <input
                                className="border-2 border-black p-1 focus:outline-none"
                                type="text"
                                placeholder="e.g. June 2nd, 2023"
                                name="dueDate"
                                required
                            />
                        </div>
                    </div>
                    <div className="field flex gap-2 flex-col">
                        <label>Link</label>
                        <input
                            className="border-2 border-black p-1 focus:outline-none"
                            type="text"
                            name="link"
                            required
                        />
                    </div>
                    <div className="field flex gap-2 flex-col">
                        <label>Description</label>
                        <textarea
                            className="border-2 border-black p-1 focus:outline-none"
                            name="description"
                            required
                        />
                    </div>
                    <input
                        type="submit"
                        className="border-2 border-black p-2 w-fit cursor-pointer"
                    />
                </form>
                <p ref={ref}></p>
            </div>
        </main>
    );
}
