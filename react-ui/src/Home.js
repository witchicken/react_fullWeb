import React, { useState } from "react";
import "./Home.scss";

import { Link } from "react-router-dom";
import axios from "axios";
import { isEmpty } from "lodash";
function Home() {
  const [marriage_man, setMarriage_man] = useState("");
  const [marriage_woman, setMarriage_woman] = useState("");
  const [marriage_date, setMarriage_date] = useState("");
  const [description_location, setDescription_location] = useState("");
  const [phone_man, setPhone_man] = useState("");
  const [phone_woman, setPhone_woman] = useState("");
  const [message_invite, setMessage_invite] = useState("");
  const [man_account, setMan_account] = useState("");
  const [woman_account, setWoman_account] = useState("");
  const [isCheckedData, setIsCheckedData] = useState(false);

  const [idData, setIdData] = useState("");
  const [resIdData, setResIdData] = useState({});
  const [isResIdData, setIsResIdData] = useState(false);
  const checkDataBtn = () => {
    if (
      marriage_man !== "" &&
      marriage_woman !== "" &&
      marriage_date !== "" &&
      description_location !== "" &&
      phone_man !== "" &&
      phone_woman !== "" &&
      message_invite !== "" &&
      man_account !== "" &&
      woman_account !== ""
    ) {
      setIsCheckedData(true);
    } else {
      alert("위의 폼의 빈칸을 작성해주세요.");
    }
  };
  let data = {
    marriage_man,
    marriage_woman,
    marriage_date,
    description_location,
    phone_man,
    phone_woman,
    message_invite,
    man_account,
    woman_account,
  };
  const sendId = () => {
    const sendData = { idData: idData };
    axios({
      method: "post",
      url: "/api/loadidcard",
      data: sendData,
    })
      .then((response) => {
        if (isEmpty(response.data.data[0])) {
          console.log("empty");
          alert("ID가 일치하지 않습니다.");
        } else {
          setResIdData(response.data.data[0]);
          setIsResIdData(true);
        }
      })
      .catch((error) => {
        // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // node.js에서는 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <div className="Home">
      <div className="Home_inner">
        <h2>신청서 폼</h2>
        <p>*은 필수로 입력해주세요.</p>
        <div>
          <div>
            *신랑 이름:{" "}
            <input
              type="text"
              name="marriage_man"
              size="10"
              onChange={(e) => setMarriage_man(e.target.value)}
            />
          </div>
          <div>
            *신부 이름:{" "}
            <input
              type="text"
              name="marirage_woman"
              size="10"
              onChange={(e) => setMarriage_woman(e.target.value)}
            />
          </div>
          <div>
            메인 이미지: <input type="file" name="top_image" />
          </div>
          <div>
            *결혼 날짜{" "}
            <input
              type="date"
              name="marriage_date"
              onChange={(e) => {
                setMarriage_date(e.target.value);
                console.log(isCheckedData);
              }}
            />
          </div>
          <div>
            *결혼 장소(kakaomap 연동):{" "}
            <input
              type="text"
              name="description_location"
              onChange={(e) => setDescription_location(e.target.value)}
            />
          </div>
          <div>
            *신랑 전화번호:{" "}
            <input
              type="text"
              name="phone_man"
              size="20"
              onChange={(e) => setPhone_man(e.target.value)}
            />
          </div>
          <div>
            *신부 전화번호:{" "}
            <input
              type="text"
              name="phone_woman"
              size="20"
              onChange={(e) => setPhone_woman(e.target.value)}
            />
          </div>
          <div>
            *초대 메시지:{" "}
            <input
              type="text"
              name="message_invite"
              size="50"
              onChange={(e) => setMessage_invite(e.target.value)}
            />
          </div>

          <div>
            *신랑측 계좌번호:{" "}
            <input
              type="text"
              name="man_account"
              size="50"
              onChange={(e) => setMan_account(e.target.value)}
            />
          </div>
          <div>
            *신부측 계좌번호:{" "}
            <input
              type="text"
              name="woman_account"
              size="50"
              onChange={(e) => setWoman_account(e.target.value)}
            />
          </div>

          {isCheckedData ? (
            <div>
              <Link to={"/formview"} state={data}>
                <button>미리보기</button>
              </Link>
            </div>
          ) : (
            <div>
              <button onClick={checkDataBtn}>미리보기</button>
            </div>
          )}
          <div className="loadWithID">
            <h3> ID를통해 불러오기</h3>
            <input
              type="text"
              placeholder="ID보유중이시면 입력해주세요."
              onChange={(e) => setIdData(e.target.value)}
            />
            <button onClick={sendId}>불러오기</button>
            {isResIdData ? (
              <div>
                <p className="residData_p">{resIdData.marriage_man}</p>
                <p> 님 맞으시면 OK 버튼을 눌러주세요.</p>
                <Link to={"/formview"} state={resIdData}>
                  <button>OK</button>
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
