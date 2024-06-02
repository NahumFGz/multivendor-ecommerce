/**
 * Guarda un item en localStorage
 * @param {string} key - La clave bajo la cual se guarda el item.
 * @param {any} value - El valor a guardar. Se convierte a JSON.
 */
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value)
    window.localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error al guardar en localStorage: ${error}`)
  }
}

/**
   * Obtiene un item de localStorage
   * @param {string} key - La clave del item a obtener.
   * @returns {any} - El valor almacenado o null si no existe.
   */
export const getItem = (key) => {
  try {
    const serializedValue = window.localStorage.getItem(key)
    return serializedValue ? JSON.parse(serializedValue) : null
  } catch (error) {
    console.error(`Error al obtener de localStorage: ${error}`)
    return null
  }
}

/**
   * Elimina un item de localStorage
   * @param {string} key - La clave del item a eliminar.
   */
export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error al eliminar de localStorage: ${error}`)
  }
}

/**
   * Limpia todos los items de localStorage
   */
export const clear = () => {
  try {
    window.localStorage.clear()
  } catch (error) {
    console.error(`Error al limpiar localStorage: ${error}`)
  }
}
