import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  HStack,
  Stack,
  Divider,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { RiHomeHeartLine, RiFolderUploadLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../../../services/api";
import { BsPlayCircle, BsFileEarmarkText } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { UserData } from "../../../../../typings/LectureData";

const InstructorSideBar: React.FC = () => {
  const dividerColor = useColorModeValue("gray.300", "gray.700");

  const navigate = useNavigate();
  const { isLoading, data, isError } = useQuery<UserData>(
    ["myprofile"],
    getMyProfile,
    {
      retry: false,
    }
  );
  if (isError) {
    navigate("/notfound");
  }
  return (
    <div>
      <Stack w="100%" fontWeight="600">
        <HStack px="5" py="2" fontSize="18px">
          <Box>강사 페이지</Box>
        </HStack>
        <Divider color={dividerColor} />;
        <HStack
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#003C93",
          }}
          onClick={() => {
            navigate("");
          }}
        >
          <Box>대시보드</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            navigate("");
          }}
        >
          <BsFileEarmarkText />
          <Box>학습 관리</Box>
        </HStack>
        <Divider color={dividerColor} />;
        <HStack
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#003C93",
          }}
          onClick={() => {
            navigate("lecture");
          }}
        >
          <Box>내 강의</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            navigate("lecture");
          }}
        >
          <BsPlayCircle />
          <Box>업로드한 강의</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            navigate("lecture/register");
          }}
        >
          <RiFolderUploadLine />
          <Box>강의 업로드</Box>
        </HStack>
        <Divider color={dividerColor} />;
        <HStack
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#003C93",
          }}
          onClick={() => {
            navigate("editMember");
          }}
        >
          <Box>회원정보 수정</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            navigate("editMember");
          }}
        >
          <FiSettings />
          <Box>정보 수정</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            navigate("");
          }}
        >
          <CgDanger size={16} />
          <Box>회원 탈퇴</Box>
        </HStack>
        <HStack pt="20">
          <Box>
            <Avatar bg="#CED4DA" icon={<RiHomeHeartLine size={35} />} />
          </Box>
          <Stack pl="2" spacing={0}>
            <Box fontSize="16">{data?.name}</Box>
            <Box fontSize="14" color="#707070">
              Instructor
            </Box>
          </Stack>
        </HStack>
      </Stack>
    </div>
  );
};

export default InstructorSideBar;
