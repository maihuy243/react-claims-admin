import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import HeaderDetail from "./components/header"
import clsx from "clsx"
import DefaultImage from "@assets/avatar.png"
import { Field } from "@/components/field"

const height = "md:h-[calc(100vh-280px)] h-auto"

export default function ClaimDetail() {
  return (
    <div className="h-screen flex flex-col">
      <HeaderDetail />

      {/* ==== MAIN LAYOUT ==== */}
      <div className="flex-1 mt-3 md:mt-4 px-0 md:px-2 overflow-scroll md:overflow-visible">
        <div className="w-full mx-auto flex flex-col md:flex-row gap-6 h-full">
          {/* ========== SIDEBAR (RIGHT ON DESKTOP / TOP ON MOBILE) ========== */}
          <Card
            className={clsx(
              `
              md:order-2 order-1
              md:w-1/5 w-full
              md:top-[110px]
              rounded-xl shadow-sm border
              flex
            `,
              height,
            )}
          >
            <CardContent className="p-4 flex flex-col justify-center items-center text-center w-full md:px-10">
              <img
                src={DefaultImage}
                className="rounded-lg w-full max-w-[220px] md:max-w-full object-cover shadow-md "
              />

              <div className="space-y-1 bg-[#F9F0FD] w-full py-4 rounded-md md:rounded-none">
                <p className="font-semibold text-gray-800">
                  Tên KH : Nguyễn Văn A
                </p>
                <p className="text-sm text-gray-600">Số hợp đồng</p>
                <p className="text-sm font-medium text-gray-700">
                  03590389780128
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ========== CONTENT SCROLL AREA ========== */}
          <div
            className="
              md:order-1 order-2
              md:w-4/5 w-full
              flex-1
              min-h-0
            "
          >
            <div
              className={clsx(
                ` overflow-y-auto
                  pr-2
                  pb-40
                  md:pb-20
                  space-y-6
                `,
                height,
              )}
            >
              {/* ------------------ THÔNG TIN CHUNG ------------------ */}
              <Wrapper>
                <Section title="Thông tin chung">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Field label="Người được bảo hiểm" required>
                      <Input disabled placeholder="Nhập mã" />
                    </Field>

                    <Field label="Chủ hợp đồng" required>
                      <Input disabled placeholder="Nhập họ và tên" />
                    </Field>

                    <Field label="CCCD/CMND/HC" required>
                      <Select disabled>
                        <SelectTrigger className="bg-gray-100">
                          <SelectValue placeholder="Chọn" />
                        </SelectTrigger>
                      </Select>
                    </Field>

                    <Field label="Ngày sinh" required>
                      <Input disabled type="date" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Số điện thoại" required>
                      <Input disabled placeholder="0908877777" />
                    </Field>

                    <Field label="Email" required>
                      <Input disabled placeholder="example@gmail.com" />
                    </Field>
                  </div>
                </Section>
              </Wrapper>

              {/* ------------------ THÔNG TIN ĐIỀU TRỊ ------------------ */}
              <Wrapper>
                <Section title="Thông tin điều trị">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Sự kiện bảo hiểm" required>
                      <Select disabled>
                        <SelectTrigger className="bg-gray-100">
                          <SelectValue placeholder="Tai nạn" />
                        </SelectTrigger>
                      </Select>
                    </Field>

                    <Field label="Hình thức điều trị" required>
                      <Select disabled>
                        <SelectTrigger className="bg-gray-100">
                          <SelectValue placeholder="Nằm viện" />
                        </SelectTrigger>
                      </Select>
                    </Field>
                  </div>
                </Section>
              </Wrapper>

              {/* ------------------ THÔNG TIN KHÁM ------------------ */}
              <Wrapper>
                <Section title="Thông tin khám, chữa bệnh">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Field label="Ngày khám" required>
                      <Input disabled type="date" />
                    </Field>

                    <Field label="Ngày xảy ra tai nạn" required>
                      <Input disabled type="date" />
                    </Field>

                    <Field label="Ngày vào viện" required>
                      <Input disabled type="date" />
                    </Field>

                    <Field label="Ngày ra viện" required>
                      <Input disabled type="date" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Cơ sở y tế" required>
                      <Input disabled placeholder="Bệnh viện 108" />
                    </Field>

                    <Field label="Chẩn đoán" required>
                      <Input disabled placeholder="Cảm cúm" />
                    </Field>

                    <Field label="Số tiền yêu cầu bồi thường" required>
                      <Input disabled placeholder="2.000.000" />
                    </Field>

                    <Field label="Số tiền bồi thường" required>
                      <Input disabled placeholder="2.000.000" />
                    </Field>
                  </div>
                </Section>
              </Wrapper>

              {/* ------------------ THÔNG TIN THỤ HƯỞNG ------------------ */}
              <Wrapper>
                <Section title="Thông tin thụ hưởng">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Field label="Phương thức" required>
                      <Select disabled>
                        <SelectTrigger className="bg-gray-100">
                          <SelectValue placeholder="Chuyển khoản" />
                        </SelectTrigger>
                      </Select>
                    </Field>

                    <Field label="Ngân hàng" required>
                      <Select disabled>
                        <SelectTrigger className="bg-gray-100">
                          <SelectValue placeholder="Vietinbank" />
                        </SelectTrigger>
                      </Select>
                    </Field>

                    <Field label="Số tài khoản" required>
                      <Input disabled placeholder="0989787877" />
                    </Field>

                    <Field label="Tên tài khoản" required>
                      <Input disabled placeholder="Nguyễn Văn A" />
                    </Field>
                  </div>
                </Section>
              </Wrapper>

              {/* ------------------ THÔNG TIN GIẤY TỜ ------------------ */}
              <Wrapper>
                <Section
                  title="Thông tin giấy tờ"
                  extra={
                    <Button
                      disabled
                      variant="ghost"
                      className="text-[#ff6b45] font-medium border border-[#ff6b45]/40 px-3 py-1 rounded-lg"
                    >
                      Yêu cầu khách hàng bổ sung CT
                    </Button>
                  }
                >
                  <Card>
                    <CardContent className="p-0">
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
                          {[1, 2, 3].map((id) => (
                            <TableRow
                              key={id}
                              className="odd:bg-white even:bg-[#fafafa]"
                            >
                              <TableCell className="text-orange-600 font-semibold">
                                123
                              </TableCell>
                              <TableCell>Hóa đơn/bảng kê/Phiếu thu</TableCell>
                              <TableCell>
                                <img
                                  src="/sample.jpg"
                                  className="w-20 rounded-md shadow-sm"
                                />
                              </TableCell>
                              <TableCell>
                                <Input disabled placeholder="Ghi chú..." />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </Section>
              </Wrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
