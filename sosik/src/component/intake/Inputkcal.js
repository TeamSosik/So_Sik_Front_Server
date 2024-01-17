import Inputkcalcard from "./inputkcal/Inputkcalcard.js";

function Inputkcal({ props }) {
  console.log(props);
  return (
    <div>
      <div className="a">
        <Inputkcalcard props={props} />
      </div>
    </div>
  );
}

export default Inputkcal;
