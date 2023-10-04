const BASE_URL: string = process.env.REACT_APP_BASE_URL as string; // process.env. - оця штука передбачена по заводу від env

const APP_ENV = {
    BASE_URL: BASE_URL
}
export { APP_ENV };