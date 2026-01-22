const URL = 'http://127.0.0.1:8000';

async function data_fetcher(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || `Error ${res.status}`);
    return data;
}

(async () => {
    try {
        const data = await data_fetcher(`${URL}/api/network/?option=A`);
        console.log(data);
    } catch (err) {
        console.error("Błąd:", err.message);
    }
})();