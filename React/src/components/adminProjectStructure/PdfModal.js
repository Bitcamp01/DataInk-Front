import React, { useEffect, useState } from 'react';

import { Dialog, DialogTitle, DialogContent, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;


function PdfModal({ open, onClose, pdfUrl }) {
    const [pdf, setPdf] = useState(null);
    const [page, setPage] = useState(null);

    useEffect(() => {
        if (pdfUrl && open) {
            const loadPdf = async () => {
                try {
                    const proxiedPdfUrl = `/pdf/${encodeURIComponent(pdfUrl)}`;
                    console.log(proxiedPdfUrl)
                    const loadingTask = pdfjsLib.getDocument(proxiedPdfUrl);
                    const loadedPdf = await loadingTask.promise;
                    setPdf(loadedPdf);

                    const firstPage = await loadedPdf.getPage(1);
                    setPage(firstPage);
                } catch (error) {
                    console.error('Error loading PDF:', error);
                }
            };

            loadPdf();
        }
    }, [pdfUrl, open]);

    useEffect(() => {
        if (page) {
            renderPage(page);
        }
    }, [page]);

    const renderPage = (page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        page.render(renderContext);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                PDF 미리 보기
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {pdf && page ? (
                    <canvas id="pdf-canvas"></canvas>
                ) : (
                    <CircularProgress />
                )}
            </DialogContent>
        </Dialog>
    );
}

export default PdfModal;
