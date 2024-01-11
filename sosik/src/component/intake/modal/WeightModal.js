import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WeightModal({ handleCloseModal }) {
    const handleSave = () => {
        // TODO: 여기에 데이터 저장 로직 추가

        // 데이터 저장 후 모달 닫기
        handleCloseModal();
    };

    return (
        <div className='weight-modal'>
            <Modal
                show={true}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered  // 중앙 정렬
            >
                <Modal.Header closeButton>
                    <Modal.Title>나의 체중 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* 체중 수정 폼 등을 추가 */}
                    <form>
                        {/* 예시: 체중 입력 필드 */}
                        <label htmlFor="weightInput">체중 입력</label>
                        <input type="text" id="weightInput" name="weight" />

                        {/* 기타 필요한 입력 필드 추가 */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleSave}>저장</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default WeightModal;