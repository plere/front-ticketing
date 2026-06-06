export const overlayStyle: React.CSSProperties = {
  // 화면 전체를 덮도록 고정
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // 60% 불투명도의 검은색
  zIndex: 9999, // 최상단 배치
  
  // 내부 요소를 정중앙에 배치하는 핵심 속성
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const modalBoxStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  
  // 가로세로 적당한 크기 및 반응형 설정
  width: '90%',           // 모바일에서는 화면의 90% 차지
  maxWidth: '500px',      // PC에서는 최대 500px까지만 커짐
  maxHeight: '80vh',      // 화면 높이의 80%를 넘지 않음
  display: 'flex',
  flexDirection: 'column',
  
  // 모달이 나타날 때 살짝 튀어오르는 듯한 애니메이션 효과
  transform: 'translateY(-20px)',
  animation: 'slideDown 0.3s forwards',
};

export const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: '1px solid #eeeeee',
};

export const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.25rem',
  color: '#333333',
};

export const closeBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  color: '#888888',
  cursor: 'pointer',
  padding: 0,
};

export const contentStyle: React.CSSProperties = {
  padding: '24px',
  overflowY: 'auto', // 내용이 길어지면 내부에서 스크롤 생성
};