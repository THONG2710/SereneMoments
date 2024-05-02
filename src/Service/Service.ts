import AsyncStorage from "@react-native-async-storage/async-storage";

// chuyển đổi epochtime
export const onConvertEpochtime = (time: number) => {
    const date = new Date(time * 1000);
    const year = onFormatNumber(Number(date.getFullYear()));
    const month = onFormatNumber(Number(date.getMonth() + 1));
    const day = onFormatNumber(Number(date.getDate()));
    const hours = onFormatNumber(Number(date.getHours()));
    const minutes = onFormatNumber(Number(date.getMinutes()));

    return `${hours}:${minutes}    ${day}/${month}/${year} `;
};

export const onConvertTime = (time: number) => {
    const date = new Date(time * 1000);
    const year = onFormatNumber(Number(date.getFullYear()));
    const month = onFormatNumber(Number(date.getMonth() + 1));
    const day = onFormatNumber(Number(date.getDate()));

    return `${day}/${month}/${year}`;
}

// thêm số 0 nếu nhỏ hơn 10
export const onFormatNumber = (number: number) => {
    if (number < 10) {
        return '0' + number;
    }
    return number;
};

// lưu giá trị vào asyncStorage
export const setDataToStorage = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        const result = await AsyncStorage.setItem(key, jsonValue);
        return result;
    } catch (error) {
        console.log('failed to set storage: ', error);
    }
}

// đọc giá trị asyncStorage
export const getDataFromStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
        return null;
    } catch (error) {
        console.log('failed to get storage: ', error);
    }
}

// chuyển đổi ngày 
export const onConvertDay = (day: number) => {
    if (day == 0) {
        return 'Chủ nhật';
    }
    if (day == 1) {
        return 'Thứ hai'
    }
    if (day == 2) {
        return 'Thứ ba';
    }
    if (day == 3) {
        return 'Thứ tư';
    }
    if (day == 4) {
        return 'Thứ năm'
    }
    if (day == 5) {
        return 'Thứ sáu'
    }
    if (day == 6) {
        return 'Thứ bảy'
    }
}