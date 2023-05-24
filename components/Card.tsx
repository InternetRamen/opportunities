"use client";
import { useRouter } from "next/navigation";
interface CardProps {
    title: string;
    category: string;
    dueDate: string;
    link: string;
    type: string;
    id: string;
}

export default function Card(props: CardProps) {
    const router = useRouter();

    return (
        <div
            className="flex justify-between cursor-pointer"
            onClick={() => router.push(`/post/${props.id}`)}
        >
            <div>
                <a href={`/post/${props.id}`} className="font-medium text-md visited:text-gray-500">{props.title}</a>
                <h2 className="text-sm">
                    {props.category} - {props.type}
                </h2>
                <h3 className="text-xs">Due {props.dueDate}</h3>
            </div>
            <div className="flex flex-col items-end">
                <a
                    href={props.link}
                    target="_blank"
                    className="text-blue-600 visited:text-purple-800 underline"
                >
                    Link to Apply
                </a>
            </div>
        </div>
    );
}
