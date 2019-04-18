import { api, Globals } from "./api";

export async function GetFriends(){
    const x = await api("Users")
    return x;
}

export const GetFriends2 = () => api("Users");

export async function Register(data){
    const x = await api("Users", data)
    return x;
}
export async function Login(data){
    const x = await api("Users/login", data)
    Globals.User = x.User;
    Globals.token = x.token;
    return x;
}
