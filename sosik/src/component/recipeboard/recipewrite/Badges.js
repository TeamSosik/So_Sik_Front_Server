import Badge from 'react-bootstrap/Badge';
import '../../../common/css/recipecss/recipewrite/badges.css';

function Badges() {
  return (
    <div className='badgetitle'>
      <div className='badge-container'>
        <Badge pill text="dark" className='badge'>
          요리해요
        </Badge>
        <p className='title'>글쓰기</p>
      </div>
    </div>
  );
}

export default Badges;