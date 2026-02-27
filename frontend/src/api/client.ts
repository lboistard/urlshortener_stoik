const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getApiBaseUrl = () => {
  return import.meta.env.VITE_BACKEND_URL
}

const apiFetch = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export {
  getApiBaseUrl,
  apiFetch,
}
