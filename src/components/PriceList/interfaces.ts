export type DataType = {
    date: Date | number;
    count: string;
    type: string;
    product: string;
    price: string;
    id: string;
};

export interface Props {
    onChange: (a: string) => void;
    onRemove: (a: string) => void;
    user?: string | null;
    data: DataType | any,
}