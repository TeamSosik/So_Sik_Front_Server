import Inputkcalcard from "./inputkcal/Inputkcalcard.js";
import "../intake/inputkcal/inputkcal.css";
function Inputkcal(props) {
  return (
    <div className="targetKcalposition">
      <Inputkcalcard props={props} />
    </div>
  );
}

export default Inputkcal;
