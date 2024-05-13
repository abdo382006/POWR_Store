export default function useLocalStorage() {
  function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function get(key) {
    let value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  return { store, get, remove };
}
