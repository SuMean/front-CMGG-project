import React, { useState, useEffect } from "react";
import css from "./Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { isLoggedInVar } from "../../services/apollo";
import { getAccessToken, getRefreshToken } from "../../services/Token";
import { userNameLogin } from "../../services/api";
import { postRefreshToken } from "../../services/api";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import SocialLogin from "../SocialLogin/SocialLogin";
import Cookies from "js-cookie";
import ModalBasic from "../../components/Modal/ModalBasic";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms";
type FormData = {
  username: string;
  password: string;
  headers: string;
};

const Login: React.FC = () => {
  const [successLogin, setSuccessLogin] = useState<boolean | null>(null);
  const { colorMode } = useColorMode();
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const mutation = useMutation(userNameLogin, {
    onMutate: () => {
      console.log("mutation start...");
    },
    onSuccess: () => {
      console.log("API CALL success...");
      setSuccessLogin(true);
      isLoggedInVar(true);
      setUser(user);

      navigate("/");
      window.location.reload();
    },
    onError: (e: Error) => {
      setSuccessLogin(false);
      console.log(e);
      console.log("API CALL error...");
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      isLoggedInVar(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = ({ username, password }) => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const isLoggedIn = isLoggedInVar();

      const headers =
        isLoggedIn && refreshToken
          ? {
              Authorization: `Bearer ${accessToken}`,
              "X-Refresh-Token": refreshToken,
            }
          : undefined;

      mutation.mutate({ username, password, headers });
    } catch (error) {
      console.error("login error", error);
    }
  };

  return (
    <>
      <div className={css.Container}>
        <div className={css.Wrapper}>
          <div className={css.TopBox}>
            <div className={css.Logo}>
              <img src="/images/CGLOGO.png" alt="logo" width="200" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={css.Form}>
              <div>
                <input
                  className={
                    colorMode === "light" ? css.IdPassword : css.DarkIdPassword
                  }
                  placeholder="아이디"
                  type="text"
                  {...register("username", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.username && errors.username.type === "required" && (
                  <p>아이디를 입력하세요!</p>
                )}
                {errors.username && errors.username.type === "maxLength" && (
                  <p>20자 이하로 입력하세요!</p>
                )}
              </div>
              <div>
                <input
                  className={
                    colorMode === "light" ? css.IdPassword : css.DarkIdPassword
                  }
                  placeholder="비밀번호"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p>비밀번호를 입력하세요!</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p>6자 이상 20자 이하로 입력하세요.</p>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                  <p>6자 이상 20자 이하로 입력하세요.</p>
                )}
              </div>
              <Button
                backgroundColor="#003c93"
                type="submit"
                value="로그인"
                _hover={{
                  bg: "#012f70",
                }}
                className={css.Button}
                isLoading={mutation.isLoading}
              >
                로그인
              </Button>
              {/* <HStack
                fontSize={"sm"}
                pt={3}
                pl={3}
                w={"100%"}
                justifyContent={"center"}
              >
                <Link to={"/find/id"}>아이디 찾기</Link>
                <Text>|</Text>
                <Link to={"/find/password"}>비밀번호 찾기</Link>
              </HStack> */}
            </form>
            <SocialLogin />
          </div>
        </div>
        {successLogin != null && !successLogin ? (
          <ModalBasic
            isOpen={!successLogin}
            successContent={"아이디랑 비밀번호를 확인해주세요"}
            onClose={() => setSuccessLogin(true)}
          />
        ) : null}
      </div>
    </>
  );
};
export default Login;
