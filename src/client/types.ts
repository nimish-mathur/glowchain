export type FieldValue = string | { value: string; display_value: string }

export interface IncidentRecord {
    sys_id: FieldValue
    number: FieldValue
    short_description: FieldValue
    description?: FieldValue
    state: FieldValue
    impact: FieldValue
    opened_at: FieldValue
}

export interface IncidentFormData {
    short_description: string
    description: string
    state: string
    impact: string
}

export function displayValue(field: FieldValue): string {
    return typeof field === 'object' ? field.display_value : field
}

export function rawValue(field: FieldValue): string {
    return typeof field === 'object' ? field.value : field
}
