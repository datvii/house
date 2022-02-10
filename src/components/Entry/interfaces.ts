export interface Props {
    data: Record<string, any> | null;
    isEdit: boolean;
    user: string | null;
    onCreate: (a: boolean) => void
}