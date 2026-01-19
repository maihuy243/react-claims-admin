import TongQuanIcon from "@assets/menu/tongquan.svg?react"
import TaiKhoanIcon from "@assets/menu/taikhoan.svg?react"
import QLCBIcon from "@assets/menu/quanlycanbo.svg?react"
import QLHDIcon from "@assets/menu/qlhopdong.svg?react"
import QLBTIcon from "@assets/menu/qlboithuong.svg?react"
import ThietLapIcon from "@assets/menu/thietlap.svg?react"
import ThongBaoIcon from "@assets/menu/thongbao.svg?react"

type TMenu = {
  label: string
  icon: any
  to?: string
  disabled?: boolean
  children?: TMenuChil[]
  isHidden?: boolean
}

type TMenuChil = {
  label: string
  to: string
  disabled?: boolean
  isHidden?: boolean
}

export const MENU: TMenu[] = [
  {
    label: "Tổng quan",
    icon: TongQuanIcon,
    to: "/dashboard",
  },
  {
    label: "Tài khoản",
    icon: TaiKhoanIcon,
    children: [
      {
        label: "Danh sách người dùng",
        to: "/users",
        disabled: false,
      },
    ],
  },
  {
    label: "Quản lý cán bộ",
    icon: QLCBIcon,
    children: [
      {
        label: "Danh sách cán bộ",
        to: "/staff",
        disabled: false,
      },
    ],
  },
  // {
  //   label: "Chi tiết",
  //   icon: QLCBIcon,
  //   to: "/contract-detail",
  // },
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
    children: [
      {
        label: "Danh sách bồi thường",
        to: "/compensation-list",
        disabled: false,
      },
      {
        label: "Thông tin bồi thường",
        to: "/contract-detail",
        disabled: false,
        isHidden: true,
      },
    ],
  },
  {
    label: "Thiết lập",
    icon: ThietLapIcon,
    to: "/notification",
  },
  {
    label: "Thông báo",
    icon: ThongBaoIcon,
    to: "/setup",
  },
]
