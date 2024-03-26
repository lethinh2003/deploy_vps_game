import api from "@/configs/axios";

class UserService {
  static getDetailedInformation = async () => {
    const result = await api.get(`/v1/nguoidung`);
    return result;
  };
  static changePassword = async ({ currentPassword, newPassword }) => {
    const result = await api.post(`/v1/nguoidung/change-password`, {
      currentPassword,
      newPassword,
    });
    return result;
  };
}
export default UserService;
