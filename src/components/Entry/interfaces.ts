export interface Props {
    data: Record<string, any> | null;
    isEdit: boolean;
    onCreate: (a: boolean) => void
}