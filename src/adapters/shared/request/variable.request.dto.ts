type Variables<T> = {
    variable: string;
    value: T;
};

export type VariablesRequestDto<T> = {
    variables: Variables<T>[];
};
