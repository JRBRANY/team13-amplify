import React from "react";

export default function About() {
    const [aboutData, setAboutData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch("http://ec2-13-216-202-113.compute-1.amazonaws.com:4000/about")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load about information");
                }
                return response.json();
            })
            .then(data => {
                setAboutData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
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
