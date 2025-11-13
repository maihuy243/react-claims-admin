import TongQuanIcon from "@assets/menu/tongquan.svg?react"
import TaiKhoanIcon from "@assets/menu/taikhoan.svg?react"
import QLCBIcon from "@assets/menu/quanlycanbo.svg?react"
import QLHDIcon from "@assets/menu/qlhopdong.svg?react"
import QLBTIcon from "@assets/menu/qlboithuong.svg?react"
import ThietLapIcon from "@assets/menu/thietlap.svg?react"
import ThongBaoIcon from "@assets/menu/thongbao.svg?react"

export const MENU = [
  {
    label: "Tổng quan",
    icon: TongQuanIcon,
    to: "/",
    disabled: true,
  },
  {
    label: "Tài khoản",
    icon: TaiKhoanIcon,
    to: "/users",
  },
  {
    label: "Quản lý cán bộ",
    icon: QLCBIcon,
    to: "/staff",
    disabled: true,
  },
  {
    label: "Chi tiết",
    icon: QLCBIcon,
    to: "/contract-detail",
  },
  {
    label: "Quản lý hợp đồng",
    icon: QLHDIcon,
    children: [
      {
        label: "Danh sách hợp đồng",
        to: "/contracts",
        disabled: false,
      },
    ],
  },
  {
    label: "Quản lý bồi thường",
    icon: QLBTIcon,
    to: "/claims",
    disabled: true,
  },
  {
    label: "Thiết lập",
    icon: ThietLapIcon,
    to: "/settings",
    disabled: true,
  },
  {
    label: "Thông báo",
    icon: ThongBaoIcon,
    to: "/notifications",
    disabled: true,
  },
]
