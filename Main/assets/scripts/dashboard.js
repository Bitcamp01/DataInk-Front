const cardContainer = document.getElementById('card-container'); // 첫 번째 요소에 접근

// 카드 데이터를 동적으로 추가하는 함수
function addCards() {
    // 4개의 카드를 추가
    for (let i = 0; i < 4; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = `카드 내용 ${i + 1}`;
        cardContainer.appendChild(card);
    }
}

// 초기 카드 추가
addCards();
addCards();
addCards(); 
addCards();
addCards();
addCards(); 

