import React from "react";
import css from "./HighPeople.module.scss";
import {
  Box,
  Circle,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Img,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaCrown } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import RankingCard from "./RankingCard/RankingCard";

interface Props {}
interface RankingCardProps {
  rank: string;
  imageSrc: string;
  name: string;
  comment: string;
}

const HighPeople: React.FC<Props> = (props: Props) => {
  return (
    <Box p={5} borderRadius="10px" bg="white">
      <Heading
        // fontFamily="monospace"
        textAlign="center"
        // pt="50px"
        pb="45px"
        fontSize="27px"
        fontWeight={700}
        color="gray.600"
      >
        Instructor Top 3
      </Heading>
      {/* <GiQueenCrown
          color="black"
          className={css.crown}
          size="50px"
          style={{ position: "absolute", top: "22%", left: "22%" }}
        /> */}
      <Box className={css.box} w="400px" pt={3}>
        {/* <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
            padding="10px"
          > */}
        {/* <Img
          width="300px"
          height="100px"
          // border="1px solid black"
          // padding={6}
          src="https://ifh.cc/g/9XDKSa.png"
        ></Img> */}
        <RankingCard
          comment="불굴의 8주 연속 1위"
          rank="https://ifh.cc/g/sM1l3d.png"
          imageSrc="https://ifh.cc/g/t42vxY.jpg"
          name="남욱김"
        />
        <RankingCard
          comment="코딩가든의 신흥 강자"
          rank="https://ifh.cc/g/pxkal7.png"
          imageSrc="https://ifh.cc/g/wQ8m88.jpg"
          name="관열백"
        />
        <RankingCard
          comment="코딩가든의 얼굴마담"
          rank="https://ifh.cc/g/vJzFTL.png"
          imageSrc="https://ifh.cc/g/cJCznM.jpg"
          name="오뚜니"
        />
        {/* </Flex> */}
      </Box>
    </Box>
  );
};

export default HighPeople;
