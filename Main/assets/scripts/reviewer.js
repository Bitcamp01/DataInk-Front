// PDF.js의 워커 경로 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// PDF 파일 경로 (로컬 파일의 경우, CORS 문제를 피하려면 로컬 서버를 사용해야 합니다.)
const url = 'C:/Users/tlma/Documents/IMG_20240214_0001.pdf';

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
        page.render(renderContext).then(() => {
            // 페이지가 렌더링 된 후 클릭 이벤트 추가
            canvas.addEventListener('click', (event) => {
                const x = event.offsetX;
                const y = event.offsetY;

                // 클릭한 위치의 텍스트 추출
                page.getTextContent().then(textContent => {
                    const textItems = textContent.items;
                    let text = '';
                    for (let i = 0; i < textItems.length; i++) {
                        const item = textItems[i];
                        // 각 텍스트 아이템의 위치와 크기를 사용하여 클릭 위치와 비교
                        if (item.transform[4] <= x && x <= item.transform[4] + item.width &&
                            item.transform[5] - item.height <= y && y <= item.transform[5]) {
                            text += item.str + ' ';
                        }
                    }
                    console.log('Extracted text:', text);
                    alert(`클릭한 위치의 텍스트: ${text}`);
                });
            });
        });
    }).catch(err => {
        console.error('페이지 로드 중 오류 발생:', err);
    });
}, reason => {
    console.error('PDF 파일을 가져오는 중 오류 발생:', reason);

    // CORS 문제일 수 있으므로 사용자에게 안내 메시지 출력
    if (reason.message.includes('Failed to fetch')) {
        alert('PDF 파일을 가져오는 데 실패했습니다. CORS 정책으로 인해 파일을 불러올 수 없습니다.');
    }
});
