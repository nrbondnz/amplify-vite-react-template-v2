import { useEntityData } from "store-temp-of-files/useEntityData";
import { EntityTypes, ILocation } from "@shared/types/types";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

function App() {
    const [locations, setLocations] = useState<Array<Schema["locations"]["type"]>>([]);
    /*const {entities} = useEntityData<ILocation>(EntityTypes.Location);
    console.log("Entities: ", entities)*/
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
    }, [locations]);

/*    // Setup subscription
    useEffect(() => {
        const subscription = client.models.locations.observeQuery().subscribe({
            next: ({ items }) => setLocations(items),
            error: (error) => console.error("Subscription error: ", error),
        });

        return () => subscription.unsubscribe();
    }, []);*/

    function createLocation() {
        const locationName = window.prompt("Location name");
        console.log("App location entered - not working yet", locationName);
       /* if (locationName) {
            client.models.locations.create({ id: 456 })
                .then(() => console.log("Location created"))
                .catch((error) => console.error("Error creating location: ", error));
        }*/
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