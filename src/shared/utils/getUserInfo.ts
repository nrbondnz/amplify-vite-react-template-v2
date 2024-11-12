import { defaultUser, defaultUserInfo, IUser } from "@shared/types/types";
//import { UserInfo } from "@utils/transformToUserInfo";


/**
 * Retrieves user information from the session.
 * @param req The HTTP request object
 * @returns {UserInfo | null} User information or null if not found
 */
export const getUserInfo = (req: Request) => {
	//if (req) {
	//	return req.user! as UserInfo;
	//}
	
	console.log("req: " + req.headers.get("user-info") );
	return defaultUserInfo;
};

/**
 * Converts UserInfo to IUser.
 * @param req The HTTP request object
 * @returns {IUser} The user information as IUser
 */
export const getUserFromUserInfo = (req: Request): IUser => {
	const userInfo = getUserInfo(req);
	const fred = defaultUser;
	fred.id = +userInfo.id;
	fred.entityName = userInfo.entityName!;
	fred.roles = userInfo.roles!;
	// TODO handle roles starts here!
	if (!userInfo) {
		// Handle the case where userInfo is not found
		return {...fred};
	}

	return {
		...defaultUser  // Ensure you start from a default stat
	};
};