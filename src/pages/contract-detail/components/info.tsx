import { Input } from "@/components/ui/input"
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
import DefaultImage from "@assets/avatar.png"
import { Field } from "@/components/field"
import { dateFormat } from "@/utils"
import { DetailBTResponse } from "@/model"
import { EmptyState } from "@/components/empty"

const Info = ({ data }: { data?: DetailBTResponse }) => {
  return (
    <>
      <Button className="mb-4 mt-1 max-w-[257px] bg-[#fc9a9c] text-white">
        Xem hồ sơ yêu cầu bồi thường
      </Button>
      <div className="flex-1">
        <div className="mx-auto flex h-full w-full flex-col gap-6">
          {/* ROW: CONTENT + CARD */}
          <div className="flex w-full flex-col items-start gap-6 md:flex-row">
            {/* LEFT CONTENT */}
            <div className="order-1 w-full flex-1 space-y-6 md:order-1">
              {/* ================= THÔNG TIN CHUNG ================= */}
              <Wrapper>
                <Section title="Thông tin chung">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Field label="Người được bảo hiểm" required>
                      <Input disabled value={data?.nguoi_duoc_bao_hiem ?? ""} />
                    </Field>

                    <Field label="Chủ hợp đồng" required>
                      <Input disabled value={data?.chu_hop_dong ?? ""} />
                    </Field>

                    <Field label="CCCD/CMND/HC" required>
                      <Input disabled value={data?.cccd ?? ""} />
                    </Field>

                    <Field label="Ngày sinh" required>
                      <Input disabled value={data?.ngay_sinh ?? ""} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Số điện thoại" required>
                      <Input disabled value={data?.so_dien_thoai ?? ""} />
                    </Field>

                    <Field label="Email" required>
                      <Input disabled value={data?.email ?? ""} />
                    </Field>
                  </div>
                </Section>
              </Wrapper>

              {/* ================= THÔNG TIN ĐIỀU TRỊ ================= */}
              <Wrapper>
                <Section title="Thông tin điều trị">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Sự kiện bảo hiểm" required option>
                      <Input disabled value={data?.su_kien_bao_hiem ?? ""} />
                    </Field>

                    <Field label="Hình thức điều trị" required option>
                      <Input disabled value={data?.hinh_thuc_dieu_tri ?? ""} />
                    </Field>
                  </div>
                </Section>
              </Wrapper>

              {/* ================= THÔNG TIN KHÁM ================= */}
              <Wrapper>
                <Section title="Thông tin khám, chữa bệnh">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Field label="Ngày khám" required>
                      <Input disabled value={dateFormat(data?.ngay_kham)} />
                    </Field>

                    <Field label="Ngày xảy ra tai nạn" required>
                      <Input
                        disabled
                        value={dateFormat(data?.ngay_xay_ra_tai_nan)}
                      />
                    </Field>

                    <Field label="Ngày vào viện" required>
                      <Input disabled value={dateFormat(data?.ngay_vao_vien)} />
                    </Field>

                    <Field label="Ngày ra viện" required>
                      <Input disabled value={dateFormat(data?.ngay_ra_vien)} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Cơ sở y tế" required>
                      <Input disabled value={data?.co_so_y_te} />
                    </Field>

                    <Field label="Chẩn đoán" required>
                      <Input disabled value={data?.chan_doan} />
                    </Field>

                    <Field label="Số tiền yêu cầu bồi thường" required>
                      <Input
                        disabled
                        value={data?.so_tien_yeu_cau_boi_thuong}
                      />
                    </Field>

                    <Field label="Số tiền bồi thường" required>
                      <Input disabled value={data?.so_tien_boi_thuong} />
                    </Field>
                  </div>
                </Section>
              </Wrapper>

              {/* ================= THÔNG TIN THỤ HƯỞNG ================= */}
              <Wrapper>
                <Section title="Thông tin thụ hưởng">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Field label="Phương thức" required>
                      <Input disabled value={data?.phuong_thuc} />
                    </Field>

                    <Field label="Ngân hàng" required>
                      <Input disabled value={data?.ngan_hang} />
                    </Field>

                    <Field label="Số tài khoản" required>
                      <Input disabled value={data?.so_tai_khoan} />
                    </Field>

                    <Field label="Tên tài khoản" required>
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
                  src={DefaultImage}
                  className="w-full max-w-[220px] rounded-lg object-cover shadow-md md:max-w-full"
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
                <Button
                  disabled
                  variant="ghost"
                  className="rounded-lg border border-[#ff6b45]/40 px-3 py-1 font-medium text-[#ff6b45]"
                >
                  Yêu cầu khách hàng bổ sung CT
                </Button>
              }
            >
              <Card>
                <CardContent className="p-0">
                  {!!data?.danh_sach_anh.length ? (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#f8f8f8]">
                          <TableHead>ID</TableHead>
                          <TableHead>Loại giấy tờ</TableHead>
                          <TableHead>Hình ảnh</TableHead>
                          <TableHead>Ghi chú</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {data.danh_sach_anh.map((row, idx) => (
                          <TableRow
                            key={idx}
                            className="odd:bg-white even:bg-[#fafafa]"
                          >
                            <TableCell className="font-semibold text-orange-600">
                              {row.id}
                            </TableCell>
                            <TableCell>{row.loai_giay_to}</TableCell>
                            <TableCell>
                              <img
                                src={row.hinh_anh}
                                className="w-20 rounded-md shadow-sm"
                              />
                            </TableCell>
                            <TableCell>
                              <Input disabled value={row.ghi_chu} />
                            </TableCell>
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
    </>
  )
}

export default Info
