import {body, check, validationResult} from "express-validator";

export const fields = ['name', 'breed', 'description', 'additionalInfo']

export const validationField = {
    checkTypesStringForField (fields: string[]){
        if(fields){
            return fields?.map((f) =>
                body(f).isString().withMessage("The field must be string")
                    .trim()
                    .notEmpty().withMessage("The field was pass empty string")
            )
        } else {return []}
},
    checkTypesNumberForField (fields: string[]){
        return fields.map((f)=> body(f).custom((value: number)=> {
            if(isNaN(value)){
                return true
            } else {
                throw new Error('Age and price must be number')
            }
        }))
    }
}