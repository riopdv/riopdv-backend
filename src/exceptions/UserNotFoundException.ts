export default class UserNotFoundException extends Error {

    constructor(message: string) {
        super(message);
    }

}