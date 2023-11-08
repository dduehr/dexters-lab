import { Problem } from "../generated/openapi/projects";

export function constraintViolation(field: string, message: string): Problem {
    return {
        title: 'CONSTRAINT',
        status: 400,
        details: {
            [field]: message
        }
    }
} 