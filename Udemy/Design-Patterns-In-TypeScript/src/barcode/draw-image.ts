import * as pdf from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

export class PdfWithBarCode {

    public static async draw(pathToPDF: string, pathToImage: string): Promise<void> {
        const pdfDoc = await pdf.PDFDocument.load(fs.readFileSync(pathToPDF));
        const img = await pdfDoc.embedPng(fs.readFileSync(pathToImage));

        for (const page of pdfDoc.getPages()) {
            await this.processPage(page, img);
        }

        const pdfBytes = await pdfDoc.save();
        const newFilePath = `${path.basename(pathToPDF, '.pdf')}-result.pdf`;
        console.log(newFilePath);

        fs.writeFileSync(newFilePath, pdfBytes);
    }

    private static async processPage(page: pdf.PDFPage, img: pdf.PDFImage) {
        const jpgDims = img.scale(0.8);
        page.drawImage(img, {
            x: page.getWidth() - jpgDims.width,
            y: page.getHeight() - jpgDims.height - (page.getHeight() * 0.01),
            width: jpgDims.width, // imagePage.getWidth(),
            height: jpgDims.height, // imagePage.getHeight()
        });
    }
}

PdfWithBarCode.draw('src/barcode/guide.pdf', 'src/barcode/image.png');