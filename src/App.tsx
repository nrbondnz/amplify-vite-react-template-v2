import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
    const [locations, setLocations] = useState<Array<Schema["locations"]["type"]>>([]);

    // Fetch locations on component mount
    useEffect(() => {
        async function fetchLocations() {
            try {
                const initialLocations = await client.models.locations.list();
                setLocations(initialLocations.data); // Correctly setting the locations state
            } catch (error) {
                console.error("Error fetching locations: ", error);
            }
        }

        fetchLocations();
    }, []);

    // Setup subscription
    useEffect(() => {
        const subscription = client.models.locations.observeQuery().subscribe({
            next: (data) => setLocations([...data.items]),
        });

        return () => subscription.unsubscribe();
    }, []);

    function createLocation() {
        const locationName = window.prompt("Location name");
        if (locationName) {
            client.models.locations.create({ entityName: locationName, id: Math.random() * 45 * Math.random() });
        }
    }

    return (
        <main>
            <h1>My Locations</h1>
            <button onClick={createLocation}>+ new</button>
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>{location.entityName}</li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new location.
                <br />
                <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                    Review the next step of this tutorial.
                </a>
            </div>
        </main>
    );
}

export default App;