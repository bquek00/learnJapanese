import Link from "next/link";

export default function Box({title, description, link}) {

    return (
       <Link href={link} className="h-32 w-72 hover:bg-black/[.3] rounded-2xl p-2 text-white">

        <div className="flex">
        <h1 className="text-2xl font-bold mr-4">{title}</h1>
        <span className="">
              -&gt;
        </span>
        </div>

        <p className="font-bold">{description}</p>
       </Link>
	);
}