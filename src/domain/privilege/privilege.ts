export class Privileges {
    read: boolean;
    write: boolean;
    delete: boolean;

    constructor(read: boolean, write: boolean, remove: boolean) {
        this.read = read;
        this.write = write;
        this.delete = remove;
    }
}
