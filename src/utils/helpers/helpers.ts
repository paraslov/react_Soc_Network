export const updateObjInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps }
        }
        return u;
    })
}