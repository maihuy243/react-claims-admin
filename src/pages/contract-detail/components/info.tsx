import { InputToolTip as Input } from "@/components/input-tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Section } from "@/components/section"
import Wrapper from "@/components/wrapper"
import DefaultImage from "@assets/avatar.jpg"
import { Field } from "@/components/field"
import { dateFormat, delay } from "@/utils"
import { AnhBoiThuong, ChungTuBoSung, DetailBTResponse } from "@/model"
import { EmptyState } from "@/components/empty"
import { useUIStore } from "@/store/state"
import { CMSApi } from "@/api"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import ImagePreview from "@/components/image-preview"
import { v4 as uuidv4 } from "uuid"
import { useDidUpdateEffect } from "@/hooks/custom/useDidUpdate"

const other = "Giấy tờ khác"

const DEFAULT_ITEM: AnhBoiThuong[] = [
  {
    ghi_chu: "",
    loai_giay_to: other,
    id: uuidv4(),
    hinh_anh: "",
  },
]
const Info = ({
  data,
  id,
  reflect,
}: {
  data?: DetailBTResponse
  id?: string
  reflect: () => Promise<DetailBTResponse | undefined>
}) => {
  const [dsChungTu, setDsChungTu] = useState<AnhBoiThuong[]>(
    data?.danh_sach_anh ?? [],
  )
  const [editMode, setEditMode] = useState<boolean>(false)

  const setLoading = useUIStore((s) => s.setLoading)
  const showError = useUIStore((s) => s.showError)
  const showSuccess = useUIStore((s) => s.showSuccess)

  const onRequestEdit = () => {
    setEditMode(true)
    const isOther = dsChungTu.find((s) => s.loai_giay_to.toLowerCase().trim() == other.toLowerCase().trim())
    const finalList = !!dsChungTu.length ? isOther ? dsChungTu : [...DEFAULT_ITEM, ...dsChungTu] : DEFAULT_ITEM
    setDsChungTu(
      finalList.map((item) => ({
        ...item,
        active: false,
      })),
    )
  }

  const onSubmitBSCT = async () => {
    if (!data || !id) return
    try {
      setLoading(true)
      const res = await CMSApi.sendmail({
        mail_type: "BS",
        so_id: id,
        so_ho_so: data.so_hs,
        so_hop_dong: data.so_hop_dong,
        ten_chu_hop_dong: data.chu_hop_dong,
        ngay_nhan_ho_so: data.ngay_nh,
        ten_ndbh: data.nguoi_duoc_bao_hiem,
        to_email: data.email,
        chan_doan: data.chan_doan,
        danh_sach_chung_tu: dsChungTu.map((s, i) => ({
          noi_dung_bo_sung: s.ghi_chu,
          stt: ++i,
          ten_chung_tu: s.loai_giay_to,
        })),
        ngay_kham: data.ngay_kham,
        so_tien_yeu_cau: data.so_tien_yeu_cau_boi_thuong,
      })

      await delay(300)

      if (!res.success) {
        showError(res.message)
        return
      }
      showSuccess(res.message)
      reflect()
      setEditMode(false)
      setDsChungTu([])
    } finally {
      setLoading(false)
    }
  }

  useDidUpdateEffect(() => {
    setDsChungTu(data?.danh_sach_anh ?? [])
  }, [data?.danh_sach_anh])

  return (
    <div className="h-full pb-10">
      {/* <Button className="mb-4 mt-1 max-w-[257px] bg-[#fc9a9c] text-white">
      </Button> */}
      <div className="mx-auto flex w-full flex-col gap-6 pb-20 md:pb-10">
        {/* ROW: CONTENT + CARD */}
        <div className="flex w-full flex-col items-start gap-6 md:flex-row">
          {/* LEFT CONTENT */}
          <div className="order-1 w-full flex-1 space-y-6 md:order-1">
            {/* ================= THÔNG TIN CHUNG ================= */}
            <Wrapper>
              <Section title="Thông tin chung">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <Field label="Người được bảo hiểm">
                    <Input disabled value={data?.nguoi_duoc_bao_hiem ?? ""} />
                  </Field>

                  <Field label="Chủ hợp đồng">
                    <Input disabled value={data?.chu_hop_dong ?? ""} />
                  </Field>

                  <Field label="CCCD/CMND/HC">
                    <Input disabled value={data?.cccd ?? ""} />
                  </Field>

                  <Field label="Ngày sinh">
                    <Input disabled value={data?.ngay_sinh ?? ""} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Số điện thoại">
                    <Input disabled value={data?.sdt ?? ""} />
                  </Field>

                  <Field label="Email">
                    <Input disabled value={data?.email ?? ""} />
                  </Field>
                </div>
              </Section>
            </Wrapper>

            {/* ================= THÔNG TIN ĐIỀU TRỊ ================= */}
            <Wrapper>
              <Section title="Thông tin điều trị">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Sự kiện bảo hiểm" option>
                    <Input disabled value={data?.su_kien_bao_hiem ?? ""} />
                  </Field>

                  <Field label="Hình thức điều trị" option>
                    <Input disabled value={data?.hinh_thuc_dieu_tri ?? ""} />
                  </Field>
                </div>
              </Section>
            </Wrapper>

            {/* ================= THÔNG TIN KHÁM ================= */}
            <Wrapper>
              <Section title="Thông tin khám, chữa bệnh">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <Field label="Ngày khám">
                    <Input disabled value={dateFormat(data?.ngay_kham)} />
                  </Field>

                  <Field label="Ngày xảy ra tai nạn">
                    <Input
                      disabled
                      value={dateFormat(data?.ngay_xay_ra_tai_nan)}
                    />
                  </Field>

                  <Field label="Ngày vào viện">
                    <Input disabled value={dateFormat(data?.ngay_vao_vien)} />
                  </Field>

                  <Field label="Ngày ra viện">
                    <Input disabled value={dateFormat(data?.ngay_ra_vien)} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Cơ sở y tế">
                    <Input disabled value={data?.co_so_y_te} />
                  </Field>

                  <Field label="Chẩn đoán">
                    <Input disabled value={data?.chan_doan} />
                  </Field>

                  <Field label="Số tiền yêu cầu bồi thường">
                    <Input disabled value={data?.so_tien_yeu_cau_boi_thuong} />
                  </Field>

                  <Field label="Số tiền bồi thường">
                    <Input disabled value={data?.so_tien_boi_thuong} />
                  </Field>
                </div>
              </Section>
            </Wrapper>

            {/* ================= THÔNG TIN THỤ HƯỞNG ================= */}
            <Wrapper>
              <Section title="Thông tin thụ hưởng">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <Field label="Phương thức">
                    <Input disabled value={data?.phuong_thuc} />
                  </Field>

                  <Field label="Ngân hàng">
                    <Input disabled value={data?.ngan_hang} />
                  </Field>

                  <Field label="Số tài khoản">
                    <Input disabled value={data?.so_tai_khoan} />
                  </Field>

                  <Field label="Tên tài khoản">
                    <Input disabled value={data?.ten_tai_khoan} />
                  </Field>
                </div>
              </Section>
            </Wrapper>
          </div>

          {/* ================= CARD (BÊN PHẢI) ================= */}
          <Card className="order-2 w-full flex-shrink-0 self-stretch rounded-xl shadow-lg md:order-2 md:w-1/5">
            <CardContent className="flex h-full w-full flex-col items-center justify-center p-4 text-center md:px-10">
              <img
                src={data?.avartar || DefaultImage}
                className="w-full max-w-[220px] rounded-lg object-cover shadow-md md:max-w-full"
                alt="avatar"
              />

              <div className="w-full space-y-1 rounded-md bg-[#F9F0FD] py-4 md:rounded-none">
                <p className="font-semibold text-gray-800">
                  Tên KH : {data?.chu_hop_dong}
                </p>
                <p className="text-sm text-gray-600">Số hợp đồng</p>
                <p className="text-sm font-medium text-gray-700">
                  {data?.so_hop_dong}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= THÔNG TIN GIẤY TỜ — FULL WIDTH ================= */}
        <Wrapper>
          <Section
            title="Thông tin giấy tờ"
            extra={
              editMode ? (
                <Button
                  onClick={onSubmitBSCT}
                  variant="ghost"
                  className="rounded-lg border border-[#ff6b45]/40 px-3 py-1 font-medium text-[#ff6b45]"
                >
                  Gửi yêu cầu
                </Button>
              ) : (
                <Button
                  onClick={onRequestEdit}
                  variant="ghost"
                  className="rounded-lg border border-[#ff6b45]/40 px-3 py-1 font-medium text-[#ff6b45]"
                >
                  Yêu cầu khách hàng bổ sung CT
                </Button>
              )
            }
          >
            <Card>
              <CardContent className="p-0">
                {!!dsChungTu.length ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#f8f8f8]">
                        <TableHead className="w-1/4">ID</TableHead>
                        <TableHead>Loại giấy tờ</TableHead>
                        <TableHead>Hình ảnh</TableHead>
                        <TableHead>Ghi chú</TableHead>
                        {editMode && (
                          <TableHead className="text-center">Sửa đổi</TableHead>
                        )}
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {dsChungTu.map((row, idx) => (
                        <TableRow
                          key={idx}
                          className="odd:bg-white even:bg-[#fafafa]"
                        >
                          <TableCell className="font-semibold text-orange-600">
                            {row.id}
                          </TableCell>
                          <TableCell>{row.loai_giay_to}</TableCell>
                          <TableCell>
                            {row.hinh_anh ? (
                              <ImagePreview src={row.hinh_anh}>
                                <img
                                  src={row.hinh_anh}
                                  className="w-20 cursor-pointer rounded-md"
                                />
                              </ImagePreview>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>
                            <Input
                              disabled={!editMode || !row.active}
                              value={row.ghi_chu}
                              onChange={(e) => {
                                if (!editMode) return
                                setDsChungTu((prev) =>
                                  prev.map((doc, i) =>
                                    i === idx
                                      ? { ...doc, ghi_chu: e.target.value }
                                      : doc,
                                  ),
                                )
                              }}
                            />
                          </TableCell>
                          {editMode && (
                            <TableCell className="w-[100px] text-center">
                              <div className="flex items-center justify-center">
                                <Checkbox
                                  checked={row.active}
                                  onCheckedChange={(checked) => {
                                    setDsChungTu((prev) =>
                                      prev.map((doc, i) =>
                                        i === idx
                                          ? { ...doc, active: !!checked }
                                          : doc,
                                      ),
                                    )
                                  }}
                                />
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState label="Thông tin giấy tờ không có sẵn !" />
                )}
              </CardContent>
            </Card>
          </Section>
        </Wrapper>
      </div>
    </div>
  )
}

export default Info
