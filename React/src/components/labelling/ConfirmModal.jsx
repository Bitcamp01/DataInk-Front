import styled from 'styled-components';

// 모달 오버레이
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 콘텐츠
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

// 모달 버튼 컨테이너
const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  button {
    flex-grow: 1; /* 동일한 비율로 너비 차지 */
    margin: 0 10px; /* 버튼 사이 간격 */
  }
`;


// 개별 버튼
const Button = styled.button`
  padding: 0.625rem 1.25rem;
  min-width: 6.25rem;
  max-width: 8.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.confirm === 'true' ? '#7C97FE' : '#FD5B5B')};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;


const ConfirmModal = ({ message, isConfirmed, onConfirm, onClose}) => {
  // 모달 외부를 클릭했을 때 모달을 닫는 함수
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContent>
            <p>{message}</p>
            <ModalActions>
              {isConfirmed ? (
                <Button confirm="true" onClick={onClose}>확인</Button>  // 확인 버튼만 표시
              ) : (
                <>
                  <Button confirm="true" onClick={onConfirm}>예</Button>
                  <Button confirm="false" onClick={onClose}>아니오</Button>
                </>
              )}
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
    );
};

export default ConfirmModal;
