import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  Text,
  RadioGroup,
  Radio,
  HStack,
  Button,
  Input,
  List,
  ListItem,
  Box,
  Image as ChakraImg,
} from "@chakra-ui/react";

import css from "./LectureRegister.module.scss";
import { FieldValues, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useDidMountEffect } from "../../../hooks/useDidMountEffect";
import { imgTypes, videoTypes } from "../../../constant";
import { getSecureImgFile } from "../../../utils/getSecureImgFile";
import { createVideoThumbnail } from "../../../utils/createVideoThumbnail";

function LectureRegister(): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const {
    acceptedFiles: videoFiles,
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
  } = useDropzone({
    accept: { "video/*": videoTypes },
    onDrop: (acceptedFiles: File[]) => {
      const isRightType = acceptedFiles
        .map((file: File) => file.type.replace("video/", ""))
        .some((elem) => videoTypes.includes(elem));
      if (!isRightType) {
        alert(
          "비디오 파일만 등록이 가능합니다! \n(mp4, mov, wmv, avi, mkv, webm)"
        );
      }
    },
  });

  const {
    acceptedFiles: imgFile,
    getRootProps: getImgRootProps,
    getInputProps: getImgInputProps,
  } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": imgTypes },
    onDrop: (acceptedFiles: File[]) => {
      const isRightType = acceptedFiles
        .map((file: File) => file.type.replace("image/", ""))
        .some((elem) => imgTypes.includes(elem));
      if (!isRightType || acceptedFiles.length > 1) {
        alert("이미지 파일 하나만 등록이 가능합니다! \n(jpg, png, jpeg, webp)");
      }
    },
  });

  const [_img, setImg] = useState<string>("");
  const [_videos, setVideos] = useState<string[]>([]);

  const onSubmit = (formData: FieldValues) => {
    console.log("formData", formData);

    // create image url => new Image(img,url) => imgUrl
    // create video url => new Video(video,url) => videoUrl

    // process data
    // post
  };

  async function handleVideoChange() {
    const newVideos = await Promise.all(videoFiles.map(createVideoThumbnail));
    setVideos(newVideos);
  }

  const img = imgFile.map((file: File, idx: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(getSecureImgFile(reader.result));
    };
    reader.readAsDataURL(file);
    return (
      <HStack alignItems={"flex-start"} key={idx}>
        <ChakraImg w="50%" src={_img} />
        <Text>
          {file.name} - {file.size} bytes
        </Text>
      </HStack>
    );
  });

  const videos = videoFiles.map((file: File, idx: number) => {
    return (
      <Box mb="3" w="50%" key={idx}>
        <Text>
          {file.name} - {file.size} bytes
        </Text>
        <Input
          placeholder="제목을 입력해주세요"
          className={css.Input}
          mt="4"
          mb="1"
          type="text"
          {...register(`videoTitle[${idx}]`, { required: true })}
        />
        <Input
          placeholder="설명을 입력해주세요"
          className={css.Input}
          type="text"
          {...register(`videoDescription[${idx}]`, { required: true })}
        />
      </Box>
    );
  });

  useDidMountEffect(() => {
    handleVideoChange();
  }, [videoFiles]);

  return (
    <VStack alignItems={"flex-start"} ml="10">
      <Text fontWeight={"bold"} fontSize={"35px"} mb="10">
        강의 등록하기
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "500px" }}>
        <FormControl
          isInvalid={!!errors["lectureTitle"]}
          id={"lectureTitle"}
          mb="5"
        >
          <FormLabel fontWeight={"bold"} id="lectureTitle">
            강의명
          </FormLabel>
          <input
            type="text"
            className={css.Input}
            aria-labelledby="lectureTitle"
            placeholder="강의명을 입력해주세요"
            {...register("lectureTitle", { required: true })}
          />
          <FormErrorMessage>{`${"강의명"}을 입력해주세요`}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors["lectureFee"]}
          id={"lectureFee"}
          my="5"
        >
          <FormLabel fontWeight={"bold"} id={"lectureFee"}>
            가격
          </FormLabel>
          <input
            type="number"
            className={css.Input}
            aria-labelledby="lectureFee"
            placeholder="가격을 입력해주세요"
            {...register("lectureFee", { required: true })}
          />
          <FormErrorMessage>{`${"가격"}을 입력해주세요`}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors["lectureDescription"]}
          id={"lectureDescription"}
          my="5"
        >
          <FormLabel fontWeight={"bold"} id={"lectureDescription"}>
            설명
          </FormLabel>
          <input
            type="text"
            className={css.Input}
            aria-labelledby="lectureDescription"
            placeholder="설명을 입력해주세요"
            {...register("lectureDescription", { required: true })}
          />
          <FormErrorMessage>{`${"설명"}을 입력해주세요`}</FormErrorMessage>
        </FormControl>
        <Divider my="5" mt="10" />
        <FormControl
          isInvalid={!!errors["lectureImg"]}
          id={"lectureImg"}
          my="8"
        >
          <FormLabel fontWeight={"bold"} id={"lectureImg"}>
            대표 이미지 올리기
          </FormLabel>
          <VStack
            backgroundColor={"#fafafa"}
            border="1px dashed gray"
            cursor="pointer"
            p="10"
            {...getImgRootProps({ className: "dropzone" })}
          >
            <input {...getImgInputProps()} aria-labelledby="lectureImg" />
            <p style={{ color: "#777" }}>
              이미지는 클릭 또는 드래그해서 올려주세요 <br />
              (jpg, png, jpeg, webp)
            </p>
          </VStack>
          <aside>
            <Text fontWeight={"bold"} mt="6" mb="2">
              이미지파일
            </Text>
            {img}
          </aside>
          <FormErrorMessage>{`${"이미지"}를 등록해주세요`}</FormErrorMessage>
        </FormControl>
        <Divider my="5" />
        <FormControl
          isInvalid={!!errors["lectureVideos"]}
          id={"lectureVideos"}
          my="8"
        >
          <FormLabel fontWeight={"bold"} id={"lectureVideos"}>
            영상 올리기
          </FormLabel>
          <VStack
            backgroundColor={"#fafafa"}
            border="1px dashed gray"
            cursor="pointer"
            p="10"
            {...getVideoRootProps({ className: "dropzone" })}
          >
            <input {...getVideoInputProps()} aria-labelledby="lectureVideos" />
            <p style={{ color: "#777" }}>
              영상은 클릭 또는 드래그해서 올려주세요 <br /> (mp4, mov, wmv, avi,
              mkv, webm)
            </p>
          </VStack>
          <aside>
            <Text fontWeight={"bold"} mt="6">
              영상파일 ({videoFiles?.length})
            </Text>
            <List>
              {videos.map((item, idx) => {
                return (
                  <ListItem key={idx} mt="6">
                    <HStack w="100%" spacing={6}>
                      {item}
                      <ChakraImg
                        w="200px"
                        h="150px"
                        src={_videos[idx]}
                        border="1px solid gray"
                      />
                    </HStack>
                  </ListItem>
                );
              })}
            </List>
          </aside>
          <FormErrorMessage>{`${"영상"}을 등록해주세요`}</FormErrorMessage>
        </FormControl>
        <Divider my="5" />
        <FormControl
          isInvalid={!!errors["targetAudience"]}
          id={"targetAudience"}
          w="100%"
          my="7"
        >
          <FormLabel fontWeight={"bold"} id={"targetAudience"}>
            목적
          </FormLabel>
          <RadioGroup
            display={"flex"}
            pl="5"
            name="targetAudience"
            aria-labelledby="targetAudience"
          >
            <Radio
              width={`calc(100% / 3)`}
              borderColor={"blackAlpha.600"}
              value="theory"
              {...register("targetAudience", { required: true })}
            >
              이론
            </Radio>
            <Radio
              width={`calc(100% / 3)`}
              borderColor={"blackAlpha.600"}
              ml="2"
              value="training"
              {...register("targetAudience", { required: true })}
            >
              실습
            </Radio>
          </RadioGroup>
          <FormErrorMessage>{`${"목적"}을 입력해주세요`}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors["lectureDifficulty"]}
          id={"lectureDifficulty"}
          my="7"
        >
          <FormLabel fontWeight={"bold"} id={"lectureDifficulty"}>
            난이도
          </FormLabel>
          <RadioGroup
            display={"flex"}
            pl="5"
            name="lectureDifficulty"
            aria-labelledby="lectureDifficulty"
          >
            <Radio
              width={`calc(100% / 3)`}
              borderColor={"blackAlpha.600"}
              value="upper"
              {...register("lectureDifficulty", { required: true })}
            >
              상
            </Radio>
            <Radio
              width={`calc(100% / 3)`}
              borderColor={"blackAlpha.600"}
              value="middle"
              ml="2"
              {...register("lectureDifficulty", { required: true })}
            >
              중
            </Radio>
            <Radio
              width={`calc(100% / 3)`}
              borderColor={"blackAlpha.600"}
              value="lower"
              ml="2"
              {...register("lectureDifficulty", { required: true })}
            >
              하
            </Radio>
          </RadioGroup>
          <FormErrorMessage>{`${"난이도"}를 선택해주세요`}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors["categories"]}
          id={"categories"}
          my="7"
        >
          <FormLabel fontWeight={"bold"} aria-labelledby="categories">
            카테고리
          </FormLabel>
          <RadioGroup display={"flex"} pl="5" name="categories">
            <VStack w="100%" alignItems={"flex-start"}>
              <HStack w="100%" my="3">
                <Radio
                  width={`calc(100% / 3)`}
                  borderColor={"blackAlpha.600"}
                  value="html"
                  {...register("categories", { required: true })}
                >
                  HTML
                </Radio>
                <Radio
                  width={`calc(100% / 3)`}
                  borderColor={"blackAlpha.600"}
                  value="css"
                  ml="2"
                  {...register("categories", { required: true })}
                >
                  CSS
                </Radio>
                <Radio
                  width={`calc(100% / 3)`}
                  borderColor={"blackAlpha.600"}
                  value="react"
                  ml="2"
                  {...register("categories", { required: true })}
                >
                  REACT
                </Radio>
                <Radio
                  width={`calc(100% / 3)`}
                  borderColor={"blackAlpha.600"}
                  value="vue"
                  ml="2"
                  {...register("categories", { required: true })}
                >
                  VUE
                </Radio>
              </HStack>
              <HStack w="100%">
                <Radio
                  width={`calc(100% / 3)`}
                  borderColor={"blackAlpha.600"}
                  value="spring"
                  {...register("categories", { required: true })}
                >
                  SPRING
                </Radio>
                <Radio
                  width={`calc(100% / 3)`}
                  borderColor={"blackAlpha.600"}
                  value="django"
                  ml="2"
                  {...register("categories", { required: true })}
                >
                  DJANGO
                </Radio>
                <Radio
                  width={`calc(100% / 3)`}
                  borderColor={"blackAlpha.600"}
                  value="swift"
                  ml="2"
                  {...register("categories", { required: true })}
                >
                  SWIFT
                </Radio>
                <Radio
                  width={`calc(100% / 3)`}
                  borderColor={"blackAlpha.600"}
                  value="android"
                  ml="2"
                  {...register("categories", { required: true })}
                >
                  ANDROID
                </Radio>
              </HStack>
            </VStack>
          </RadioGroup>
          <FormErrorMessage>{`${"카테고리"}를 선택해주세요`}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="facebook" w="500px">
          등록하기
        </Button>
      </form>
    </VStack>
  );
}

export default LectureRegister;
