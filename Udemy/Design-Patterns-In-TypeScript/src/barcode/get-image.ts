import { Canvas, createCanvas } from 'canvas';
import * as JsBarcode from 'jsbarcode';
import { promises } from 'fs';

export class BarCodeImage {

    public static async generate(imagePath: string, value: string): Promise<void> {
        const canvas = new Canvas(0, 0, 'image');

        JsBarcode(canvas, value, {
            height: 20,
            displayValue: true,
            fontSize: 12,
        });

        promises.writeFile(imagePath, canvas.toBuffer());
    }
}

BarCodeImage.generate('src/barcode/image.png', '61757620753');