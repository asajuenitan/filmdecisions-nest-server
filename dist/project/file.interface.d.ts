export interface IFile {
    fieldname: string;
    string: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: string;
    size: number;
    destination?: string;
    filename?: string;
    path?: string;
}
