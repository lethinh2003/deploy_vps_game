import { Box, Typography } from "@mui/material";

const HuongDan = () => {
  return (
    <>
      <Box
        className="huongdan"
        sx={{
          padding: "10px",
          boxShadow: "0 5px 5px #c5c5da40",
          marginTop: "20px",
          borderRadius: "15px",
          background: "linear-gradient(124.32deg,#102d47 12.08%,#12304d 85.02%)",

          color: "text.primary",
        }}
      >
        <h2 className="title">Hướng dẫn rút tiền</h2>
        <Typography component="ul">
          <li>Nhập số tiền và chọn ngân hàng muốn rút.</li>
          <li>Số tiền rút tối thiểu 10.000đ.</li>
          <li>Tiền sẽ tự động vào tài khoản trong vòng 1 phút, nếu thấy lâu có thể liên hệ bộ phận hỗ trợ.</li>
        </Typography>
      </Box>
    </>
  );
};
export default HuongDan;
