/**
 * 存储 localStorage
 * @param name
 * @param content
 */
const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取 localStorage
 * @param name
 * @returns {string}
 */
const getStorage = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除 localStorage
 * @param name
 */
const removeStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

export { setStorage, getStorage, removeStorage };
