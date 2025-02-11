import { useState, useEffect } from "react";

type AboutInfo = {
    id: number;
    sprint_num: number;
    team_member1: string;
    team_member2: string;
    team_member3: string;
    team_member4: string;
    team_member5: string;
};

export default function About() {
    const [aboutData, setAboutData] = useState<AboutInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://ec2-13-216-202-113.compute-1.amazonaws.com:4000/about") // Ensure this is the correct API URL
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data: AboutInfo[]) => {
                setAboutData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError("Failed to load about information.");
                setLoading(false);
            });
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <div>
            <h1>About Us</h1>
            {aboutData.length === 0 ? (
                <p>No about information available.</p>
            ) : (
                <ul>
                    {aboutData.map((item) => (
                        <li key={item.id}>
                            <strong>Sprint {item.sprint_num}</strong>: {item.team_member1}, {item.team_member2}, {item.team_member3}, {item.team_member4}, {item.team_member5}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
