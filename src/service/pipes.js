

export function datePipe(dateStr) {
    let now = new Date(dateStr)
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getMonth()}/${now.getDay()}/${now.getFullYear()}`
}