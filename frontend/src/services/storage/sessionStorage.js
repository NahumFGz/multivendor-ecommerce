/**
 * Guarda un item en sessionStorage
 * @param {string} key - La clave bajo la cual se guarda el item.
 * @param {any} value - El valor a guardar. Se convierte a JSON.
 */
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value)
    window.sessionStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error al guardar en sessionStorage: ${error}`)
  }
}

/**
   * Obtiene un item de sessionStorage
   * @param {string} key - La clave del item a obtener.
   * @returns {any} - El valor almacenado o null si no existe.
   */
export const getItem = (key) => {
  try {
    const serializedValue = window.sessionStorage.getItem(key)
    return serializedValue ? JSON.parse(serializedValue) : null
  } catch (error) {
    console.error(`Error al obtener de sessionStorage: ${error}`)
    return null
  }
}

/**
   * Elimina un item de sessionStorage
   * @param {string} key - La clave del item a eliminar.
   */
export const removeItem = (key) => {
  try {
    window.sessionStorage.removeItem(key)
  } catch (error) {
    console.error(`Error al eliminar de sessionStorage: ${error}`)
  }
}

/**
   * Limpia todos los items de sessionStorage
   */
export const clear = () => {
  try {
    window.sessionStorage.clear()
  } catch (error) {
    console.error(`Error al limpiar sessionStorage: ${error}`)
  }
}
