import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { HeaderContext } from '../../../common/header/Header.js';
import { faL } from "@fortawesome/free-solid-svg-icons";

const RedirectionKakao = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const {setlogout} = useContext(HeaderContext);

//인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        url: `http://43.200.224.252:5056/oauth/kakao/token?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
          "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
        },
      }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면     
        const memberId = res.data.member.memberId
        const member = {  
          email: res.data.info.kakao_account.email,
          nickname: res.data.info.kakao_account.profile.nickname,
          profileImage: res.data.info.kakao_account.profile.profile_image_url,
          memberId: memberId,
          isEnrolled : res.data.isEnrolled,
          weightList : res.data.weightList
        }
        
        window.sessionStorage.setItem("accesstoken",JSON.stringify(res.data.accessToken));
        window.sessionStorage.setItem("refreshtoken",JSON.stringify(res.data.refreshToken));
        window.sessionStorage.setItem("member",JSON.stringify(member));

        if(res.data.isEnrolled === false){
          alert("가입을 마무리 해주세요!")
          navigate("/snsInfo");
        }
        else{
          setlogout(false);
          const customHeader = {
            authorization: window.sessionStorage.getItem("accesstoken"),
            refreshToken: window.sessionStorage.getItem("refreshtoken"),
            memberId: memberId
          };

          axios.get("http://43.200.224.252:5056/members/v1/detail", {
            headers: customHeader,
          })

          .then(function (res) {
            window.sessionStorage.setItem("member",JSON.stringify(res.data));
            alert(`환영합니다. ${member.nickname}님`);
            navigate("/"); //리다이렉트
          })
          
          .catch (function(error) {
            alert("에러가 발생했습니다!")
          });
        }
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