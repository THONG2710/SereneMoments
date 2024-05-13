export const ID_ADRESS = '192.168.1.8';

export const getData = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('request error: ' + error);
    }
};

export const postData = async (url: string, data: any) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('request error: ' + error);
    }
}
