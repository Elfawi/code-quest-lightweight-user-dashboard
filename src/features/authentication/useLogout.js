import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // queryClient.removeQueries({ queryKey: ["user"] }); // or
      queryClient.removeQueries();
      toast.success("Logged out successfully!");
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
