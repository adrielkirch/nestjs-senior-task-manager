export type VariablesRequestDto = {
    variables: Variables[];
};

type Variables = {
    variable: string;
    value: any;
};