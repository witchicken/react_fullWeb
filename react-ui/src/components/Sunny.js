import "./css/Sunny.scss";
import { ReactComponent as Man } from "../svg/man.svg";
import { ReactComponent as Sun } from "../svg/sun.svg";
import { ReactComponent as Grass } from "../svg/grass.svg";
import { ReactComponent as WateringCan } from "../svg/wateringCan.svg";
import { ReactComponent as Flower } from "../svg/flower.svg";
import { ReactComponent as Tree } from "../svg/tree.svg";
import { ReactComponent as Water } from "../svg/water.svg";

function Sunny() {
  return (
    <div className="SunnyCompo">
      <div className="innerCircle">
        <Man width="110" height="110" />
      </div>
      <div className="sunnyContainer">
        <Sun className="sun" width="200" height="200 " fill="white" />
        <div className="grassContainer">
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
          <Grass />
        </div>
        <WateringCan className="wateringcan" width="200" height="200" />
        <Tree className="tree" width="300" height="300" />
        <Flower className="flower flw1" width="100" height="100" />
        <Flower className="flower flw2" width="100" height="100" />
        <Flower className="flower flw3" width="100" height="100" />

        <Water className="water water1" width="30" height="30" fill="blue" />
        <Water className="water water2" width="30" height="30" fill="blue" />
        <Water className="water water3" width="30" height="30" fill="blue" />
        <Water className="water water4" width="30" height="30" fill="blue" />
        <Water className="water water5" width="30" height="30" fill="blue" />
        <Water className="water water6" width="30" height="30" fill="blue" />
      </div>
    </div>
  );
}

export default Sunny;
