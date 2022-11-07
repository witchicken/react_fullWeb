import "./css/Night.scss";
import { ReactComponent as Man } from "../svg/man.svg";
function Night() {
  return (
    <div className="NightCompo">
      <div className="innerCircle">
        <Man width="110" height="110" />
      </div>
    </div>
  );
}

export default Night;
