import React, { useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import {
  FaCheckCircle,
  FaSquare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  Text,
  Stack,
  HStack,
  Box,
  Flex,
  Grid,
  GridItem,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { BsPlayCircle, BsAlarm } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";

interface Props {}
interface Data {
  day: string;
  value: number;
}

const mockData: Data[] = [
  {
    day: "2022-10-03",
    value: 11,
  },
  {
    day: "2022-10-04",
    value: 1,
  },
  {
    day: "2022-10-05",
    value: 11,
  },
  {
    day: "2022-10-06",
    value: 6,
  },
  {
    day: "2022-10-07",
    value: 1,
  },
  {
    day: "2022-10-08",
    value: 6,
  },
  {
    day: "2022-10-09",
    value: 210,
  },
  {
    day: "2022-09-12",
    value: 10,
  },
  {
    day: "2022-10-13",
    value: 1,
  },
  {
    day: "2022-10-14",
    value: 7,
  },
  {
    day: "2022-10-15",
    value: 4,
  },
  {
    day: "2022-10-17",
    value: 1,
  },
  {
    day: "2022-10-19",
    value: 4,
  },
  {
    day: "2022-10-20",
    value: 6,
  },
  {
    day: "2022-10-21",
    value: 11,
  },
  {
    day: "2022-10-23",
    value: 6,
  },
  {
    day: "2022-10-27",
    value: 30,
  },
  {
    day: "2022-09-11",
    value: 10,
  },
  {
    day: "2022-11-05",
    value: 21,
  },
  {
    day: "2022-11-06",
    value: 11,
  },
  {
    day: "2022-11-07",
    value: 21,
  },
  {
    day: "2022-11-09",
    value: 4,
  },
  {
    day: "2022-11-10",
    value: 6,
  },
  {
    day: "2022-11-11",
    value: 2,
  },
  {
    day: "2022-11-02",
    value: 7,
  },
  {
    day: "2022-11-03",
    value: 5,
  },
  {
    day: "2022-11-01",
    value: 13,
  },
  {
    day: "2022-11-19",
    value: 8,
  },
  {
    day: "2022-11-20",
    value: 3,
  },
  {
    day: "2022-11-21",
    value: 3,
  },
  {
    day: "2022-11-23",
    value: 23,
  },
  {
    day: "2022-11-24",
    value: 3,
  },
  {
    day: "2022-11-26",
    value: 9,
  },
  {
    day: "2022-09-13",
    value: 15,
  },
  {
    day: "2022-12-08",
    value: 15,
  },
  {
    day: "2022-12-09",
    value: 24,
  },
  {
    day: "2022-12-10",
    value: 4,
  },
  {
    day: "2022-12-11",
    value: 8,
  },
  {
    day: "2022-12-13",
    value: 2,
  }, ////
  {
    day: "2023-01-01",
    value: 1,
  },
  {
    day: "2023-01-02",
    value: 7,
  },
  {
    day: "2023-01-03",
    value: 11,
  },
  {
    day: "2023-01-04",
    value: 1,
  },
  {
    day: "2023-01-05",
    value: 11,
  },
  {
    day: "2023-01-06",
    value: 6,
  },
  {
    day: "2023-01-07",
    value: 1,
  },
  {
    day: "2023-01-08",
    value: 6,
  },
  {
    day: "2023-01-09",
    value: 210,
  },
  {
    day: "2023-04-11",
    value: 10,
  },
  {
    day: "2023-01-13",
    value: 1,
  },
  {
    day: "2023-01-14",
    value: 7,
  },
  {
    day: "2023-01-15",
    value: 4,
  },
  {
    day: "2023-01-17",
    value: 1,
  },
  {
    day: "2023-01-19",
    value: 4,
  },
  {
    day: "2023-01-20",
    value: 6,
  },
  {
    day: "2023-01-21",
    value: 11,
  },
  {
    day: "2023-01-23",
    value: 6,
  },
  {
    day: "2023-01-27",
    value: 30,
  },
  {
    day: "2023-04-11",
    value: 10,
  },
  {
    day: "2023-02-05",
    value: 21,
  },
  {
    day: "2023-02-06",
    value: 11,
  },
  {
    day: "2023-02-07",
    value: 21,
  },
  {
    day: "2023-02-09",
    value: 4,
  },
  {
    day: "2023-02-10",
    value: 6,
  },
  {
    day: "2023-02-11",
    value: 2,
  },
  {
    day: "2023-05-02",
    value: 7,
  },
  {
    day: "2023-05-03",
    value: 5,
  },
  {
    day: "2023-02-01",
    value: 13,
  },
  {
    day: "2023-02-19",
    value: 8,
  },
  {
    day: "2023-02-20",
    value: 3,
  },
  {
    day: "2023-02-21",
    value: 3,
  },
  {
    day: "2023-02-23",
    value: 23,
  },
  {
    day: "2023-02-24",
    value: 3,
  },
  {
    day: "2023-02-26",
    value: 9,
  },
  {
    day: "2023-04-13",
    value: 15,
  },
  {
    day: "2023-03-08",
    value: 15,
  },
  {
    day: "2023-03-09",
    value: 24,
  },
  {
    day: "2023-03-10",
    value: 4,
  },
  {
    day: "2023-03-11",
    value: 8,
  },
  {
    day: "2023-03-13",
    value: 2,
  },
  {
    day: "2023-03-14",
    value: 15,
  },
  {
    day: "2023-03-15",
    value: 4,
  },
  {
    day: "2023-03-17",
    value: 4,
  },
  {
    day: "2023-03-19",
    value: 8,
  },
  {
    day: "2023-03-20",
    value: 2,
  },
  {
    day: "2023-03-21",
    value: 15,
  },
  {
    day: "2023-03-22",
    value: 1,
  },
  {
    day: "2023-03-23",
    value: 4,
  },
  {
    day: "2023-03-25",
    value: 18,
  },
  {
    day: "2023-03-27",
    value: 22,
  },
  {
    day: "2023-02-12",
    value: 8,
  },
  {
    day: "2023-02-13",
    value: 4,
  },
  {
    day: "2023-02-14",
    value: 4,
  },
  {
    day: "2023-02-16",
    value: 21,
  },
  {
    day: "2023-02-18",
    value: 10,
  },
  {
    day: "2023-04-02",
    value: 4,
  },
  {
    day: "2023-04-03",
    value: 1,
  },
  {
    day: "2023-04-04",
    value: 10,
  },
  {
    day: "2023-04-05",
    value: 4,
  },
  {
    day: "2023-04-07",
    value: 1,
  },
  {
    day: "2023-04-08",
    value: 10,
  },
  {
    day: "2023-04-10",
    value: 8,
  },
  {
    day: "2023-04-14",
    value: 4,
  },
  {
    day: "2023-04-16",
    value: 21,
  },
  {
    day: "2023-04-18",
    value: 10,
  },
  {
    day: "2023-04-19",
    value: 4,
  },
  {
    day: "2023-04-20",
    value: 1,
  },
  {
    day: "2023-04-21",
    value: 20,
  },
  {
    day: "2023-04-22",
    value: 8,
  },
  {
    day: "2023-04-24",
    value: 21,
  },
  {
    day: "2023-04-25",
    value: 10,
  },
  {
    day: "2023-04-26",
    value: 4,
  },
  {
    day: "2023-04-27",
    value: 1,
  },
  {
    day: "2023-04-29",
    value: 10,
  },
];

const GrassCalendar: React.FC<Props> = () => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const { colorMode } = useColorMode();

  const goToPreviousYear = () => setCurrentYear(currentYear - 1);
  const goToNextYear = () => setCurrentYear(currentYear + 1);

  const getValue = (value: number) => {
    if (value >= 21) {
      return 21;
    } else if (value >= 11) {
      return 11;
    } else if (value >= 6) {
      return 6;
    } else {
      return 1;
    }
  };

  const getColor = (value: number) => {
    if (value >= 20) {
      return "#3c6db5";
    } else if (value >= 11) {
      return "#6f99d1";
    } else if (value >= 6) {
      return "#9dc3f0";
    } else {
      return "#d1e5f7";
    }
  };

  const dataWithColors = mockData.map((item) => {
    return {
      ...item,
      value: getValue(item.value),
      color: getColor(getValue(item.value)),
    };
  });

  const colors = ["#d1e5f7", "#9dc3f0", "#6f99d1", "#3c6db5"];

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const customTheme = {
    labels: {
      text: {
        fill: colorMode === "light" ? "#858585" : "#858585",
      },
    },
  };

  return (
    <div>
      <Grid
        templateAreas={`"header header"
                  "day calendar"
                  "legend legend"`}
        gridTemplateRows={"1fr 170px 1fr "}
        gridTemplateColumns={"24px 1fr"}
      >
        <GridItem
          area={"header"}
          pl="3px"
          fontSize="18px"
          fontWeight="600"
          style={{ color: colorMode === "light" ? "#3d3d3d" : " white" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>연간 학습</Box>
            <Box display="flex" alignItems="center">
              <Button
                variant="ghost"
                borderRadius="xl"
                px="0"
                color="#858585"
                onClick={goToPreviousYear}
              >
                <FaChevronLeft />
              </Button>
              <Text>{currentYear}년</Text>
              <Button
                variant="ghost"
                borderRadius="xl"
                px="0"
                color="#858585"
                onClick={goToNextYear}
              >
                <FaChevronRight />
              </Button>
            </Box>
          </Box>
        </GridItem>
        <GridItem area={"day"} pt="24px">
          <Box
            style={{ color: colorMode === "light" ? "#858585" : " #858585" }}
          >
            {weekDays.map((day, index) => (
              <Box
                key={index}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  marginBottom: "6.7px",
                  fontSize: "11px",
                }}
              >
                {day}
              </Box>
            ))}
          </Box>
        </GridItem>
        <GridItem area={"calendar"}>
          <ResponsiveCalendar
            theme={customTheme}
            data={dataWithColors}
            from={`${currentYear}-01-01`}
            to={`${currentYear}-12-31`}
            emptyColor={colorMode === "light" ? "#f7f7f7" : "#313038"}
            // yearSpacing={40}
            daySpacing={4}
            dayBorderWidth={0.5}
            dayBorderColor={colorMode === "light" ? "#bababa" : "#4e4e52"}
            monthBorderColor={colorMode === "light" ? "#ffffff" : "#171c36"}
            monthLegend={(year, month) => {
              const date = new Date(year, month, 1);
              return date.toLocaleString("ko-KR", { month: "long" });
            }}
            yearLegend={() => ""}
            monthLegendOffset={10}
            yearLegendOffset={10}
            colors={colors}
            tooltip={({ day, value, color }) => (
              <div
                style={{
                  color: colorMode === "light" ? "black" : "black",
                  backgroundColor: "white",
                  padding: "8px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
                  lineHeight: "1.6",
                  fontWeight: "600",
                }}
              >
                <div>
                  {new Date(day)
                    .toLocaleDateString("ko-KR", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      weekday: "short",
                    })
                    .replace(/[()]/g, "")}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaCheckCircle
                    size={11}
                    style={{ marginLeft: "1px", marginRight: "9px", color }}
                  />
                  <span style={{ color: "#575757" }}>완료수업</span>
                  <strong style={{ marginLeft: "9px" }}>
                    {mockData.filter((item) => item.day === day)[0].value}개
                  </strong>
                </div>
              </div>
            )}
          />
        </GridItem>
        <GridItem area={"legend"} pl="3px" pr="3px">
          <Box
            fontSize="12px"
            display="flex"
            color="#858585"
            justifyContent="space-between"
            pb="20px"
          >
            <Box>완료 수업 수</Box>
            <HStack display="flex" spacing={3}>
              <HStack>
                <FaSquare color="#d1e5f7" />
                <Text>1~5</Text>
              </HStack>
              <HStack>
                <FaSquare color="#9dc3f0" />
                <Text>6~10</Text>
              </HStack>
              <HStack>
                <FaSquare color="#6f99d1" />
                <Text>11~20</Text>
              </HStack>
              <HStack>
                <FaSquare color="#3c6db5" />
                <Text>20 이상</Text>
              </HStack>
            </HStack>
          </Box>
          <HStack color="#858585" fontSize="12px" spacing={10}>
            <Stack spacing={0}>
              <HStack spacing={1}>
                <BsPlayCircle />
                <Text>완료 수업</Text>
              </HStack>
              <Box
                fontSize="14"
                fontWeight="600"
                style={{ color: colorMode === "light" ? "#3d3d3d" : " white" }}
              >
                14
              </Box>
            </Stack>
            <Stack spacing={0}>
              <HStack spacing={1}>
                <BsAlarm />
                <Text>총 학습</Text>
              </HStack>
              <Box
                fontSize="14"
                fontWeight="600"
                style={{ color: colorMode === "light" ? "#3d3d3d" : " white" }}
              >
                1시간 53분
              </Box>
            </Stack>
            <Stack spacing={0}>
              <HStack spacing={1}>
                <AiOutlineFileDone size={13} />
                <Text>완강</Text>
              </HStack>
              <Box
                fontSize="14"
                fontWeight="600"
                style={{ color: colorMode === "light" ? "#3d3d3d" : " white" }}
              >
                0
              </Box>
            </Stack>
          </HStack>
        </GridItem>
      </Grid>
    </div>
  );
};

export default GrassCalendar;
