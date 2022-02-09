export interface Props {
    close: (a: string | boolean) => void;
    id?: string | null;
    updatedData?: { [key: string]: any; }
};