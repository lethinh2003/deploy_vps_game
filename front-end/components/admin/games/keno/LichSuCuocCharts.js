import SocketContext from "@/context/socket";
import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import useGetDetailedBetGameHistory from "@/hooks/admin/useGetDetailedBetGameHistory";

const transformDataChart = (dataQuery) => {
  const tempDataChart = [];
  const Cuoc1C = { name: "1C", value: 0 };
  const Cuoc1L = { name: "1L", value: 0 };
  const Cuoc1T = { name: "1T", value: 0 };
  const Cuoc1X = { name: "1X", value: 0 };

  const Cuoc2C = { name: "2C", value: 0 };
  const Cuoc2L = { name: "2L", value: 0 };
  const Cuoc2T = { name: "2T", value: 0 };
  const Cuoc2X = { name: "2X", value: 0 };

  const Cuoc3C = { name: "3C", value: 0 };
  const Cuoc3L = { name: "3L", value: 0 };
  const Cuoc3T = { name: "3T", value: 0 };
  const Cuoc3X = { name: "3X", value: 0 };

  const Cuoc4C = { name: "4C", value: 0 };
  const Cuoc4L = { name: "4L", value: 0 };
  const Cuoc4T = { name: "4T", value: 0 };
  const Cuoc4X = { name: "4X", value: 0 };

  const Cuoc5C = { name: "5C", value: 0 };
  const Cuoc5L = { name: "5L", value: 0 };
  const Cuoc5T = { name: "5T", value: 0 };
  const Cuoc5X = { name: "5X", value: 0 };

  dataQuery?.map((item) => {
    item.datCuoc.map((itemCuoc) => {
      const { loaiBi } = itemCuoc;
      const { loaiCuoc, tienCuoc } = itemCuoc.chiTietCuoc[0];
      if (loaiBi === "1" && loaiCuoc === "C") {
        Cuoc1C.value += tienCuoc;
      } else if (loaiBi === "1" && loaiCuoc === "L") {
        Cuoc1L.value += tienCuoc;
      } else if (loaiBi === "1" && loaiCuoc === "T") {
        Cuoc1T.value += tienCuoc;
      } else if (loaiBi === "1" && loaiCuoc === "X") {
        Cuoc1X.value += tienCuoc;
      } else if (loaiBi === "2" && loaiCuoc === "C") {
        Cuoc2C.value += tienCuoc;
      } else if (loaiBi === "2" && loaiCuoc === "L") {
        Cuoc2L.value += tienCuoc;
      } else if (loaiBi === "2" && loaiCuoc === "T") {
        Cuoc2T.value += tienCuoc;
      } else if (loaiBi === "2" && loaiCuoc === "X") {
        Cuoc2X.value += tienCuoc;
      } else if (loaiBi === "3" && loaiCuoc === "C") {
        Cuoc3C.value += tienCuoc;
      } else if (loaiBi === "3" && loaiCuoc === "L") {
        Cuoc3L.value += tienCuoc;
      } else if (loaiBi === "3" && loaiCuoc === "T") {
        Cuoc3T.value += tienCuoc;
      } else if (loaiBi === "3" && loaiCuoc === "X") {
        Cuoc3X.value += tienCuoc;
      } else if (loaiBi === "4" && loaiCuoc === "C") {
        Cuoc4C.value += tienCuoc;
      } else if (loaiBi === "4" && loaiCuoc === "L") {
        Cuoc4L.value += tienCuoc;
      } else if (loaiBi === "4" && loaiCuoc === "T") {
        Cuoc4T.value += tienCuoc;
      } else if (loaiBi === "4" && loaiCuoc === "X") {
        Cuoc4X.value += tienCuoc;
      } else if (loaiBi === "5" && loaiCuoc === "C") {
        Cuoc5C.value += tienCuoc;
      } else if (loaiBi === "5" && loaiCuoc === "L") {
        Cuoc5L.value += tienCuoc;
      } else if (loaiBi === "5" && loaiCuoc === "T") {
        Cuoc5T.value += tienCuoc;
      } else if (loaiBi === "5" && loaiCuoc === "X") {
        Cuoc5X.value += tienCuoc;
      }
    });
  });
  tempDataChart.push(
    Cuoc1C,
    Cuoc1L,
    Cuoc1T,
    Cuoc1X,

    Cuoc2C,
    Cuoc2L,
    Cuoc2T,
    Cuoc2X,

    Cuoc3C,
    Cuoc3L,
    Cuoc3T,
    Cuoc3X,

    Cuoc4C,
    Cuoc4L,
    Cuoc4T,
    Cuoc4X,

    Cuoc5C,
    Cuoc5L,
    Cuoc5T,
    Cuoc5X
  );

  return tempDataChart;
};
const LichSuCuocCharts = ({ ID, TYPE_GAME }) => {
  const { socket } = useContext(SocketContext);
  const {
    data: dataQuery,
    isLoading,
    refetch,
  } = useGetDetailedBetGameHistory({
    typeGame: TYPE_GAME,
    id: ID,
  });
  const [dataChart, setDataChart] = useState(transformDataChart(dataQuery));

  useEffect(() => {
    if (socket) {
      socket.emit(`${TYPE_GAME}:join-room-admin`);
      socket.on(`${TYPE_GAME}:admin:refetch-data-lich-su-cuoc-game`, ({ phien }) => {
        if (phien == ID) {
          refetch();
        }
      });
      return () => {
        socket.off(`${TYPE_GAME}:admin:refetch-data-lich-su-cuoc-game`);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (dataQuery) {
      setDataChart(transformDataChart(dataQuery));
    }
  }, [dataQuery]);

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          color: "text.secondary",
          width: "100%",
        }}
      >
        <h1
          className="title admin"
          style={{
            justifyContent: "center",
            fontSize: "2.5rem",
          }}
        >
          Thống kê tiền cược
        </h1>
        {isLoading && <CircularProgress color="inherit" />}

        {!isLoading && (
          <>
            <BarChart
              style={{
                fontSize: "1.5rem",
                maxWidth: "900px",
                width: "100%",
                overflow: "auto",
                margin: "0 auto",
              }}
              width={900}
              height={500}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
          </>
        )}
      </Box>
    </>
  );
};
export default LichSuCuocCharts;
