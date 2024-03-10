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

// thêm số 0 nếu nhỏ hơn 10
export const onFormatNumber = (number: number) => {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}
 
