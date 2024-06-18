

export interface FormField {
    label: string
    name: string
    type: "text" | "number" | "boolean" | "date"
    system: string
    placeholder: string
    hint: string
}
export interface FormGroup {
    name: string;
    description: string;
    system?: string;
    fields: FormField[]
}

export interface Form {
    groups: FormGroup[]
    system: string
}


export function getDefaultData(form: Form): object []{
    return form.groups.map((group) => Object.fromEntries(group.fields.map(f => [f.name, ""])))
}

