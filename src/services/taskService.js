export const fetchTasks = async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?userId=1"
    );
    return response.json();
};