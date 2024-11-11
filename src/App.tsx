//import { auth } from "./../amplify/auth/resource";
import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { Subscription } from "rxjs";
import outputs from "../amplify_outputs.json";
Amplify.configure(outputs);


const client = generateClient<Schema>();

function App() {
    const [locations, setLocations] = useState<Array<Schema["locations"]["type"]>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    if (!loading) {
        fetchLocations()
        setLoading(true);
    }

    async function fetchLocations() {
        try {
            // Ensure the user is authenticated before making requests
            //const user: CognitoUser = await
            // auth.currentAuthenticatedUser();
            //console.log("App user: ", user)
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
    
    useEffect(() => {
      

        fetchLocations();
    }, []);

    useEffect(() => {
        let subscription: Subscription;
        async function setupSubscription() {
            try {
                // Ensure the user is authenticated before setting up the subscription
                //const user: CognitoUser = await
                // Auth.currentAuthenticatedUser();

                subscription = client.models.locations.observeQuery().subscribe({
                    next: (data) => setLocations([...data.items]),
                });
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                }
            }
        }

        setupSubscription();

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

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