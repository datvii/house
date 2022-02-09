export const uid = (pre: string | number): string => {
    return `${pre}_${new Date().getTime()}`;
};

export const getRate = () => {
    return fetch('http://data.fixer.io/api/latest?access_key=1351eb7bbd287c4e5745f9380d85ccce')
        .then(data => data.json())
        .catch(err => console.error(err));
}