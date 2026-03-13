export const validateFields = (body , fields) => {
    return fields.filter(field => !body[field])
}