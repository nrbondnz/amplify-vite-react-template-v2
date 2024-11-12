// utils.ts

import { client } from '@shared/utils/client'; // Make sure this path is correct
import { EntityTypes, WithId } from '@shared/types/types'; // Adjust the path as necessary

// Define a more general ClientResponse type assuming it's like the TypeScript Partial type
export type ClientResponse<T> = { data: T[]; nextToken?: string | null };

type ModelListMethod<T> = (options?: never) => Promise<{ data: T[] }>; // Adjusted to match the actual return type closely

/**
 * Returns the list method for the given entity type.
 *
 * @param entityType - The entity type name
 */
export const getListMethod = <T extends WithId>(entityType: EntityTypes): ModelListMethod<T> => {
	const modelKey = entityType as keyof typeof client.models;
	const model = client.models[modelKey];

	if (!model || !model.list) {
		throw new Error(`No list method found for entity type: ${entityType}`);
	}

	return model.list as ModelListMethod<T>;
};