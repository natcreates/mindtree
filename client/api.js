 export const fetchData = async () => {
    const response  = await fetch('/values');
    return response.json();
}
