import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { HeaderContext } from '../../../common/header/Header.js';

const RedirectionKakao = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const {setlogout} = useContext(HeaderContext);

//인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      console.log("hello")
      await axios({
        
        method: "GET",
        url: `http://localhost:5056/oauth/kakao/token?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
          "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
        },
      }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        console.log(res.data.info.kakao_account.email);
        console.log(res.data.info.kakao_account.profile.nickname);
        console.log(res.data.info.kakao_account.profile.profile_image_url);
        //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
        //로그인이 성공하면 이동할 페이지
      
        const member = {  
          email: res.data.info.kakao_account.email,
          nickname: res.data.info.kakao_account.profile.nickname,
          profileImage: res.data.info.kakao_account.profile.profile_image_url
        }
        
      
        console.log(member)
        window.localStorage.setItem("accesstoken",JSON.stringify(res.data.token.access_token));
        window.localStorage.setItem("refreshtoken",JSON.stringify(res.data.token.refresh_token));
        window.localStorage.setItem("member",JSON.stringify(member));
        alert("정상적으로 로그인 처리 되었습니다.")
        setlogout(false);
        navigate("/mainpage");
      });
    };
    kakaoLogin();
  }, [props.history]);

  return (
    <div className="LoginHandeler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default RedirectionKakao;