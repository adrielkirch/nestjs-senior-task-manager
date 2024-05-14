export class Variables<T> {
    variable: string;
    value: T;

    constructor(variable: string, value: T) {
        this.variable = variable;
        this.value = value;
    }
}


export type VariablesRequestDto<T> = {
    variables: Variables<T>[];
};
