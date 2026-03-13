export const validateFields = (body , fields) => {
    return fields.filter(field => {
        const value = body[field]
    return (
        value ===undefined || 
        value === null ||
        (typeof value ==="string"  && value.trim()==="")
    )
    }
    )
}