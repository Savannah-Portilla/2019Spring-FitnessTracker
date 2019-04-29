import { api, Globals } from "./api";

export async function getAll(){
    const x = await api("Users/getAll")
    return x;
}
export async function get(){
    const x = await api("Users/get")
    return x;
}
export async function GetFriends(){
    const x = await api("Users")
    return x;
}

export const GetFriends2 = () => api("Users");

export async function Register(data){
    const x = await api("Users/register", data)
    return x;
}
export async function Login(data){
    const x = await api("Users/login", data)
    Globals.user = x.user;
    Globals.token = x.token;
    return x;
}
