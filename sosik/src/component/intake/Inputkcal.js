import Inputkcalcard from "./inputkcal/Inputkcalcard.js";
import Inputkcalimg from "./inputkcal/Inputkcalimg.js";

function Inputkcal({ props }) {
  return (
    <div>
      {!props ? (
        <div className="a">
          <Inputkcalimg />
        </div>
      ) : (
        <div className="a">
          <Inputkcalimg />
          <Inputkcalcard />
        </div>
      )}
    </div>
  );
}

export default Inputkcal;
