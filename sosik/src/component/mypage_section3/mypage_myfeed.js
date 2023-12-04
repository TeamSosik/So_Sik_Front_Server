import "../../common/css/mypage_section3/myfeed.css";

const Myfeed = (props) => {
  return (
    <span className="myfeeddetail">
      <img className="feedimg" src={props.products.url} alt="" />
    </span>
  );
};
export default Myfeed;
