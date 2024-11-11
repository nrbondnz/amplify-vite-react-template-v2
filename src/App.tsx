//import { auth } from "../amplify/auth/resource";
import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Subscription } from "rxjs";
import outputs from "../amplify_outputs.json";
import { Schema } from "../amplify/data/resource";

// Configure Amplify
Amplify.configure(outputs);

// Generate client with the defined schema
const client = generateClient<Schema>();

function App() {
    // Define state with appropriate types
    const [locations, setLocations] = useState<Array<Schema["locations"]["type"]>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch locations
    async function fetchLocations() {
        try {
            // Ensure the user is authenticated before making requests
            //await auth.currentAuthenticatedUser(); // Ensure authenticated
            const initialLocations = await client.models.locations.list();
            setLocations(initialLocations.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    }

    // Fetch locations on component mount
    useEffect(() => {
        fetchLocations();
    }, []);

    // Setup subscription
    useEffect(() => {
        let subscription: Subscription;

        async function setupSubscription() {
            try {
                // Ensure the user is authenticated before setting up the subscription
                //await auth.currentAuthenticatedUser(); // Ensure authenticated

                subscription = client.models.locations.observeQuery({}).subscribe({
                    next: (data) => setLocations([...data.items]),
                });
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                }
            }
        }

        setupSubscription();

        // Clean up subscription on component unmount
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    // Create a new location
    function createLocation(): void {
        const locationName: string | null = window.prompt("Location name");
        if (locationName) {
            client.models.locations.create({ entityName: locationName, id: Math.random() * 45 * Math.random() });
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
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