"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationField = exports.fields = void 0;
const express_validator_1 = require("express-validator");
exports.fields = ['name', 'breed', 'description', 'additionalInfo'];
exports.validationField = {
    checkTypesStringForField(fields) {
        if (fields) {
            return fields === null || fields === void 0 ? void 0 : fields.map((f) => (0, express_validator_1.body)(f).isString().withMessage("The field must be string")
                .trim()
                .notEmpty().withMessage("The field was pass empty string"));
        }
        else {
            return [];
        }
    },
    checkTypesNumberForField(fields) {
        return fields.map((f) => (0, express_validator_1.body)(f).custom((value) => {
            if (isNaN(value)) {
                return true;
            }
            else {
                throw new Error('This field must be number');
            }
        }));
    }
};
