import { RoleModel } from "./role-model";

export class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public id: string;
    public password: string;
    public city: string;
    public street: string;
    public role: RoleModel;
}
