import { useState, useEffect } from "react";
import axios from "axios";
import style from "./ParticipationInfo.module.css";
import Image from "next/image";
import FllyDetailModal from "../modal/FllyDetailModal";

type ParticipationFormProps = {
  chattingId: number;
  modalHandler: Function;
};
type Participation = {
  fllyId: number;
  buyerNickname: string;
  offerPrice: number;
  content: string;
  imageUrl: string;
};

const ParticipationForm: React.FC<ParticipationFormProps> = ({ chattingId, modalHandler }) => {
  const [participationInfo, setParticipationInfo] = useState<Participation | null>(null);
  const [detailOpened, setDetailOpened] = useState(false);
  // axios로 fllyInfo 불러오기
  useEffect(() => {
    axios.get(`https://flower-ly.co.kr/api/chatting/flly/${chattingId}`).then((response) => {
      setParticipationInfo(response.data.data);
    });
  }, []);

  return (
    <>
      <div className={style.mainBox}>
        <div className={style.top}>
          <span id={style.nickname}>{participationInfo?.buyerNickname}</span> 님이
          <br />
          해당 상품에 관심을 가지고 있습니다.
        </div>
        <div className={style.middle}>
          <div
            className={style.imgDiv}
            style={{ backgroundImage: `url(${"/test/test-flower-img.png"})` }}
          ></div>
          <div className={style.contentDiv}>
            <div className={style.contentItem} id={style.price}>
              <Image
                className={style.icon}
                src="/img/icon/seller-money.png"
                width={14}
                height={14}
                alt="상태이미지"
              />
              <div id={style.price}>
                {participationInfo && participationInfo.offerPrice.toLocaleString()} 원
              </div>
            </div>
            <div className={style.contentItem} id={style.comment}>
              <div>{participationInfo && participationInfo.content}</div>
            </div>
          </div>
        </div>
        <div className={style.bottom}>
          <button
            className={style.btn}
            onClick={() => modalHandler("FLLY", true, participationInfo?.fllyId)}
          >
            자세히 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default ParticipationForm;
