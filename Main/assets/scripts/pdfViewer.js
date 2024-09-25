const url = 'https://karf.or.kr/wp-content/uploads/2022/03/Download_Sample.pdf'; // PDF 파일 경로

        // PDF.js 초기화
const loadingTask = pdfjsLib.getDocument(url);
    
    loadingTask.promise.then(pdf => {
        console.log('PDF loaded');

            // 첫 번째 페이지 가져오기
        pdf.getPage(1).then(page => {
            console.log('Page loaded');

            const scale = 1.5;
            const viewport = page.getViewport({ scale });

                // Canvas 설정
            const canvas = document.getElementById('pdf-canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

                // 페이지 렌더링
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }, reason => {
        console.error(reason);
    });

    // 모든 테이블 셀을 선택
const tableCells = document.querySelectorAll('.table td');

// 각 셀에 클릭 이벤트 리스너를 추가
tableCells.forEach(cell => {
    cell.addEventListener('click', function() {
        // 이미 'active' 클래스가 있으면 제거하고, 없으면 추가
        this.classList.toggle('active');
    });
});
