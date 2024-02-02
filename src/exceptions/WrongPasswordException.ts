export default class WrongPasswordException extends Error {

    constructor() {
        super('Wrong password');
    }

}