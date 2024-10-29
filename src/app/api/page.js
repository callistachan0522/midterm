"use client"
import Image from "next/image";
import {useState} from 'react';


export default function Page() {
    const DATA_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5";
    const [data, setData] = useState(null);

    async function fetchData() {
        try {
            const response = await fetch(DATA_URL);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setData(data);
    }
        catch(error) {
            console.log(response.error)
        }
    }

    const DisplayMedia = () => {
        if(data) {
       let mediaList = [];
       data.forEach((medium, index) => {
        let formattedMedia = medium.media_type === 'image' ? <img src={medium.url} /> : (
            <video controls width="250">
                <source src={medium.url} type="video/webm" />
            </video>
        )
        mediaList.push(
            <li key={index}>
                {formattedMedia}
                <h3>{medium.title}</h3>
                {medium.explanation}
                </li>
        );
       });
            return (
                <div className="border-4 border-white p-4 mb-4">
                <ul>
                    {mediaList}
                </ul>
                </div>
            )
        } else {
            return (
                <div className="border-4 border-white p-4 mb-4">
                <ul>
                    hello
                </ul>
                </div>
            )
        }
    }

    return (
        <div className="p-4 bg-purple-300">
            <header className="border-4 border-white p-4 mb-4">
                <h1>Welcome to my product page</h1>
                <button className="border-neutral-200 bg-white px-6" onClick={fetchData}>Fetch Products</button>
            </header>
            <DisplayMedia />
        </div>
    );
}
