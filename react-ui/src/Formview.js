import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Formview.scss";
import {
  faPhone,
  faSquareEnvelope,
  faHeart,
  faBars,
  faPencil,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import moment from "moment";
import "./Calendar.css";
import axios from "axios";
import { Link } from "react-router-dom";

//copy npm
import { CopyToClipboard } from "react-copy-to-clipboard";
//kakao map
const { kakao } = window;

function Formview() {
  const location = useLocation();
  const inputData = location.state;

  let data = {
    marriage_man: inputData.marriage_man,
    marriage_woman: inputData.marriage_woman,
    marriage_date: inputData.marriage_date,
    message_invite: inputData.message_invite,
    description_location: inputData.description_location,
    phone_man: inputData.phone_man,
    phone_woman: inputData.phone_woman,
    man_account: inputData.man_account,
    woman_account: inputData.woman_account,
  };
  const splitDate = data.marriage_date.split("-");

  const [calData, setCalData] = useState(
    new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
  );

  let interval;
  let eventDay = moment(data.marriage_date);
  //console.log(eventDay);

  // Convert to milisecond
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const [gapMarriageDateDay, setGapMarriageDateDay] = useState(0);
  const [gapMarriageDateHours, setGapMarriageDateHours] = useState(0);
  const [gapMarriageDateMinutes, setGapMarriageDateMinutes] = useState(0);
  const [gapMarriageDateSeconds, setGapMarriageDateSeconds] = useState(0);

  const countDownFn = () => {
    const today = moment();

    //const timeSpan = eventDay.diff(today);
    const timeSpan = eventDay.diff(today);

    if (timeSpan <= -today) {
      clearInterval(interval);
      return;
    } else if (timeSpan <= 0) {
      clearInterval(interval);
      return;
    } else {
      const days = Math.floor(timeSpan / day);
      const hours = Math.floor((timeSpan % day) / hour);
      const minutes = Math.floor((timeSpan % hour) / minute);
      const seconds = Math.floor((timeSpan % minute) / second);

      //set results
      setGapMarriageDateDay(days);
      setGapMarriageDateHours(hours);
      setGapMarriageDateMinutes(minutes);
      setGapMarriageDateSeconds(seconds);
    }
  };
  useEffect(() => {
    countDownFn();
  }, []);
  interval = setInterval(countDownFn, hour);

  //카카오맵

  //처음 지도 그리기
  useEffect(() => {
    //주소로 검색
    //var url = `https://dapi.kakao.com/v2/local/search/address.json?query=${testAddress}`;
    //키워드로 장소 검색
    var url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${data.description_location}`;
    const api_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    let dataX = 0;
    let dataY = 0;
    axios
      .get(url, {
        headers: { Authorization: `KakaoAK ${api_KEY}` },
      })
      .then(function (response) {
        dataX = response.data.documents[0].x;
        dataY = response.data.documents[0].y;
      })
      .then(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(dataY, dataX),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        let markerPosition = new kakao.maps.LatLng(dataY, dataX);
        let marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        //const kakaoMap = new kakao.maps.Map(container, options);
        //setMap(kakaoMap);
      });
    //
  }, []);
  //db에 data보내기
  const [resData, setResData] = useState("");
  const sendData = () => {
    const datenow = Date.now();
    axios({
      method: "post",
      url: "/api/marriageform",
      data: [data, datenow],
    })
      .then((response) => {
        console.log(response.data.data);
        setResData(response.data.data);
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
    setIsResData(true);
  };

  //조건부 렌더링
  const [isResData, setIsResData] = useState(false);
  function HideID(props) {
    return <p>ID키를 발급받으시려면 저장하기 버튼을 눌러주세요.</p>;
  }
  function ShowID(props) {
    return (
      <>
        <CopyToClipboard text={resData} onCopy={() => alert("복사하였습니다.")}>
          <span>{resData}</span>
        </CopyToClipboard>
        <p>
          위의 ID번호를 눌러 복사후 저장해주세요.
          <p>ID번호는 불러오기시 사용됩니다.</p>
        </p>
      </>
    );
  }
  function IDcard(props) {
    const test222 = props.test222;
    if (test222 === false) {
      return <HideID />;
    }
    return <ShowID />;
  }
  return (
    <div className="Formview">
      <main className="inner">
        <section className="Top">
          <div className="Top_name">
            <p>
              {data.marriage_man} & {data.marriage_woman}
            </p>
          </div>
          <div className="Top_image">image샘플</div>
          <div className="Top_location">
            <p>{data.marriage_date}</p>
            <span>{data.description_location}</span>
          </div>
          <div className="Top_phone">
            <p>
              <span>{data.marriage_man}</span>
              <div>
                <a href={"tel:" + data.phone_man} className="link_phone">
                  <FontAwesomeIcon icon={faPhone} color="green" />
                </a>
                <a href={"sms://" + data.phone_man}>
                  <FontAwesomeIcon icon={faSquareEnvelope} />
                </a>
              </div>
            </p>
            <p>
              <span>{data.marriage_woman}</span>
              <div>
                <a href={"tel:" + data.phone_woman} className="link_phone">
                  <FontAwesomeIcon icon={faPhone} color="green" />
                </a>
                <a href={"sms://" + data.phone_woman}>
                  <FontAwesomeIcon icon={faSquareEnvelope} />
                </a>
              </div>
            </p>
          </div>
        </section>
        <section className="middle">
          <div className="middle_invi">
            <p className="invi_title">invitation</p>
            <p claasName="invi_message">{data.message_invite}</p>
          </div>
          <div className="middle_calendar">
            <Calendar onChange={setCalData} value={calData} />
          </div>
          <div className="middle_countdown">
            {data.marriage_man}
            <FontAwesomeIcon icon={faHeart} color="pink" />
            {data.marriage_woman}
            님의 결혼식 <span>{gapMarriageDateDay}</span>일{" "}
            <span>{gapMarriageDateHours}</span>시간 전
          </div>
          <div className="middle_location">
            <h2>location</h2>
            <div
              id="map"
              style={{
                width: "350px",
                height: "300px",
                margin: "0 auto",
                marginTop: "30px",
                cursor: "grap",
              }}
            ></div>
            <p>{data.description_location}</p>
          </div>
          <div className="middle_account">
            <h2>Account</h2>
            <div>
              <p>신랑측 계좌번호</p>
              <div className="middle_account_number">
                <span>{data.man_account}</span>
                <span>{data.marriage_man}</span>
              </div>
            </div>
            <div>
              <p>신부측 계좌번호</p>
              <div className="middle_account_number">
                <span>{data.woman_account}</span>
                <span>{data.marriage_woman}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="bottom">
          <div className="bottom_guestbook">
            <h2>Guestbook</h2>
            <div className="guestbook_contents">내용</div>
            <div className="guestbook_db">
              <button>
                <FontAwesomeIcon icon={faBars} />
                전체보기
              </button>
              <button>
                <FontAwesomeIcon icon={faPencil} />
                작성하기
              </button>
            </div>
          </div>
          <div className="bottom_visitok">
            <h2>Attend</h2>
            <p>결혼식 참석 여부를 체크해주세요.</p>
            <button>
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>참석 여부 체크하기</span>
            </button>
          </div>
          <div className="bottom_submit">
            <button onClick={sendData}>저장하기</button>
          </div>
          <div className="bottom_response">
            <IDcard test222={isResData} />
          </div>
          <div>
            <Link to="/">
              <button
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "pink",
                  cursor: "pointer",
                }}
              >
                Home
              </button>
            </Link>
          </div>
          <footer className="bottom_footer">
            <p>witchicken</p>
            <p>Copyright © 2022 witchicken 모든 권리 보유.</p>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Formview;
