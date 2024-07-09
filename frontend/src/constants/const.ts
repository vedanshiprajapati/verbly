// export const BACKEND_URL = `https://verbly.vedanshi3012p.workers.dev/api/v1/`;
export const BACKEND_URL = `http://localhost:8787/api/v1/`


let token = JSON.stringify(localStorage.getItem("token"));
if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
}
export { token };