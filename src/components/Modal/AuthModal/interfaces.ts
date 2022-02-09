export interface Props {
    login: (a: any) => void
    close: (a: boolean) => void;
};

export interface Form {
    email: string | null;
    password: string | null;
}