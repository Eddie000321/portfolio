const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const loadingListeners = new Set();
let activeRequests = 0;

const notifyLoading = () => {
  const isLoading = activeRequests > 0;
  loadingListeners.forEach((listener) => listener(isLoading));
};

export const subscribeToApiLoading = (listener) => {
  loadingListeners.add(listener);
  return () => loadingListeners.delete(listener);
};

const buildHeaders = (token, extraHeaders = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage = data?.error || "Request failed";
    throw new Error(errorMessage);
  }
  return data;
};

export const apiRequest = async (
  path,
  { method = "GET", body, token, headers } = {}
) => {
  activeRequests += 1;
  notifyLoading();
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: buildHeaders(token, headers),
      body: body ? JSON.stringify(body) : undefined,
    });

    return await handleResponse(response);
  } finally {
    activeRequests = Math.max(0, activeRequests - 1);
    notifyLoading();
  }
};

export const apiClient = {
  get: (path, options = {}) => apiRequest(path, { ...options, method: "GET" }),
  post: (path, body, options = {}) =>
    apiRequest(path, { ...options, method: "POST", body }),
  put: (path, body, options = {}) =>
    apiRequest(path, { ...options, method: "PUT", body }),
  patch: (path, body, options = {}) =>
    apiRequest(path, { ...options, method: "PATCH", body }),
  delete: (path, options = {}) =>
    apiRequest(path, { ...options, method: "DELETE" }),
};

export default apiRequest;
