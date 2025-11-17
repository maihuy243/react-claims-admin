import { CMSApi } from "@/api"
import { SearchHDResponse, UpdateCBRequest } from "@/model"
import { useUIStore } from "@/store/state"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateCB() {
  const queryClient = useQueryClient()
  const showSuccess = useUIStore((s) => s.showSuccess)
  const showError = useUIStore((s) => s.showError)
  return useMutation({
    mutationFn: (payload: UpdateCBRequest) => CMSApi.updateCB(payload),

    // ============================
    // 🔥 OPTIMISTIC UPDATE
    // ============================
    onMutate: async (payload: UpdateCBRequest) => {
      await queryClient.cancelQueries({ queryKey: ["searchHD"] })

      // Lấy cache hiện tại
      const previous = queryClient.getQueryData<SearchHDResponse>(["searchHD"])
      console.log("previous __", previous)

      if (previous) {
        const updated: SearchHDResponse = {
          ...previous,
          data: previous.data.map((item) =>
            item.id === payload.so_hop_dong
              ? {
                  ...item,
                  can_bo_xu_ly: payload.ma_can_bo,
                  ten_can_bo: payload.ten_can_bo,
                }
              : item,
          ),
        }

        // Update cache optimistic
        queryClient.setQueryData(["searchHD"], updated)
      }

      return { previous }
    },

    // ============================
    // ❌ ROLLBACK KHI FAIL
    // ============================
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["searchHD"], context.previous)
      }

      showError(_err?.message || "Cập nhật thất bại. Vui lòng thử lại.")
    },
    onSuccess: (res) => {
      showSuccess(res.message || "Cập nhật cán bộ xử lý thành công!")
    },
    // ============================
    // ✔ REFRESH NHẸ
    // ============================
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["searchHD"],
        refetchType: "inactive",
      })
    },
  })
}
